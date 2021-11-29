import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    selectedDates: null,

    inputEl: document.querySelector('input[type="text"]'),
    startBtn: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
};

// календарь
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (calendar.selectedDates[0].getTime() < Date.now()) {
            Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.disabled = false;
            refs.selectedDates = selectedDates[0].getTime();
        }
    },
};
const calendar = flatpickr(refs.inputEl, options);


refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', () => {

    const startTime = refs.selectedDates;

    const intervalId = setInterval(() => {
        refs.startBtn.disabled = true;
        const currentTime = Date.now()
        const deltaTime = startTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        if (deltaTime < 1000) {
            clearInterval(intervalId);
        }
        updateClock({ days, hours, minutes, seconds });
    }, 1000)
});

function updateClock({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = `${days}`;
    refs.hoursEl.textContent = `${hours}`;
    refs.minutesEl.textContent = `${minutes}`;
    refs.secondsEl.textContent = `${seconds}`;
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
};

// Для подсчета значений - функция convertMs, где ms - разница между конечной и текущей датой в миллисекундах.
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}