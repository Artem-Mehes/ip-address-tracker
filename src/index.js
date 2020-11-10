import * as L from 'leaflet';
import 'normalize.css';
import '../node_modules/leaflet/dist/leaflet.css';
import './style.scss';
import locationIcon from './images/icon-location.svg';

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

	const currentMap = L.map(newMap, { zoomControl: false }).setView([lat, lng], 15);

	const icon = L.icon({
		iconUrl: locationIcon,
		iconSize: [46, 56],
		iconAnchor: [23, 56]
	});

	L.marker([lat, lng], { icon }).addTo(currentMap);

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
	if (!value) {
		return 'Search field cannot be blank';
	}

	const arr = value.split('.');

	if (arr.length < 4) {
		return 'IP adress must have 4 octets';
	} else if (arr.some((item) => isNaN(item))) {
		return 'Only digit has allowed';
	} else if (arr.some((item) => +item < 0 || +item > 255)) {
		return 'All numbers must be between 0 and 255';
	} else {
		return '';
	}
};

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const value = e.target.search.value.trim();
	searchForm.search.focus();

	const errMessage = validateIP(value);

	if (errMessage) {
		error.textContent = errMessage;
	} else {
		getData(value);
	}
});

getData('');
