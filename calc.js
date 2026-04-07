window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let a = '';           // Первое число
    let b = '';           // Второе число
    let histoy = '';
    let expressionResult = '';  // Результат вычисления
    let total = 0;
    let selectedOperation = null;  // Выбранная операция

    // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result");
    const historyOutputElement = document.getElementById("history");

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if (((digit != '.') || (digit == '.' && !a.includes(digit))) && (digit != 0 || a != '')) { 
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5', 
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                a += digit;
                outputElement.innerHTML = a;
            }
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if (((digit != '.') || (digit == '.' && !b.includes(digit))) && (digit != 0 || a != '')) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }
        // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
    digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    function onOpButtonClicked(operation) {
        if (a === '') return;        
        if (!selectedOperation) {
            histoy += a + operation;
        } else if (a && b) {
            histoy += b + operation;
            calculate();
        } else {
            histoy[-1] = operation;
        }
        historyOutputElement.innerHTML = histoy;

        selectedOperation = operation;
    }

    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult").onclick = function() { 
        onOpButtonClicked('×');
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        onOpButtonClicked('+');
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        onOpButtonClicked('-');
    }
    document.getElementById("btn_op_div").onclick = function() { 
        onOpButtonClicked('/');
    }
    document.getElementById("btn_op_percent").onclick = function() { 
        onOpButtonClicked('%');
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            a = (a * -1).toString();

            outputElement.innerHTML = a;

            
        } else {
            b = (b * -1).toString();

            outputElement.innerHTML = b;
        }
    }
    document.getElementById("btn_delete").onclick = function() {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            if (a == '') {
                outputElement.innerHTML = 0;
            } else {
                outputElement.innerHTML = a;
            }
        }  else {
            b = b.slice(0, -1);
            if (b == '') {
                outputElement.innerHTML = 0;
            } else {
                outputElement.innerHTML = b;
            }
        }
    }
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation) {
            a = (a ** 0.5).toString();
            outputElement.innerHTML = a;
        } else {
            b = (b ** 0.5).toString();
            outputElement.innerHTML = b;
        }
    }
    document.getElementById("btn_op_factorial").onclick = function() {
        if (!selectedOperation) {
            a = (factorial(a)).toString();
            outputElement.innerHTML = a;
        } else {
            b = (factorial(b)).toString();
            outputElement.innerHTML = b;
        }
    }
    document.getElementById("btn_three_zeroes").onclick = function() {
        if (!selectedOperation) {
            if (a != '') {
                a += '000';
                histoy += '000'
                outputElement.innerHTML = a;
            }
        } else {
            if (b != '') {
                b += '000';
                histoy += '000'
                outputElement.innerHTML = b;
            }
        }
    }
    document.getElementById("btn_exp").onclick = function() {
        if (!selectedOperation) {
            if (a != '') {
                a = Math.E ** a;
                outputElement.innerHTML = a;
            }
        } else {
            if (b != '') {
                b = Math.E ** b;
                outputElement.innerHTML = b;
            }
        }
    }

    document.getElementById("btn_memory_plus").onclick = function() {
        total += +outputElement.innerHTML;
    }
    document.getElementById("btn_memory_minus").onclick = function() {
        total -= +outputElement.innerHTML;
    }
    document.getElementById("btn_grand_total").onclick = function() {
        if (!selectedOperation) {
            a = total.toString();
        } else {
            b = total.toString();
        }
        outputElement.innerHTML = total.toString();
    }
    
    // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() { 
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    }
        // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("btn_op_equal").onclick = function() { 
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOperation)
            return

        histoy += b + '='
        historyOutputElement.innerHTML = histoy;

        calculate();

        histoy = '';
        total += expressionResult;

        // Показываем результат на экране
        outputElement.innerHTML = a;
    }

    /*document.getElementById("result-theme-button").onclick = function() {
        document.getElementById("result").classList.toggle("second-result-color")
    }*/

    function calculate() {
        // Выполняем выбранную операцию - чтобы не плодить if, воспользуемся удобной и более наглядной функцией сравнения switch, которая на основе значения переданной переменной выполняет нужный кейс. В case указывается ожидаемое точное значение переменной (это может быть любое значение), а затем после : пишется код, который нужно выполнить в данном случае. Case проверяются последовательно, выход из switch происходит при попадании на break или если значение не совпало ни с чем.
        switch(selectedOperation) { 
            case '×':
                expressionResult = (+a) * (+b);
                // обязательно пишется в конце действий case, чтобы выйти из switch, иначе продолжится сравнение case дальше
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
            case '%':
                expressionResult = a / 100 * b;
                break;
            // желательно (но не обязательно) всегда прописывать дефолтное поведение, в случае если в переменной окажется не перечисленное выше значение. в нашем случае это не нужно.
            default:
                break;
        }

        // Сохраняем результат и очищаем второе число, чтобы при новом вводе записывать значение нового числа в b
        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
    }   
};


function factorial(number) {
    let result = 1; 
    for (let i = number; i > 1; i--) {
        result *= i;
    }
    return result
}