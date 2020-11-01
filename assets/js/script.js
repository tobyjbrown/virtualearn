// navbar dropdown menu

const $dropdownMenu = document.getElementById("dropdownMenu");
const $dropdownMenuLinks = document.getElementById("dropdownMenuLinks");
const $dropdownArrow = document.getElementById("dropdownArrow");

$dropdownMenu.addEventListener('mouseenter', function() {
    $dropdownMenuLinks.style.display = "block";
    $dropdownArrow.classList.remove('dropdown-arrow-closed');
    $dropdownArrow.classList.add('dropdown-arrow-open');
});

$dropdownMenu.addEventListener('mouseleave', function() {
    $dropdownMenuLinks.style.display = "none";
    $dropdownArrow.classList.remove('dropdown-arrow-open');
    $dropdownArrow.classList.add('dropdown-arrow-closed');
});

// carousel component

const $carousel = document.querySelector('.carousel');
const $carouselTrackContainer = document.querySelector('.carousel-track-container')
const $carouselTrack = document.querySelector('.carousel-track');
const $carouselCards = Array.from($carouselTrack.children);
const $carouselNextBtn = document.querySelector('.carousel-button-next');
const $carouselPrevBtn = document.querySelector('.carousel-button-prev');
const $carouselNav = document.querySelector('.carousel-nav')
const $carouselNavBtns = Array.from($carouselNav.children);

let $currentCard;
let $targetCard;

const setCurrentCard = function() {
    $currentCard = $carousel.querySelector('.current-card');
}

const updateCarouselButtons = () => {
    if(!$currentCard.nextElementSibling) {
        $carouselNextBtn.style.display = 'none';
    } else if (!$currentCard.previousElementSibling){
        $carouselPrevBtn.style.display = 'none';
    } else {
        $carouselNextBtn.style.display = 'block';
        $carouselPrevBtn.style.display = 'block';
    }
}

setCurrentCard();
updateCarouselButtons();


// find the width of the cards - each card will have same width
// position the cards next to each other
// move to next card when 'next' button is pressed
// move to previous card when 'previous' button is pressed

let cardWidth = $carouselCards[0].getBoundingClientRect().width;
$carouselCards[0].style.left = 0 + 'px';
$carouselCards[1].style.left = cardWidth + 'px';
$carouselCards[2].style.left = cardWidth * 2 + 'px';

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
        }
        setCurrentCard();
        updateCarouselButtons();
    }
});