const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};
let timerId = null;

refs.startButton.addEventListener('click', () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.startButton.disabled = true;
});

refs.stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    refs.startButton.disabled = false;
});

//для генерации случайного цвета
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}