const URL = 'https://geo.ipify.org/api/v1?apiKey=at_XUcz2Pcibasv4tt2q4mohSUsPRHuy&ipAddress=';
const MAP_TOKEN = 'pk.eyJ1IjoiYXJ0ZW0tOTciLCJhIjoiY2tnaWNrZTZxMjk5ZTJxcWFoN2k1NjE3ZSJ9.k-Him0hdaWXlUrh9xDF7Ng';

const ipText = document.querySelector('#ip');
const locationText = document.querySelector('#location');
const timezoneText = document.querySelector('#timezone');
const ispText = document.querySelector('#isp');
const searchForm = document.querySelector('#search-form');
const map = document.querySelector('#map');

const getData = async (ip) => {
    const response = await fetch(URL + ip);
    const result = await response.json();

    renderData(result);
};

const renderData = ({ ip, isp, location }) => {
    const { region, postalCode, city, timezone } = location;

    ipText.textContent = ip;
    ispText.textContent = isp;
    locationText.textContent = `${region}, ${city} ${postalCode}`;
    timezoneText.textContent = timezone;
};

const renderMap = () => {
    const currentMap = L.map(map).setView([51.505, -0.09], 13);

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAP_TOKEN}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: MAP_TOKEN
    }).addTo(currentMap);
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    getData(e.target.search.value.trim());
});

renderMap();

// getData('');
