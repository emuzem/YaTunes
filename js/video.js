export const videoInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const btnPlay = document.querySelector('.fa-play');
    const btnStop = document.querySelector('.fa-stop');
    const timePassed = document.querySelector('.video-time__passed');
    const progress = document.querySelector('.video-progress');
    const totalTime = document.querySelector('.video-time__total');
    const playerVideo = document.querySelector('.player-video');

    //переключние режима плеера
    videoPlayer.addEventListener('click', togglePlayMode);
    btnPlay.addEventListener('click', togglePlayMode);
    btnStop.addEventListener('click', () => {
        videoPlayer.currentTime = 0;
    });
    function togglePlayMode () {
        if (videoPlayer.paused){
            videoPlayer.play();
            btnPlay.classList.toggle('fa-pause');
        }
        else {
            videoPlayer.pause();
            btnPlay.classList.toggle('fa-pause');
        }
    }
//изменение времени
    videoPlayer.addEventListener('timeupdate', () => {
        let currentTime = videoPlayer.currentTime;
        let duration = videoPlayer.duration;
        let secondsPassed = Math.floor(currentTime % 60);
        let minutesPassed = Math.floor(currentTime / 60);
        let secondsDur = Math.floor(duration % 60);
        let minutesDur = Math.floor(duration / 60);
        let addZERO = (n) => n < 10 ? `0${n}` : n;
        timePassed.textContent = `${addZERO(minutesPassed)}:${addZERO(secondsPassed)}`;
        totalTime.textContent = `${addZERO(minutesDur)}:${addZERO(secondsDur)}`;

        progress.value = (currentTime / duration) * 100;
    });
    progress.addEventListener('input', ()=> {
        videoPlayer.currentTime = (progress.value * videoPlayer.duration) / 100;
    });
//пауза и воспроизведение по пробелу
    document.addEventListener('keydown', (ev) => {
        if (playerVideo.classList.contains('active') && ev.code === 'Space') {
            togglePlayMode();
        }
    });
};