var map;
var marker;
let currentWindow = null;
var place_to;
var place_from;
var station_list = []
let station_marker = []
let plan_markers = []
var avgLat;
var avgLng;
var dynamicData = []

var available_bikes_marker = [];
var available_parking_marker = [];

var loc_marker;

var nearby_from;
var min_dist_to;
var predicted_dest_bikes;

const DUBLIN_BOUNDS = {
    north: 53.425,
    south: 53.218,
    west: -6.443,
    east: -6.107,
};

let jcdecaux_key;
var currentDirectionsRenderers = [];

/*FETCH API AND ROUTES */
function getStations() {
    fetch("/stations")
        .then((response) => response.json())
        .then((data) => {
            station_list = [...data]
            
        })

}

function get_key() {
    fetch(`/get_api_JC`)
        .then(response => response.json())
        .then(res => {
            jcdecaux_key = res.jc_api
            fetch_dynamic_data('BIKE', jcdecaux_key)
        })
}

function fetchStation(station) {
    try {
        const url = `https://api.jcdecaux.com/vls/v1/stations/${station}?contract=Dublin&apiKey=4120cea72fb53ef56210be3d7231a47de7d29aef`;
        fetch(url)
            .then(response => response.json())
            .then(res => {
                manipulate_Pannel(res)
            })
            .catch(error => {
                console.log(error)
            });
    } catch (error) {
        console.log(error)
    }
}
function getHourlyAvailability(params) {
    fetch(`/hourlyAvailability/${params}`)
        .then(response => response.json())
        .then(res => {
            let hours = []
            for (let i = 0; i <= 23; i++) {
                hours.push(`${i}:00`)
            }

            let data = [['Hour', 'Average Available Bikes', 'Average Available Stands']]
            res.forEach((el, i) => {
                data.push([hours[i].toString(), Math.floor(el['Average Available Bikes']), Math.floor(el['Average Available Stands'])])
            })
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(() => drawChart(data, 'Hourly Average Availability', 'Hour', 'Average Available', 'column', 'myChart_hourly'));
        })
};

function getDailyAvailability(params) {
    fetch(`/dailyAvailability/${params}`)
        .then(response => response.json())
        .then(res => {
            let weekdays = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
            let data = [['Day', 'Average Available Bikes', 'Average Bike Stands']]
            res.forEach((el, i) => {
                data.push([weekdays[i].toString(), Math.floor(el['Average Available Bikes']), Math.floor(el['Average Available Stands'])])
            })
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(() => drawChart(data, 'Daily Average Availability', 'Days', 'Average Available', 'column', 'myChart_daily'));

            document.querySelector('.show_loader').style.display = 'none';
            document.querySelector('.show_charts').style.display = 'block';

        })
};
function fetchWeather(params) {
    const weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=53.350000&lon=-6.260000&appid=d7919dca0d3076d87855ecce2bd11059"
    fetch(weatherAPI)
        .then(response => response.json())
        .then(data => {
            // get today weekday
            const today = new Date();
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            // for week day
            for (let i = 1; i <= 5; i++) {
                const dayElement = document.getElementById(`day${i}`);
                const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
                const weekday = weekdays[date.getDay()];
                dayElement.textContent = `${weekday}`;

                // select json icon info
                const iconCode = (data.list[7 + (i - 1) * 8].weather[0].icon).substr(0,2);

                // set to icon
                const weatherIcon = document.getElementById(`icon${i}`);
                weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}d.png`;
            }
            const todayCode = data.list[0].weather[0].icon.substr(0,2);
            const todayIcon = document.getElementById(`icon0`);
            todayIcon.src = `https://openweathermap.org/img/wn/${todayCode}d.png`;
        })
}

function fetch_dynamic_data(condition, apikey) {
    try {
        const url = `https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=${apikey}`;
        fetch(url)
            .then(response => response.json())
            .then(res => {
                dynamicData = [...res]
                addStationMarkers(dynamicData, condition)
            })
            .catch(error => {
                console.log(error)
            });
    } catch (error) {
        console.log(error)
    }
}
/*END*/

/* Call The below Function on load*/
get_key()
getStations();
fetchWeather()
/*END*/




