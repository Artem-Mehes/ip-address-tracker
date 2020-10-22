const GET_IP_URL =
	'https://geo.ipify.org/api/v1?apiKey=at_XUcz2Pcibasv4tt2q4mohSUsPRHuy&ipAddress=';
const MAP_TOKEN =
	'pk.eyJ1IjoiYXJ0ZW0tOTciLCJhIjoiY2tnaWNrZTZxMjk5ZTJxcWFoN2k1NjE3ZSJ9.k-Him0hdaWXlUrh9xDF7Ng';
const GET_MAP_URL = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAP_TOKEN}`;

const ipText = document.querySelector('#ip');
const locationText = document.querySelector('#location');
const timezoneText = document.querySelector('#timezone');
const ispText = document.querySelector('#isp');
const searchForm = document.querySelector('#search-form');
const mapWrapper = document.querySelector('#map-wrapper');
const error = document.querySelector('#error');

searchForm.search.focus();

const getData = async (ip) => {
	const response = await fetch(GET_IP_URL + ip);
	const result = await response.json();

	renderData(result);
};

const renderData = ({ ip, isp, location }) => {
	const { region, postalCode, city, timezone, lat, lng } = location;

	ipText.textContent = ip;
	ispText.textContent = isp;
	locationText.textContent = `${region}, ${city} ${postalCode}`;
	timezoneText.textContent = timezone;
	renderMap(lat, lng);
};

const renderMap = (lat, lng) => {
	mapWrapper.innerHTML = "<div class='map-wrapper__map' id='map'></div>";
	const newMap = document.querySelector('#map');

	const currentMap = L.map(newMap).setView([lat, lng], 15);

	const locationIcon = L.icon({
		iconUrl: './images/icon-location.svg',
	});

	L.marker([lat, lng], { icon: locationIcon }).addTo(currentMap);

	L.tileLayer(GET_MAP_URL, {
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: MAP_TOKEN,
	}).addTo(currentMap);
};

const validateIP = (value) => {
	const arr = value.split('.');

	if (arr.length < 4) {
		return 'IP adress must have 4 octets';
	}
};

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const value = e.target.search.value.trim();
	searchForm.search.focus();

	if (!value) {
		error.textContent = 'Search field cannot be blank';
		return;
	} else if (!validateIP(value)) {
		error.textContent = '';
	}

	error.textContent = validateIP(value);

	getData(value);

	e.target.search.value = '';
});

getData('');
