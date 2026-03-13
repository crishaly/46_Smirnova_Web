const gameButton = document.getElementById("gameButton");

function askVariant(message, allowedVariants) {
    while (true) {
        let value = prompt(message);

        if (value === null) {
            const leave = confirm("Вы нажали отмену. Хотите выйти из теста?");
            if (leave) {
                return null;
            }
            continue;
        }

        value = value.trim();

        if (value === "") {
            alert("Пустой ввод недопустим. Попробуйте ещё раз.");
            continue;
        }

        if (!/^\d+$/.test(value)) {
            alert("Нужно ввести только номер варианта: 1, 2 или 3.");
            continue;
        }

        value = Number(value);

        if (!allowedVariants.includes(value)) {
            alert("Можно вводить только: " + allowedVariants.join(", "));
            continue;
        }

        return value;
    }
}

function startPonyTest() {
    const start = confirm(
        'Привет! Это тест "Кто ты из пони?".\n\nНажми OK, чтобы начать.'
    );

    if (!start) {
        alert("Тест отменён.");
        return;
    }

    alert(
        "Сейчас будет 5 вопросов.\n" +
        "На каждый вопрос нужно ввести номер ответа: 1, 2 или 3.\n" +
        "Если введёшь что-то неправильно, я попрошу попробовать ещё раз."
    );

    let rainbow = 0;
    let pinkie = 0;
    let twilight = 0;

    let answer1 = askVariant(
        "Вопрос 1.\nКак ты любишь проводить свободное время?\n1 — заниматься спортом\n2 — веселиться с друзьями\n3 — читать или смотреть что-то интересное",
        [1, 2, 3]
    );

    if (answer1 === null) {
        alert("Тест завершён.");
        return;
    }

    if (answer1 === 1) rainbow++;
    if (answer1 === 2) pinkie++;
    if (answer1 === 3) twilight++;

    let answer2 = askVariant(
        "Вопрос 2.\nКакая черта тебе ближе?\n1 — смелость\n2 — весёлость\n3 — ум",
        [1, 2, 3]
    );

    if (answer2 === null) {
        alert("Тест завершён.");
        return;
    }

    if (answer2 === 1) rainbow++;
    if (answer2 === 2) pinkie++;
    if (answer2 === 3) twilight++;

    let answer3 = askVariant(
        "Вопрос 3.\nЧто ты сделаешь, если возникла проблема?\n1 — быстро начну действовать\n2 — постараюсь поднять всем настроение\n3 — сначала всё обдумаю",
        [1, 2, 3]
    );

    if (answer3 === null) {
        alert("Тест завершён.");
        return;
    }

    if (answer3 === 1) rainbow++;
    if (answer3 === 2) pinkie++;
    if (answer3 === 3) twilight++;

    let answer4 = askVariant(
        "Вопрос 4.\nКакой цвет тебе нравится больше?\n1 — голубой\n2 — розовый\n3 — фиолетовый",
        [1, 2, 3]
    );

    if (answer4 === null) {
        alert("Тест завершён.");
        return;
    }

    if (answer4 === 1) rainbow++;
    if (answer4 === 2) pinkie++;
    if (answer4 === 3) twilight++;

    let answer5 = askVariant(
        "Вопрос 5.\nКак тебя чаще всего видят окружающие?\n1 — лидер\n2 — душа компании\n3 — спокойный и умный человек",
        [1, 2, 3]
    );

    if (answer5 === null) {
        alert("Тест завершён.");
        return;
    }

    if (answer5 === 1) rainbow++;
    if (answer5 === 2) pinkie++;
    if (answer5 === 3) twilight++;

    let result = "";
    let description = "";

    if (rainbow >= pinkie && rainbow >= twilight) {
        result = "Рейнбоу Дэш";
        description = "Ты смелая, активная и любишь быть первой.";
    } else if (pinkie >= rainbow && pinkie >= twilight) {
        result = "Пинки Пай";
        description = "Ты весёлая, энергичная и любишь дарить другим хорошее настроение.";
    } else {
        result = "Твайлайт Спаркл";
        description = "Ты умная, спокойная и любишь всё обдумывать.";
    }

    alert(
        "Тест завершён!\n\n" +
        "Твой результат: " + result + ".\n" +
        description
    );

    const restart = confirm("Хочешь пройти тест ещё раз?");
    if (restart) {
        startPonyTest();
    }
}

gameButton.addEventListener("click", startPonyTest);