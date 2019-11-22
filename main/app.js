var root = document.getElementById('root');
var pre = document.createElement('pre');
pre.textContent = JSON.stringify({}, null, 4);
root.appendChild(pre);
