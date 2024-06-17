'use strict';
/* Variables */
const btnHamburgerMenu = document.querySelector('.hamburger-menu');
const overlayMenu = document.querySelector('.overlay');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const timeElapsed = document.querySelector('.time-elapsed');
const timeDuration = document.querySelector('.time-duration');
const playBtn = document.getElementById('btn--play');
const puseBtn = document.getElementById('btn--puse');

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

playBtn.addEventListener('click', togglePlay);
puseBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayButton);
video.addEventListener('duration', updateProgress);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);

/* MAIN FUNCTIONALITY */
const stars = document.querySelectorAll('.star');
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
const svg = document.getElementsByTagName('svg');
console.log(svg);
console.log(document.getElementsByTagName('div'));
