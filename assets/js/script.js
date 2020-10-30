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
