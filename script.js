const min = 50;
const duration = 1;

var lastMouse = [0, 0];

function generateBase64RandomString(length = 8) {
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * base64Chars.length);
        randomString += base64Chars[randomIndex];
    }

    return randomString;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function lifecycle(id, x, y) {
    const width = $('body').width();
    const height = $('body').height();

    $('body').append(`<div class="glow" id="${id}" style="left:${x}px;top:${y}px;background-color:rgb(${(x/width)*255}, 255, ${(y/height)*255});"></div>`);
    await sleep(duration * 1000);
    $('#'+id).remove();
}

$(document).mousemove(function(event) {
    const x = event.pageX;
    const y = event.pageY;

    const delta = Math.sqrt((x - lastMouse[0])**2 + (y - lastMouse[1])**2)
    if(delta > 10) {
        lifecycle(generateBase64RandomString(), x, y)
        lastMouse = [x, y];
    }
});