function initMap(params) {
    //BASIC MAP INTERGRATION--START//
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.34556228070175, lng: -6.264372894736842 },
        zoom: 14,
        restriction: {
            latLngBounds: DUBLIN_BOUNDS,
            strictBounds: false,
        },
    });
    var input_to = document.querySelector('.search_box-to');
    var input_from = document.querySelector('.search_box-from');
    var autocomplete_to = new google.maps.places.Autocomplete(input_to);
    var autocomplete_from = new google.maps.places.Autocomplete(input_from);
    autocomplete_to.bindTo('bounds', map);
    autocomplete_from.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    loc_marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete_to.addListener('place_changed', function () {
        infowindow.close();
        loc_marker.setVisible(false);
        let place = autocomplete_to.getPlace();
        if (!place.geometry) {
            window.alert("autocomplete_to's returned place contains no geometry");
            return;
        }

        place_to = { ...place }
    });

    autocomplete_from.addListener('place_changed', function () {
        infowindow.close();
        loc_marker.setVisible(false);
        let place = autocomplete_from.getPlace();
        if (!place.geometry) {
            window.alert("autocomplete_to's returned place contains no geometry");
            return;
        }

        place_from = { ...place }
    });
    //BASIC MAP INTERGRATION--END//

    //ON HOME LOAD SHOW AVAILABLE BIKES MARKER//
    //SHOW A SWITCH OF AVAILABLE BIKES AND PARKING//
    get_key()
    var labelDiv = document.createElement('div');
    labelDiv.style.marginTop = '10px';
    labelDiv.innerHTML = `
      <label class="switch btn-color-mode-switch">
        <input type="checkbox" name="color_mode" id="color_mode" value="1">
        <label for="color_mode" data-on="Parking" data-off="Bike" class="btn-color-mode-switch-inner"></label>
      </label>
    `;

    labelDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(labelDiv);
    var checkbox = labelDiv.querySelector('#color_mode');
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            removeMarker(available_bikes_marker)
            fetch_dynamic_data('PARKING', jcdecaux_key)
        } else {
            removeMarker(available_parking_marker)
            fetch_dynamic_data('BIKE', jcdecaux_key)
        }
    });


    //SHOW A LEGEND ON MAP
    var legendDiv = document.createElement('div');
    legendDiv.classList.add('map_legend')
    var title = document.createElement('p');
    title.innerHTML = 'Heatmap Legend';
    title.classList.add('map_legend_title')
    legendDiv.appendChild(title);
    var colorBoxes = [
        { color: '#FD7567', label: 'More than 10' },
        { color: '#fdf569', label: 'Between 5-9' },
        { color: '#00e64d', label: 'Between 0-5' }
    ];

    colorBoxes.forEach(function (colorBox) {
        let div = document.createElement('div');
        let box = document.createElement('div');
        let label = document.createElement('span');

        box.style.display = 'inline-block';
        box.style.width = '20px';
        box.style.height = '20px';
        box.style.marginRight = '10px';
        box.style.backgroundColor = colorBox.color;

        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.margin = '2px'

        label.innerHTML = colorBox.label;

        div.appendChild(box);
        div.appendChild(label);
        legendDiv.appendChild(div);
    });
    legendDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legendDiv);

}


/* Home Page Functionalities */

function addStationMarkers(stations, condition) {
    let infoWindow = new google.maps.InfoWindow();
    stations.forEach(station => {
        let stationName = station.name.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
        let con = condition === 'BIKE' ? 'available_bikes' : 'available_bike_stands'
        let initMarker = new google.maps.Marker({
            position: { ...station.position },
            map: map,
            title: stationName,
            station_number: station.number,
            icon: station[con] >= 10 ? 'https://maps.google.com/mapfiles/ms/icons/red.png' : (station[con] >= 5 && station[con] <= 9) ? 'https://maps.google.com/mapfiles/ms/icons/yellow.png' : 'https://maps.google.com/mapfiles/ms/icons/green.png'
        });
        if (condition == 'BIKE') {
            available_parking_marker = [];
            available_bikes_marker.push(initMarker);

        } else {
            available_bikes_marker = [];
            available_parking_marker.push(initMarker);
        }
        // Add the marker to the station_marker array
        station_marker.push(initMarker);
        // Set up the InfoWindow content
        let content = "Station Name: " + stationName + "<br>Station Number: " + station.number + "<br>Total Bike Stands: " + station.bike_stands;
        // Add a mouseover event listener to the Marker object
        google.maps.event.addListener(initMarker, 'mouseover', function () {
            if (currentWindow) currentWindow.close();
            infoWindow.setContent(content);
            infoWindow.open(map, initMarker);
            currentWindow = infoWindow;
        });
        google.maps.event.addListener(initMarker, 'mouseout', function () {
            infoWindow.close();
            currentWindow = null;
        });
        google.maps.event.addListener(initMarker, 'click', () => {
            const currentRoute = window.location.pathname;
            currentRoute !== '/plan' && openDetails(initMarker.station_number)
        });
    });
}


