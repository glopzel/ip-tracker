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
    let ipTest = inputIP.value
    // var ipTest = '8.8.8.8';
    // let ipTest = '192.212.174.101'
    // var api_key = 'at_A1VUU3MAyiYPp0YA4IuDM9MCGVclA';
    // var api_url = 'https://geo.ipify.org/api/v1?';
    // var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;
    let connectionUrl = `https://geo.ipify.org/api/v1?apiKey=at_A1VUU3MAyiYPp0YA4IuDM9MCGVclA&ipAddress=${ipTest}`
    
    const results = await fetch(connectionUrl);
    const data = await results.json()
    console.log(data)

    let ip = data.ip;
    let location = `${data.location.city}, ${data.location.region}, ${data.location.postalCode}`
    let timezone = data.location.timezone
    let isp = data.isp

    let latlng = L.latLng(data.location.lat, data.location.lng);
    mapIt(latlng)

    displayResults(ip, location, timezone, isp)
}

function mapIt(ltlg) {
    // `https://geo.ipify.org/api/v2/country?apiKey=at_A1VUU3MAyiYPp0YA4IuDM9MCGVclA&ipAddress=${ip}`
    // old link https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    // let map = L.map('map').setView([51.505, -0.09], 13);
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



