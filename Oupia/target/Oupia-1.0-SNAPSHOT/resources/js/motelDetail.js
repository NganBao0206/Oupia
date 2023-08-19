let lat = 10.8173119;
let lng = 106.6763588;
let isHaveLocation = false;
function setLatLng(x, y, isLocation) {
    lat = x;
    lng = y;
    isHaveLocation = isLocation;
}
function initMap() {
    const CONFIGURATION = {
        "ctaTitle": "Checkout",
        "mapOptions": {"center": {"lat": lat, "lng": lng}, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 12, "zoomControl": true, "maxZoom": 22, "mapId": ""},
        "mapsApiKey": "AIzaSyBzxzB92Cnje6rgg4kQzenDUPZpR9G4Taw",
        "capabilities": {"addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true}
    };
    const map = new google.maps.Map(document.getElementById("gmp-map"), {
        zoom: 20,
        center: {lat: lat, lng: lng},
        mapTypeControl: false,
        fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
        zoomControl: CONFIGURATION.mapOptions.zoomControl,
        streetViewControl: CONFIGURATION.mapOptions.streetViewControl
    });

    let marker = null;
    if (!isHaveLocation)
        marker = new google.maps.Marker({map: map, draggable: false});
    else
        marker = new google.maps.Marker({
            position: {"lat": lat, "lng": lng},
            map: map,
            draggable: false,
        });


    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    const addressInput = document.getElementById('addressInput');

    const nameInput = document.getElementById('nameInput');

    const autocomplete = new google.maps.places.Autocomplete(nameInput, {
        fields: ["place_id", "address_components", "geometry", "name"],
        types: ["establishment"],
        strictBounds: false,
    });

    autocomplete.addListener('place_changed', function () {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            document.querySelector("#latitudeInput").value = "";
            document.querySelector("#longitudeInput").value = "";
            return;
        }
        renderAddress(place);
        nameInput.value = place.name
        getInfomation(place.place_id);
    });


    function renderAddress(place) {
        infowindow.close();
        map.setCenter(place.geometry.location);
        marker.setPosition(place.geometry.location);
        document.querySelector("#latitudeInput").value = place.geometry.location.lat();
        document.querySelector("#longitudeInput").value = place.geometry.location.lng();
        marker.setVisible(true);
    }

    function getInfomation(placeId) {
        const request = {
            placeId: placeId,
            fields: ["name", "formatted_address", "place_id", "formatted_phone_number", "photos"],
        };

        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                addressInput.value = place.formatted_address;
                document.querySelector("#btnGetGoogleImgs").onclick = function () {
                    const imgsGoogle = document.querySelector("#imgsFromGoogle");
                    imgsGoogle.innerHTML = "";
                    let html = ""
                    for (let i = 0; i < place.photos.length; i++) {
                        html += ` <div class="position-relative m-1">
                        <input type="hidden" name="imgGoogle[${i}]" value="${place.photos[i].getUrl()}"/>
                        <span onclick="removeImg(this)" class="cursor-hand position-absolute end-0 top-0 bg-dark text-white rounded text-center m-1 bg-opacity-50 shadow-sm" style="width: 25px; height:25px;">x</span>
                        <img style="width:200px; height:150px; object-fit: cover;" class="rounded-3" src="${place.photos[i].getUrl()}"/>
                    </div>`
                    }
                    imgsGoogle.innerHTML = html;
                }

                google.maps.event.addListener(marker, "click", () => {
                    const content = document.createElement("div");

                    const nameElement = document.createElement("h4");
                    nameElement.textContent = place.name;
                    content.appendChild(nameElement);

                    const phoneElement = document.createElement("p");
                    phoneElement.textContent = place.formatted_phone_number;
                    content.appendChild(phoneElement);


                    const placeAddressElement = document.createElement("p");
                    placeAddressElement.textContent = place.formatted_address;
                    content.appendChild(placeAddressElement);

                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            }
        });
    }
}

function addImage(obj) {
    if (obj.files && obj.files.length > 0) {
        const container = document.querySelector("#imgsImport")
        container.innerHTML = "";
        for (let i = 0; i < obj.files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgSrc = e.target.result; // Lưu trữ giá trị src
                const lastChild = container.lastElementChild;

                const newHtml = `<div class="position-relative m-1">
                                    <img style="width:200px; height:150px; object-fit: cover;" class="rounded-3" src="${imgSrc}"/>
                                 </div>`;


                // Insert the HTML content after the lastChild
                if (lastChild)
                    lastChild.insertAdjacentHTML("afterend", newHtml);
                else
                    container.innerHTML = newHtml;
            };


            reader.readAsDataURL(obj.files[i]);
        }
    }
}

function removeImg(obj) {
    obj.parentElement.remove()
}