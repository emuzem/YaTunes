import {videoInit} from './video.js';
import {musicInit} from "./music.js";
import {radioInit} from "./radio.js";

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const disableBlocks = () => {
    temp.style.display = 'none';
    playerBtn.forEach(el => el.classList.remove('active'));
    playerBlock.forEach(el => el.classList.remove('active'));
}

playerBtn.forEach((el, i) => {
    el.addEventListener('click', ()=> {
        disableBlocks();
        el.classList.add('active');
        playerBlock[i].classList.add('active');
    })
})