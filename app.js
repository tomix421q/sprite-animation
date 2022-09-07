const breathButton = document.getElementById('breath');
const angryButton = document.getElementById('angry');
const jumpButton = document.getElementById('jump');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = 320;
const height = canvas.height = 480;
const frameWidth = 64;
const frameHeight = 100;
const xPos = 130;
const yPos = 160;
const scale = 1;
const fps = 60;

const secondsToUpdate = 0.2 * fps;
let frameIndex = 0;
let count = 0;

canvas.style.marginTop = window.innerHeight / 2 - height / 2 + 'px';

const spriteSheet = new Image();
spriteSheet.src = "images/hero_spritesheet.png";

const State = {
    states: {},
    generateState: function(name, startIndex, endIndex) {
        if (!this.states[name]) {
            this.states[name] = {
                frameIndex: startIndex,
                startIndex: startIndex,
                endIndex: endIndex
            };
        }
    },
    getState: function(name) {
        if (this.states[name]) {
            return this.states[name];
        }
    }
};

State.generateState('breath', 0, 4);
State.generateState('angry', 4, 8);
State.generateState('jump', 8, 14)

function animate(state) {
    context.drawImage(
        spriteSheet, state.frameIndex * frameWidth, 0, frameWidth, frameHeight, xPos, yPos, frameWidth * scale,
        frameHeight * scale);
    count++;
    if (count > secondsToUpdate) {
        state.frameIndex++;
        count = 0;
    }
    if (state.frameIndex > state.endIndex) {
        state.frameIndex = state.startIndex;
    }
}
let testIt = 'angry';

function frame() {
    context.clearRect(0, 0, width, height)
    animate(State.getState(testIt));
    breathButton.addEventListener('click', function breath() {
        animate(State.getState(testIt = 'breath'));
        console.log('im done')
    })

    angryButton.addEventListener('click', function angry() {
        State.getState(testIt = 'angry');
    })

    jumpButton.addEventListener('click', function jump() {
        State.getState(testIt = 'jump');
    })
    requestAnimationFrame(frame);
}
frame();