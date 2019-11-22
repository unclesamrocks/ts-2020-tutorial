const root = document.getElementById('root')
const pre = document.createElement('pre')

pre.textContent = JSON.stringify({}, null, 4)
root.appendChild(pre)
