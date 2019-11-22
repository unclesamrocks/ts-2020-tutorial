var root = document.getElementById('root');
function add(n1, n2) {
    return n1 + n2;
}
var number1 = 6;
var number2 = 2.8;
var r = add(number1, number2);
root.textContent = r.toString();
