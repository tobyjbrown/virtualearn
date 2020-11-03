// navbar dropdown menu

const $dropdownMenu = document.getElementById("dropdownMenu");
const $dropdownMenuBtn = document.getElementById("dropdownMenuBtn");
const $dropdownMenuLinks = document.getElementById("dropdownMenuLinks");
const $dropdownArrow = document.getElementById("dropdownArrow");
let dropdownClicked = false;

const expandDropdown = function() {
    $dropdownMenuLinks.style.display = "block";
    $dropdownArrow.classList.remove('dropdown-arrow-closed');
    $dropdownArrow.classList.add('dropdown-arrow-open');
};

const closeDropdown = function() {
    $dropdownMenuLinks.style.display = "none";
    $dropdownArrow.classList.remove('dropdown-arrow-open');
    $dropdownArrow.classList.add('dropdown-arrow-closed');
};

$dropdownMenuBtn.addEventListener('click', function() {
    if(!dropdownClicked) {
        expandDropdown();
        dropdownClicked = true;
    } else {
        closeDropdown();
        dropdownClicked = false;
    }
});

$dropdownMenu.addEventListener('mouseenter', function() {
    expandDropdown();
});

$dropdownMenu.addEventListener('mouseleave', function() {
    if(!dropdownClicked) {
        closeDropdown();
    }
});

// carousel component

const $carousel = document.querySelector('.carousel');
const $carouselTrackContainer = document.querySelector('.carousel-track-container')
const $carouselTrack = document.querySelector('.carousel-track');
const $carouselCards = Array.from($carouselTrack.children);
const $carouselNextBtn = document.querySelector('.carousel-button-next');
const $carouselPrevBtn = document.querySelector('.carousel-button-prev');
const $carouselNav = document.querySelector('.carousel-nav')

let $carouselNavBtns;
let cardWidth;
let $currentCard;
let $targetCard;

const setCardWidth = function() {
    cardWidth = $carouselCards[0].getBoundingClientRect().width;
}

const setCardPosition = (card, index) => {
    card.style.left = cardWidth * index + 'px';
};

const createNavButton = () => {
    let el = document.createElement('button');
    el.classList.add('carousel-nav-button');
    $carouselNav.appendChild(el);
}

const setCurrentCard = function() {
    $currentCard = $carousel.querySelector('.current-card');
}

const moveTrack = function(card) {
    $carouselTrack.style.transform = 'translateX(-' + card.style.left + ')';
}

const updateCarouselButtons = () => {
    if(!$currentCard.nextElementSibling) {
        $carouselNextBtn.style.display = 'none';
    } else {
        $carouselNextBtn.style.display = 'block';
    }
    
    if (!$currentCard.previousElementSibling){
        $carouselPrevBtn.style.display = 'none';
    } else {
        $carouselPrevBtn.style.display = 'block';
    }
}

const updateCarouselNav = function() {
    let currentCardNum;
    for(let i = 0; i < $carouselCards.length; i++) {
        if($carouselCards[i].classList.contains('current-card')) {
            currentCardNum = i;
            break
        }
    };

    for(let i = 0; i < $carouselNavBtns.length; i++) {
        $carouselNavBtns[i].classList.remove('current-card');
    }
    console.log(currentCardNum);
    $carouselNavBtns[currentCardNum].classList.add('current-card');
}

$carousel.addEventListener('click', function(e) {
    if(e.target.closest('button')) {
        let btnClicked = e.target.closest('button');
        setCurrentCard();
        if(btnClicked.classList.contains('carousel-button-next')) {
            $currentCard.classList.remove('current-card');
            $targetCard = $currentCard.nextElementSibling;
            $targetCard.classList.add('current-card');   
        } else if (btnClicked.classList.contains('carousel-button-prev')) {
            $currentCard.classList.remove('current-card');
            $targetCard = $currentCard.previousElementSibling;
            $targetCard.classList.add('current-card');
        } else if (btnClicked.classList.contains('carousel-nav-button')) {
            $currentCard.classList.remove('current-card');
            let btnClickedIndex = $carouselNavBtns.indexOf(btnClicked);
            $targetCard = $carouselCards[btnClickedIndex];
            $targetCard.classList.add('current-card');
        }
        moveTrack($targetCard);
        setCurrentCard();
        updateCarouselButtons();
        updateCarouselNav();
    }
});

window.addEventListener('resize', () => {
    setCardWidth();
    $carouselCards.forEach(setCardPosition);
    $carouselTrack.style.transform = 'translateX(-' + $currentCard.style.left + ')';
});

// Code from https://css-tricks.com/stop-animations-during-window-resizing/ //
// ======================================================================== //

let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

// ======================================================================== //

window.onload = function() {
    setCardWidth();
    $carouselCards.forEach(setCardPosition);
    $carouselCards.forEach(createNavButton);
    $carouselNavBtns = Array.from($carouselNav.children);
    setCurrentCard();
    updateCarouselButtons();
    updateCarouselNav();
} 