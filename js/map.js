// Initialize the map
const map = L.map("map").setView([62.1699, 12.9384], 5);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
}).addTo(map);

const customIcon = L.icon({
    iconUrl: "./images/marker.svg",
    iconSize: [32, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const fetchDataForMap = async () => {
    const username = "dev@getonnet.agency";
    const password = "kothinpassword";
    const apiUrl = `https://friluftsliv.getonnet.dev/api/events?per_page=40`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa(`${username}:${password}`),
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("data", data);

        const formatDateAndTimeForMap = (datetimeString) => {
            const datetime = new Date(datetimeString);

            // Extract the date
            const date = datetime.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
            });

            // Extract the time
            const time = datetime.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
            });

            return { date, time };
        };
        data?.data?.forEach((item) => {
            const { date: start_date, time: start_time } = formatDateAndTimeForMap(item.start_time);
            const { date: end_date, time: end_time } = formatDateAndTimeForMap(item.end_time);

            const lat = Number(item.lat).toFixed(4);
            const long = Number(item.long).toFixed(4);

            const marker = L.marker([lat, long], {
                icon: customIcon,
            }).addTo(map);

            marker.bindPopup(`
                    <div class="hover_card_container_img_area">
                        <div class="card_container_inner_img_area">
                            <img src="${item.image}" alt="" />
                        </div>
                    </div>
                    <div class="card_container_text_area">
                        <div class="card_conatiner_title">${item.title}</div>
                        <div class="card_conatiner_desc card_conatiner_desc_one">
                            <div>
                                <img
                                    src="./images/location.svg"
                                    alt=""
                                    height="16"
                                    width="16"
                                />
                            </div>
                            <div class="card_conatiner_text">${item.location}</div>
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
                            <div class="card_conatiner_text">${start_date} - ${end_date}</div>
                        </div>
                        <div class="card_conatiner_desc">
                            <div>
                                <img src="./images/time.svg" alt="" height="16" width="16" />
                            </div>
                            <div class="card_conatiner_text">${start_time}-${end_time}</div>
                        </div>
                    </div>
            `);
        });
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("dataContainer").textContent = `Error: ${error.message}`;
    }
};

document.addEventListener("DOMContentLoaded", fetchDataForMap);
