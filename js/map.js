// Initialize the map
const map = L.map("map").setView([60.1699, 24.9384], 5);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

const customIcon = L.icon({
  iconUrl: "../images/marker.svg",
  iconSize: [32, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Locations array
const locations = [
  {
    lat: 60.1699,
    lng: 24.9384,
    title: "Panorama Stølsheimen",
    image: "./images/image 27.png",
  },
  {
    lat: 59.3293,
    lng: 18.0686,
    title: "Panorama Stølsheimen",
    image: "./images/image 27.png",
  },
  {
    lat: 58.9699,
    lng: 5.7331,
    title: "Panorama Stølsheimen",
    image: "./images/image 27.png",
  },
  {
    lat: 61.9241,
    lng: 25.7482,
    title: "Panorama Stølsheimen",
    image: "./images/image 27.png",
  },
  {
    lat: 60.4518,
    lng: 22.2666,
    title: "Panorama Stølsheimen",
    image: "./images/image 27.png",
  },
];

// Loop through the locations and add markers
locations.forEach((location, index) => {
  const marker = L.marker([location.lat, location.lng], {
    icon: customIcon,
  }).addTo(map);
  marker.bindPopup(`
            <div class="hover_card_container_img_area">
                <div class="card_container_inner_img_area">
                    <img src="${location.image}" alt="" />
                </div>
            </div>
            <div class="card_container_text_area">
                <div class="card_conatiner_title">${location.title}</div>
                <div class="card_conatiner_desc card_conatiner_desc_one">
                    <div>
                        <img
                            src="./images/location.svg"
                            alt=""
                            height="16"
                            width="16"
                        />
                    </div>
                    <div class="card_conatiner_text">Location ${index + 1}</div>
                </div>
                <div class="card_conatiner_desc">
                    <div>
                        <img
                            src="./images/calender.svg"
                            alt=""
                            height="16"
                            width="16"
                        />
                    </div>
                    <div class="card_conatiner_text">18. Jan. 2025</div>
                </div>
                <div class="card_conatiner_desc">
                    <div>
                        <img src="./images/time.svg" alt="" height="16" width="16" />
                    </div>
                    <div class="card_conatiner_text">Kl. 07.00 - 23.59</div>
                </div>
            </div>
    `);
});
