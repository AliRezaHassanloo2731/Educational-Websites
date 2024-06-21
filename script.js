'use strict';
/* Variables */
const btnHamburgerMenu = document.querySelector('.hamburger-menu');
const overlayMenu = document.querySelector('.overlay');
const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const volumeIcon = document.getElementById('volume-icon');
const timeElapsed = document.querySelector('.time-elapsed');
const speed = document.querySelector('.player-speed');
const fullScreenBtn = document.querySelector('.fullscreen');
const timeDuration = document.querySelector('.time-duration');
const playBtn = document.getElementById('btn--play');
const puseBtn = document.getElementById('btn--puse');

const header = document.querySelector('.header');
const headerBtn = document.querySelector('.header-btn');
const sections = document.querySelectorAll('.section');

const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');
const nav = document.querySelector('.nav');
const ul = document.querySelector('.nav__links');
const hamburgerMenuUl = document.querySelector('.overlay__links');
const Tabs = document.querySelectorAll('.operations__tab');
const TabsContainer = document.querySelector('.operations__tab-container');
const TabsContent = document.querySelectorAll('.operations__content');

const stars = document.querySelectorAll('.star');

/* FUNCTIONS */
/* -----NAV------------------------------- */
function toggleNav() {
  btnHamburgerMenu.classList.toggle('change');
  if (overlayMenu.classList.contains('hidden')) {
    overlayMenu.classList.replace('hidden', 'visible');
  } else {
    overlayMenu.classList.replace('visible', 'hidden');
  }
}

btnHamburgerMenu.addEventListener('click', toggleNav);

/* --HEADER TITLE:VIDEO---------------------- */

function videoTimer(time) {
  const min =
    time / 60 > 9
      ? Math.floor(time / 60)
      : String(Math.floor(time / 60)).padStart(2, '0');
  const sec =
    time % 60 > 9
      ? Math.floor(time % 60)
      : String(Math.floor(time % 60)).padStart(2, '0');

  return `${min}:${sec}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  timeElapsed.textContent = `${videoTimer(video.currentTime)} / `;

  timeDuration.textContent = videoTimer(video.duration);
}

function setProgress(e) {
  progressBar.style.width = `${(e.offsetX / progressRange.offsetWidth) * 100}%`;
  video.currentTime = `${
    (e.offsetX / progressRange.offsetWidth) * video.duration
  }`;
}

let lastvolume = 1;
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume <= 0.1) {
    volume = 0;
  }
  if (volume >= 0.9) {
    volume = 1;
  }

  volumeBar.style.width = `${volume * 100}%`;

  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastvolume = volume;
}

function changeSpeed() {
  video.playbackRate = speed.value;
}

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;
let fullscreen = false;

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

function toggleFullScreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen();

  fullscreen = !fullscreen;
}

function showPlayButton() {
  playBtn.classList.toggle('hide');
  puseBtn.classList.toggle('hide');
}

function togglePlay() {
  if (video.paused) {
    video.play();

    playBtn.classList.toggle('hide');
    puseBtn.classList.toggle('hide');
  } else {
    video.pause();

    showPlayButton();
  }
}
function smothScrollToSection(e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
}

stars.forEach((star, i) => {
  star.addEventListener('click', function () {
    const currStarPosition = i + 1;
    stars.forEach((s, j) => {
      if (currStarPosition >= j + 1) {
        s.innerHTML = '&#9733;';
      } else {
        s.innerHTML = '&#9734;';
      }
    });
  });
});

function handleTabs(e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  Tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  TabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
}

playBtn.addEventListener('click', togglePlay);
puseBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayButton);
video.addEventListener('duration', updateProgress);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
speed.addEventListener('click', changeSpeed);
fullScreenBtn.addEventListener('click', toggleFullScreen);
headerBtn.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);
ul.addEventListener('click', smothScrollToSection);
hamburgerMenuUl.addEventListener('click', smothScrollToSection);

/* MAIN FUNCTIONALITY */

TabsContainer.addEventListener('click', handleTabs);
/* nav Sticky */
function handleHeaderObesrver(entries) {
  const [entry] = entries;

  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
}
const obsOption = {
  root: null,
  threshold: 0.1,
  rootMargin: '-90px',
};

function handleSecionObserver(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');

  observer.unobserved(entry, target);
}

const observer = new IntersectionObserver(handleHeaderObesrver, obsOption);
observer.observe(header);

const sectionObserver = new IntersectionObserver(handleSecionObserver, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});
