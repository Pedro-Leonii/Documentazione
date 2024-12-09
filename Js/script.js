const navMenu = document.getElementById('milestones-links');
const openBtn = document.getElementById('open_nav');
const closeBtn = document.getElementById('close_nav');
const media = window.matchMedia('(width < 40em)');
const main = document.querySelector('main');
const body = document.querySelector('body');


function setUpMobileNav(e) {
    if(e.matches) {
        navMenu.setAttribute('inert', '');
        navMenu.style.transition = 'none';
    }
    else {
        closeMobileMenu();
        navMenu.removeAttribute('inert');
    }
}

function openMobileMenu() {

    openBtn.setAttribute('aria-expanded', 'true');
    navMenu.removeAttribute('inert');
    navMenu.removeAttribute('style');
    main.setAttribute('inert', '');
    bodyScrollLockUpgrade.disableBodyScroll(body);
    closeBtn.focus();
}

function closeMobileMenu() {
    openBtn.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('inert', '');
    main.removeAttribute('inert');
    bodyScrollLockUpgrade.enableBodyScroll(body);
    openBtn.focus();

    setTimeout(() => {
        navMenu.style.transition = 'none';
    }, 500);
}

setUpMobileNav(media);

openBtn.addEventListener('click', openMobileMenu);
closeBtn.addEventListener('click', closeMobileMenu);

media.addEventListener('change', function (e) {
    setUpMobileNav(e);
})
