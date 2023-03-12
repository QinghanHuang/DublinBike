var map;
var marker
function initMap(params) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.349804, lng:-6.260310},
        zoom: 12
    });

    marker = new google.maps.Marker({
        position: {lat: 53.349804, lng:-6.260310},
        map: map,
        });
}
window.initMap = initMap