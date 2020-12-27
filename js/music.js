export const musicInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioButtonPrev = document.querySelector('.audio-button__prev');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioButtonNext = document.querySelector('.audio-button__next');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioProgress = document.querySelector('.audio-progress');
    const playerAudio = document.querySelector('.player-audio');

    const songs = ['flow', 'hello', 'speed'];
    let trackIndex = 1;

    const togglePlayMode = ()=>{
        if(audioPlayer.paused){
            audioPlayer.play();
            audioButtonPlay.classList.add('fa-pause');
            audio.classList.add('play');
            if (audioHeader.textContent === 'Крути пластинку'){
                audioHeader.textContent = `${songs[1].toUpperCase()}`;
            }
        } else{
            audioPlayer.pause();
            audioButtonPlay.classList.remove('fa-pause');
            audio.classList.remove('play');
        }
    };
    const changeSong = () => {
        audioPlayer.src = `./audio/${songs[trackIndex]}.mp3`;
        audioImg.src = `./audio/${songs[trackIndex]}.jpg`;
        audioHeader.textContent = songs[trackIndex].toUpperCase();
        togglePlayMode();
    }
    const nextSong = () =>{
        if(trackIndex === songs.length - 1){
                trackIndex = 0;
            }
        else {
            trackIndex++;
        }
        changeSong();
    }
    const previousSong = () => {
        if(trackIndex === 0){
            trackIndex = songs.length-1;
        }
        else {
            trackIndex--;
        }
        changeSong();
    }

    audioPlayer.addEventListener('timeupdate', () => {
        let curTime = audioPlayer.currentTime;
        let duration = audioPlayer.duration;
        let secondsPassed = Math.floor(curTime % 60);
        let minutesPassed = Math.floor(curTime / 60);
        let secondsDur = Math.floor(duration % 60);
        let minutesDur = Math.floor(duration / 60);
        let addZERO = (n) => n < 10 ? `0${n}` : n;
        audioTimePassed.textContent = `${addZERO(minutesPassed)}:${addZERO(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZERO(minutesDur)}:${addZERO(secondsDur)}`;

        audioProgressTiming.style.width = `${(curTime / duration) * 100}%`;
        if (curTime === duration){
            nextSong();
        }
    });
    audioProgress.addEventListener('click', (ev)=> {
        let progressCurrentWidth = ev.clientX - audioProgress.getBoundingClientRect().left;
        console.log(audioProgress.getBoundingClientRect().left)
        console.log(progressCurrentWidth);
        audioProgressTiming.style.width = `${progressCurrentWidth}px`;
        audioPlayer.currentTime = (progressCurrentWidth * audioPlayer.duration / 450);
    });

    audioButtonPlay.addEventListener('click', togglePlayMode);
    audioImg.addEventListener('click', togglePlayMode);
    audioButtonNext.addEventListener('click', nextSong);
    audioButtonPrev.addEventListener('click', previousSong);

    document.addEventListener('keydown', (ev) => {
        if (playerAudio.classList.contains('active') && ev.code === 'Space') {
            togglePlayMode();
        }
    });
};