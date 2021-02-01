var playBtn = document.querySelector('#play-btn');
var pauseBtn = document.querySelector('#pause-btn');
var videoPlayer = document.querySelector('#video');
var currentVideoTime = document.querySelector('#current-video-time');
var fullVideoTime = document.querySelector('#full-video-time');
var rewindInput = document.querySelector('#rewind-input');
var volumeInput = document.querySelector('#volume-input');
var volumeIcon = document.querySelector('.volume-icon');
var fullScreen = document.querySelector('.fullscreen');
var addVideo = document.querySelector('#add-video');
var wrapper = document.querySelector('.wrapper');


wrapper.addEventListener('mouseenter', function() {

    this.classList.add('active');
})

wrapper.addEventListener('mouseleave', function() {

    this.classList.remove('active');
})



window.addEventListener('load', function () {
    rewindInput.value = 0;
    volumeInput.value = 100;
});

window.addEventListener('keydown', function(e) {
    
    switch(e.code) {
        case 'Space':
            videoPlayer.pause();
        break;
        case 'KeyP' :
            videoPlayer.play();
        break;
        case 'KeyM':
            videoPlayer.volume = 0;  
        break;
        case 'KeyV':
            videoPlayer.volume = 1;
        break;
    }
})

function volumeIconSwitcher(volumePercent) {
    switch (true) {
        case volumePercent > 80:
            volumeIcon.setAttribute('src', "./images/volume-up-interface-symbol-1.svg")
            break;
        case (volumePercent < 80) && (volumePercent > 50):
            volumeIcon.setAttribute('src', "./images/volume-up-interface-symbol-2.svg")
            break;
        case (volumePercent < 50) && (volumePercent > 20):
            volumeIcon.setAttribute('src', "./images/volume-up-interface-symbol-3.svg")
            break;
        case (volumePercent < 20):
            volumeIcon.setAttribute('src', "./images/volume-up-interface-symbol-4.svg")
            break;
        default:
    }
}

function secundToMinute() {
    Math.round(fullVideoTime.textContent = Math.floor(videoPlayer.duration) / 60);
}

function videoCurrentPosition() {
    Math.round(currentVideoTime.textContent = (Math.floor(videoPlayer.currentTime) / 100));
    rewindInput.value = (videoPlayer.currentTime * 100) / videoPlayer.duration;
}

playBtn.addEventListener('click', function (e) {
    e.preventDefault();

    videoPlayer.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";

    videoPlayer.style.display = 'block';
    addVideo.style.display = 'none';

    addVideo.pause();

    Math.floor(videoCurrentPosition());
    secundToMinute();
});

setInterval(function () {
    videoCurrentPosition();
}, 1000)

pauseBtn.addEventListener('click', function (e) {
    e.preventDefault();

    videoPlayer.pause();
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";

    videoPlayer.style.display = 'none';
    addVideo.style.display = 'block';

    addVideo.play();


})

rewindInput.addEventListener('change', function () {
    videoPlayer.currentTime = (rewindInput.value * videoPlayer.duration) / 100;
})

volumeInput.addEventListener('change', function () {
    videoPlayer.volume = volumeInput.value / 100;

    volumeIconSwitcher(volumeInput.value);
})

fullScreen.addEventListener('click', function() {

    videoPlayer.requestFullscreen();
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
})