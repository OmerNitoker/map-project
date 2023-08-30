import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onRemoveLoc = onRemoveLoc
window.onGoLoc = onGoLoc

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            const map = mapService.getMap()
            map.addListener('click', ev => {
                const name = prompt('Place name?')
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                console.log(name, lat, lng)
                onAddLocation(name, lat, lng)
            })
        })
        .catch(() => console.log('Error: cannot init map'))
}

function onAddLocation(name, lat, lng) {
    locService.addLoc(name, lat, lng)

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(renderLocations)
}

function renderLocations(locations) {
    let strHtml = `<table><tr><th>Place</th><th>lat</th><th>lng</th><th>Created at</th><th>Updated at</th><th>Go</th><th>Edit</th><th>Delete</th></tr>`
    let strHtmls = locations.map(location => `<tr><td>${location.name}</td><td>${location.lat}</td><td>${location.lng}</td><td>${location.createdAt}</td><td>${location.updatedAt}</td><td><button onclick="onGoLoc(${location.id}")>Go</button></td><td><button onclick="onEditLoc(${location.id})">Edit</button></td><td><button onclick="onRemoveLoc(${location.id})">Delete</button></td></tr>`)
    strHtml += strHtmls.join('') + `</table>`
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onRemoveLoc(locId) {
    locService.remove(locId)
}

function onGoLoc(locId) {
    console.log(locId)
    locService.get(locId)
        .then(loc=>mapService.panTo(loc.lat,loc.lng))
}

// ZZUzB