export const locService = {
    getLocs,
    get,
    remove,
    save, 
    addLoc
}

import { storageService } from './async-storage.service.js'


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

const LOC_KEY = 'locDB'

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLoc(name, lat, lng) {
    const loc = _createLoc(name, lat, lng)
    return storageService.post(LOC_KEY,loc)
}

function _createLoc(name, lat,lng) {
    return {
        name,
        lat,
        lng,
        createdAt: new Date(),
        updatedAt: ''
    }
}

function get(locId) {
    return storageService.get(LOC_KEY, locId)
}

function remove(locId) {
    return storageService.remove(LOC_KEY, locId)
}

function save(location) {
    if (location.id) {
        return storageService.put(LOC_KEY, pet)
    } else {
        return storageService.post(LOC_KEY, pet)
    }
}

// function _createLocations() {
//     let locations = utilService.loadFromStorage(LOC_KEY)
//     if (!locations || !locations.length) {
//         _createDemoLocations()
//     }
// }