// sample code of drawChart
function drawChart(data, title, xaxis, yaxis, type, id) {
    var data = google.visualization.arrayToDataTable(data);
    let chart;
    var options = {
        title: title,
        chartArea: { width: '85%' },
        hAxis: {
            title: xaxis,
            minValue: 0
        },
        vAxis: {
            title: yaxis
        },
        colors: ['#55c57a', '#FF6833'],
        height: 350,
        legend: { position: "none" },
        isStacked: true
    };

    if (type == 'column') {
        chart = new google.visualization.ColumnChart(document.getElementById(id));
    } else if (type == 'bar') {
        chart = new google.visualization.BarChart(document.getElementById(id));
    } else {
        console.error('Invalid chart type: ' + type);
        return;
    }
    chart.draw(data, options);
}
window.initMap = initMap
/* END */

/* Plan My Jounrey Functions */
function checkField(params) {
    let to;
    let from;
    let day;
    let hour;
    let min;
    let meridiem;
    to = document.querySelector('.search_box-from').value;
    from = document.querySelector('.search_box-to').value;
    day = document.querySelector('.date_picker').value;
    hour = document.querySelector('.hour_picker').value;
    min = document.querySelector('.minutes_picker').value;
    meridiem = document.querySelector('.meridiem_picker').value;

    if (to == "" || from == "" || day == "" || hour == "" || min == "" || meridiem == "") {
        return false
    } else {
        // document.querySelector('.submit_button').style.backgroundColor = '#0c4c54'
        return true
    }
}


function search_nearby() {
    if (checkField()) {

        available_bikes_marker.length > 0 ? removeMarker(available_bikes_marker) : removeMarker(available_parking_marker)
        removeMarker(plan_markers)
        let nearby_to = []
        nearby_from = []
        station_list.forEach((station, i) => {
            let lat_to = station.position_lat - place_to.geometry.location.lat()
            let lng_to = station.position_lng - place_to.geometry.location.lng()
            let distance_to = Math.abs(lat_to) + Math.abs(lng_to)
            nearby_to.push(distance_to)

            let lat_from = station.position_lat - place_from.geometry.location.lat()
            let lng_from = station.position_lng - place_from.geometry.location.lng()
            let distance_from = Math.abs(lat_from) + Math.abs(lng_from)
            nearby_from.push(distance_from)
        });
        min_dist_to = station_list[min_dist_index(nearby_to)]
        const sortedArr = nearby_from.slice().sort((a, b) => a - b);
        const firstFiveSmallest = sortedArr.slice(0, 5);
        const source_array_index = firstFiveSmallest.map(num => nearby_from.indexOf(num));
        const source_array = []
        source_array_index.forEach(el => {
            source_array.push(station_list[el].number)
        })

        let hour = parseInt(document.querySelector('.hour_picker').value);
        let minutes = parseInt(document.querySelector('.minutes_picker').value);
        let meridiem = document.querySelector('.meridiem_picker').value;
        if (meridiem === "PM" && hour !== 12) {
            hour += 12;
        } else if (meridiem === "AM" && hour === 12) {
            hour = 0;
        }

        let date = document.querySelector('.date_picker').value
        let date_arr = date.split('-')
        const dateObj = new Date();
        dateObj.setFullYear(parseInt(date_arr[0]))
        dateObj.setMonth(parseInt(date_arr[1]) - 1)
        dateObj.setDate(parseInt(date_arr[2]))
        dateObj.setHours(hour)
        dateObj.setMinutes(minutes)
        const unixTimestamp = parseInt(dateObj.getTime() / 1000);

        fetch("/predict?" + new URLSearchParams({
            stations_id: source_array.join(','),
            timestamp: unixTimestamp,
            dest_station_id: min_dist_to.number
        }))
            .then(response => response.json())
            .then(res => {
                console.log(res);
                let index_src;
                predicted_dest_bikes = res.dest_availability_bikes;
                
                for (let i = 0; i < station_list.length; i++) {
                    if (station_list[i].number == res.station_id) {
                        index_src = i;
                        break;
                    }
                }
                let min_dist_from = { ...station_list[index_src] }
                currentDirectionsRenderers.forEach(directionsRenderer =>
                    directionsRenderer.setMap(null)
                );
                generate_route(place_from.geometry.location.lat(), place_from.geometry.location.lng(), min_dist_from.position_lat, min_dist_from.position_lng, 'red', 'WALKING')
                generate_route(min_dist_from.position_lat, min_dist_from.position_lng, min_dist_to.position_lat, min_dist_to.position_lng, 'blue', 'BICYCLING')
                generate_route(min_dist_to.position_lat, min_dist_to.position_lng, place_to.geometry.location.lat(), place_to.geometry.location.lng(), 'red', 'WALKING')
                updatePrediction(min_dist_from, min_dist_to, res.station_id, res.availability_bike[0])
            })
    }else{
        alert("Please fill all the details!");
        return false;
    }

}




