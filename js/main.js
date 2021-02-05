let snakeArr = ['40'],
    snakeStep,
    interval,
    apple,
    randomItem;


function style() {
    for (i=0; i < snakeArr.length; i++) {
        let start = document.querySelector(`[data-src = "${snakeArr[i]}"]`);
        start.style.backgroundColor = '#2c3e50';
        start.style.border = '0.3vw solid #c0392b';
    }
}
style();

function strToNum() {
    snakeStep = snakeArr.shift();
    snakeArr.push(`${snakeStep}`);
}
strToNum();

//яблоко
for (let i = 0; i < 81; i++) {
    randomItem = Math.floor(Math.random() * Math.floor(82));
    if (!snakeArr.includes(String(randomItem))){
        apple = document.querySelector(`[data-src = "${randomItem}"]`);
        apple.style.backgroundColor = '#4cd137';
        apple.style.border = '1vw solid #c0392b';
        break;
    } 
}

function snakeMove() {
    snakeArr.unshift(`${snakeStep}`); //добавляет змейке ячейку при съедании яблока

    let taleDisapear = document.querySelector(`[data-src = "${snakeArr.pop()}"]`); //окрашивает удаленный объект массива в обычный цвет

    if (snakeArr[0] == apple.getAttribute('data-src')) {
        snakeArr.unshift(`${snakeStep}`);
        for (let i = 0; i < 81; i++) {
            randomItem = Math.floor(Math.random() * Math.floor(81));
            if (!snakeArr.includes(String(randomItem))){
                apple = document.querySelector(`[data-src = "${randomItem}"]`);
                apple.style.backgroundColor = '#4cd137';
                apple.style.border = '1vw solid #c0392b';
                // gameOver();
                break;
            } 
        }
        
        taleDisapear.style.backgroundColor = '#c0392b';
        snakeArr.push(`${snakeStep}`);

    } else {
        snakeArr.pop();
        taleDisapear.style.backgroundColor = '#c0392b';
        snakeArr.unshift(`${snakeStep}`);
    }

    let snakeArrWithoutDoubles = [...new Set(snakeArr)];
}


window.addEventListener("keydown", function (e) {
    clearInterval(interval);
    interval = setInterval(() => {
        if (e.code == 'ArrowUp') {
            snakeStep = +snakeStep - 9;
            snakeMove();
            style();
        } else if (e.code == 'ArrowDown') {
            snakeStep = +snakeStep + 9;
            snakeMove();
            style();
        } else if (e.code == 'ArrowLeft') {
            snakeStep = +snakeStep - 1;
            snakeMove();
            style();
        } else if (e.code == 'ArrowRight') {
            snakeStep = +snakeStep + 1;
            snakeMove();
            style();
        }
    }, 500);
});

//Осталось сделать:
//геймовер при касании себя/стены
//не сбрасывать интервал при нажатии на кнопку (если часто нажимать на стрелку, змейка не будет двигаться, так как интервал после каждого нажатия начинается заново)
//не разворачиваться на 180 градусов
//в массиве задваивается съеденое значение
//при нажатии не на стрелки змейка останавливается