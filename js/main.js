// SEARCH
const btn = document.querySelector('button');
const inputIP = document.querySelector('input');

// RESULTS
const displayIP = document.querySelector('#ip');
const displayLocation = document.querySelector('#location');
const displayTime = document.querySelector('#time')
const displayISP = document.querySelector('#isp');

btn.addEventListener('click', fetchIP)

async function fetchIP() {
    // if you get the value outside of this function on a global scope (at the top, right away on page load), you will get undefined, not the value
    let ipTest = inputIP.value

    let connectionUrl = `https://geo.ipify.org/api/v1?apiKey=at_A1VUU3MAyiYPp0YA4IuDM9MCGVclA&ipAddress=${ipTest}`
    
    const results = await fetch(connectionUrl);
    const data = await results.json()

    // info to display
    let ip = data.ip;
    let location = `${data.location.city}, ${data.location.region}, ${data.location.postalCode}`
    let timezone = data.location.timezone
    let isp = data.isp

    // coordinates for the map
    let latlng = L.latLng(data.location.lat, data.location.lng);
    mapIt(latlng)

    displayResults(ip, location, timezone, isp)
}

function mapIt(ltlg) {
    let map = L.map('map').setView(ltlg, 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);
}

function displayResults(ip, loc, timez, isp) {
    displayIP.innerText = ip
    displayLocation.innerText = loc
    displayTime.innerText = timez
    displayISP.innerText = isp
}