function generate_route(og_lat, og_lng, ds_lat, ds_lng, type, mode) {
    var directionsService = new google.maps.DirectionsService();

    // Request directions between the two points
    var request = {
        origin: { lat: og_lat, lng: og_lng },
        destination: { lat: ds_lat, lng: ds_lng },
        travelMode: mode,

    };

    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            // Create a DirectionsRenderer object and set its options
            var directionsRenderer = new google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: type
                },
                suppressBicyclingLayer: true
            });
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(result);
            currentDirectionsRenderers.push(directionsRenderer)
        }
    });
}

function updatePrediction(source, destination, station_id, predticedBike) {
    document.querySelector('.prediction_Container').style.display = 'block';
    document.querySelector('.station_name_source').innerHTML = source.name;
    document.querySelector('.station_lat_source').innerHTML = source.position_lat;
    document.querySelector('.station_lng_source').innerHTML = source.position_lng;
    document.querySelector('.station_bike_value_source').innerHTML = Math.floor(predticedBike);
    document.querySelector('.station_parking_value_dest').innerHTML = destination.bike_stands - Math.floor(predicted_dest_bikes);
    document.querySelector('.station_name_dest').innerHTML = destination.name;
    document.querySelector('.station_lat_dest').innerHTML = destination.position_lat;
    document.querySelector('.station_lng_dest').innerHTML = destination.position_lng;
}
/* END */



/*Manipulate Dom Functionlities*/
function manipulate_Pannel(params) {
    document.querySelector('.station_name').innerHTML = params.name;
    document.querySelector('.station_lat').innerHTML = params.position.lat;
    document.querySelector('.station_lng').innerHTML = params.position.lng;
    document.querySelector('.station_available_value').innerHTML = params.available_bikes;
    document.querySelector('.station_parking_value').innerHTML = params.available_bike_stands;
    document.querySelector('.station_banking_value').innerHTML = params.banking == true ? 'Available' : 'Not Available';
    document.querySelector('.station_bonus_value').innerHTML = params.bonus == true ? 'Available' : 'Not Available';
    document.querySelector('.station_status_value').innerHTML = params.status;
}

function openDetails(params) {
    const panel = document.querySelector('.station_info');
    const map_panel = document.getElementById('map')
    map_panel.classList.add('open_map')
    panel.classList.add('open_station_info');
    fetchStation(params);
    document.querySelector('.show_loader').style.display = 'flex';
    document.querySelector('.show_charts').style.display = 'none';
    getHourlyAvailability(params);
    getDailyAvailability(params);
}

function closeDetails() {
    const panel = document.querySelector('.station_info');
    const map_panel = document.getElementById('map')
    map_panel.classList.remove('open_map')
    panel.classList.remove('open_station_info');
}

/* END */



/*Utiltity Function*/
function removeMarker(arr) {
    if (arr.length > 0) {
        arr.forEach((marker) => {
            marker.setMap(null);
        })
        arr = []
    }
}

function min_dist_index(arr) {
    const minVal = Math.min(...arr); // find minimum value
    return arr.indexOf(minVal);
}

/* END */