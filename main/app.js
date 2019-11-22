var root = document.getElementById('root');
function add(n1, n2, isPrint) {
    if (isPrint)
        console.log(n1, n2);
    return n1 + n2;
}
var number1 = 9;
var number2 = 2.8;
var isPrint = true;
var r = add(number1, number2, isPrint);
root.textContent = r.toString();
