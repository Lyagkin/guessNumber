'use strict';

window.addEventListener('DOMContentLoaded', () => {
  let secretNumber = Math.trunc(Math.random() * 20) + 1; // генерирование случайного числа в диапозоне от 0 до 20;
  let score = 20; // количество очков
  let highscore = 0; // изначальный лучший результат

  const displayMessage = function (message) {
    // вывод сообщения на экран о результате угадывания числа
    document.querySelector('.message').textContent = message;
  };

  const displayNumber = function (number) {
    // вывод на экран угаданного числа вместо знака вопроса
    document.querySelector('.number').textContent = number;
  };

  const displayScore = function (score) {
    // подсчет результата набранных очков от количества попыток
    document.querySelector('.score').textContent = score;
  };

  const displayBackgroundColor = function (body) {
    // окрашивания экрана если угадано число
    document.querySelector('body').style.backgroundColor = body;
  };

  document.querySelector('.check').addEventListener('click', function () {
    // логика при нажатии на кнопку check
    const guess = Number(document.querySelector('.guess').value); // переменная содержащая значение из поля для ввода числа

    if (!guess) {
      displayMessage('⛔️ No number!'); // не ввели никакого числа - вывели на экран текст из аргумена функции
    } else if (guess === secretNumber) {
      // если точно угадали число:
      displayMessage('🎉 Correct Number!'); // вывели на экран текст из аргумена функции
      displayNumber(secretNumber); // вывели на экран загаданное число
      displayBackgroundColor('#60b347'); // изменили цвет экрана
      if (score > highscore) {
        highscore = score; // дополнительное условие каждого раунда, при угадывании числа - если в первый раз количество попыток больше изначального 0, выводится это число, далее выводится лучший результат, то есть наименьшее число
        document.querySelector('.highscore').textContent = highscore; // выводим лучший результат на экран
      }
    } else if (guess !== secretNumber) {
      // если неверно угадано число
      if (score > 1) {
        // и если результат очков больше 1
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!'); // сравниваем числа и выводим на экран результат сравнения - либо слишком большое число либо слишком маленькое
        score--; // при этом уменьшаем на единицу результат очков
        displayScore(score); // выводим каждый раз на экран обновленный результат потерянных очков
      } else {
        // если набранных очков меньше 1
        displayMessage('💥 You lost the game!'); // выводим на экран сообщение о проигранной игре
        displayScore(0); // выводим количество очков игрока
      }
    }
  });

  document.querySelector('.again').addEventListener('click', function () {
    // логика по клику на кнопку - again
    score = 20; // обновляем количество очков игрока
    secretNumber = Math.trunc(Math.random() * 20) + 1; // обновляем загаданное число
    displayMessage('Start guessing...'); // выводим на экран сообщение из аргумента функции
    displayScore(score); // выводим на экран очки игрока
    displayNumber('?'); // выводим на экран сообщение из аргумента функции
    document.querySelector('.guess').value = ''; // очищаем инпут
    displayBackgroundColor('#222'); // окрашиваем экран в черный
  });
});
