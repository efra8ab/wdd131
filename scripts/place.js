const temp = 30;
const wind = 10;

function calculateWindChill(temp, wind) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(wind, 0.16) +
        0.3965 * temp * Math.pow(wind, 0.16)
    ).toFixed(1);
}

const windChillElement = document.querySelector('#windChill');

if (temp <= 10 && wind > 4.8) {
    const windChill = calculateWindChill(temp, wind);
    windChillElement.textContent = `${windChill} °C`;
} else {
    windChillElement.textContent = 'N/A';
}