// SEARCH
const btn = document.querySelector('button');
const inputIP = document.querySelector('input');

// RESULTS
const displayIP = document.querySelector('#ip');
const displayLocation = document.querySelector('#location');
const displayTime = document.querySelector('#time')
const displayISP = document.querySelector('#isp');

btn.addEventListener('click', fetchIP)

let map;

async function fetchIP() {
    // if you get the value outside of this function on a global scope (at the top, right away on page load), you will get undefined, not the value
    let ipTest = inputIP.value

    let connectionUrl = `https://geo.ipify.org/api/v1?apiKey=at_A1VUU3MAyiYPp0YA4IuDM9MCGVclA&ipAddress=${ipTest}`
    
    const results = await fetch(connectionUrl);
    const data = await results.json()

    // coordinates for the map
    let latlng = L.latLng(data.location.lat, data.location.lng);

    mapIt(latlng)

    displayResults(data)
}

function mapIt(ltlg) {
    if (map) {
        map.off();
        map.remove();
    }
    map = L.map('map').setView(ltlg, 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);
    let marker = L.marker(ltlg).addTo(map);
}

function displayResults(data) {
    // get info to display from the data
    let ip = data.ip;
    let location = `${data.location.city}, ${data.location.region}, ${data.location.postalCode}`
    let timezone = data.location.timezone
    let isp = data.isp

    displayIP.innerText = ip
    displayLocation.innerText = location
    displayTime.innerText = timezone
    displayISP.innerText = isp
}



