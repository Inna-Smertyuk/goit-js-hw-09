import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector('.form'),
    delay: document.querySelector('[name="delay"]'),
    step: document.querySelector('[name="step"]'),
    amount: document.querySelector('[name="amount"]'),
}

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    let promiseDelay = Number(refs.delay.value);
    const stepValue = Number(refs.step.value);
    const amountValue = Number(refs.amount.value);

    for (let i = 1; i <= amountValue; i += 1) {
        createPromise(i, promiseDelay).then(({ position, delay }) => {
                Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });

        promiseDelay += stepValue;
    }
}