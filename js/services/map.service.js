export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
    getCords
}


// Var that is used throughout this Module (not global)
var gMap

function getMap(){
    return gMap
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
      
       
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBT0AREZeSbE8zpk93EJAsB06EdEr7QqA0' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



function getCords(address){
    // const API_KEY = 'AIzaSyBT0AREZeSbE8zpk93EJAsB06EdEr7QqA0' //TODO: Enter your API Key
    const API_KEY= 'AIzaSyBMwvwhw23wACBwC6TnwSR7icYolOe5C4I'


    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
    .then(res=>res.data.results[0].geometry.location)


}