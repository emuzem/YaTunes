export const radioInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItems = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const playerRadio = document.querySelector('.player-radio');

    const radioPlayer = new Audio();
    radioPlayer.type = 'audio.aac';

    radioStop.disabled = true;

    const changeSelected = (parent) => {
        radioItems.forEach(el => el.classList.remove('select'));
        parent.classList.add('select');
    }
    const radioProgress = document.querySelector('.radio-progress');
    const mute = document.querySelector('.mute-radio');
    let currentRadioProgressValue = 1;

    radioProgress.addEventListener('input', ()=> {
        radioPlayer.volume = radioProgress.value;
        currentRadioProgressValue = radioProgress.value;
        if(radioProgress.value === '0'){
            mute.textContent = '🔇';
        } else {
            mute.textContent = '🔊';
        }
    });


    mute.addEventListener('click', muteVol);

    function muteVol () {
        radioPlayer.volume = 0;
        radioProgress.value = '0';
        mute.textContent = '🔇';
        mute.addEventListener('click', returnVol);
    }
    function returnVol (){
        radioProgress.value = currentRadioProgressValue;
        radioPlayer.volume = radioProgress.value;
        mute.textContent = '🔊';
        mute.removeEventListener('click', returnVol);
        mute.addEventListener('click', muteVol);
    }

    radioNavigation.addEventListener('change', (ev) => {
        const target = ev.target;
        const parent = target.closest('.radio-item');
        changeSelected(parent);
        radioPlayer.src = target.dataset.radioStantion;
        radioPlayer.play();
        radioStop.disabled = false;
        radioStop.classList.add('fa-pause');
        if (radioStop.disabled === false){
            radio.classList.add('play');
        }

        radioCoverImg.src = parent.querySelector('img').src;
        radioHeaderBig.textContent = parent.querySelector('.radio-name').textContent;
        parent.querySelector('img').addEventListener('click', togglePlayMode);
        radioCoverImg.addEventListener('click', togglePlayMode);
    });
    radioStop.addEventListener('click', togglePlayMode);
    document.addEventListener('keydown', (ev) => {
        if (playerRadio.classList.contains('active') && ev.code === 'Space') {
            togglePlayMode();
        }
    });
    function togglePlayMode () {
        if (radioPlayer.paused) {
            radioPlayer.play();
            radioStop.classList.toggle('fa-stop');
            radio.classList.add('play');
        } else {
            radioPlayer.pause();
            radioStop.classList.toggle('fa-stop');
            radio.classList.remove('play');
        }
    }
};