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

// Marker group to manage map markers
const markerGroup = L.layerGroup().addTo(map);

const fetchDataWithBasicAuth = async () => {
    const totalResult = document.getElementById("totalResult");
    const username = "dev@getonnet.agency";
    const password = "kothinpassword";
    const apiUrl = `https://friluftsliv.getonnet.dev/api/events?per_page=40`;

    let allData = []; // Cache for all data
    let filteredData = []; // For filtered data
    let isFiltered = false; // Track if the data is filtered

    // Utility function to format date and time
    const formatDateAndTime = (datetimeString) => {
        const datetime = new Date(datetimeString);

        const date = datetime.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
        });

        const time = datetime.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return { date, time };
    };

    // Function to update the map markers
    const updateMapMarkers = (data) => {
        markerGroup.clearLayers(); // Clear existing markers
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
        data.forEach((item) => {
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
                         ${
                             item.image
                                 ? `<img src="${item.image}" alt="Image" onerror="this.style.display='none'; this.parentElement.style.backgroundColor='#f0f8ff';" />`
                                 : `<div class="image_not_found"></div>`
                         }
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

            marker.addTo(markerGroup);
        });
    };

    // Function to render data
    const renderData = (data) => {
        const dataContainer = document.querySelector(".divider_area_left_grid");
        dataContainer.innerHTML = ""; // Clear previous content

        data?.forEach((item) => {
            const { date: start_date, time: start_time } = formatDateAndTime(item.start_time);
            const { date: end_date, time: end_time } = formatDateAndTime(item.end_time);

            const markup = `<div class="card_container">
                                <div class="card_container_img_area">
                                    <div <div class="card_container_inner_img_area">
                                ${
                                    item.image
                                        ? `<img src="${item.image}" alt="Image" onerror="this.style.display='none'; this.parentElement.style.backgroundColor='#f0f8ff';" />`
                                        : `<div class="image_not_found"></div>`
                                }
                                </div>
                                    <div class="card_container_inner_img_area_icon">
                                        <img src="./images/arrow.svg" alt="" height="17.33" width="17.33" />
                                    </div>
                                </div>
                                <div class="card_container_text_area">
                                    <div class="card_conatiner_title">${item.title}</div>
                                    <div class="card_conatiner_desc card_conatiner_desc_one">
                                        <div>
                                            <img src="./images/location.svg" alt="" height="16" width="16" />
                                        </div>
                                        <div class="card_conatiner_text">${item.location}</div>
                                    </div>
                                    <div class="card_conatiner_desc">
                                        <div>
                                            <img src="./images/calender.svg" alt="" height="16" width="16" />
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
                            </div>`;
            dataContainer.insertAdjacentHTML("beforeend", markup);
        });

        // Update the total result count and map markers
        totalResult.textContent = `${data.length}`;
        updateMapMarkers(data);
    };

    // Function to fetch all data if not cached
    const fetchAllData = async () => {
        if (allData.length > 0) {
            console.log("Using cached allData");
            return allData; // Return cached data if available
        }

        console.log("Fetching all data from API");
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
        allData = data.data; // Cache the fetched data
        return allData;
    };

    try {
        // Fetch and render all data initially
        allData = await fetchAllData();
        renderData(allData); // Render all data and update map markers

        // Add form submission handler for filtering
        const form = document.getElementById("form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Get the filter parameters
            const title = document.getElementById("title").value;
            const fylkesnavn = document.getElementById("selectOne").value;
            const kommunenavn = document.getElementById("selectTwo").value;
            console.log(title, kommunenavn, fylkesnavn);
            let selectedDates = document.getElementById("selectedDates").dataset.dates;

            if (selectedDates) {
                try {
                    selectedDates = JSON.parse(selectedDates);
                } catch (error) {
                    console.error("Failed to parse selected dates:", error);
                    selectedDates = [];
                }
            } else {
                selectedDates = [];
            }

            const start_time = selectedDates[0];
            const end_time = selectedDates[selectedDates.length - 1];

            // Check if any filter is applied
            isFiltered = !!title || !!start_time || !!end_time;

            if (!isFiltered) {
                // If no filter, render all data
                renderData(allData);
                return;
            }

            // Build filtered API URL
            const filteredApiUrl = new URL(apiUrl);
            if (title) {
                filteredApiUrl.searchParams.append("title", title);
            }
            if (start_time) {
                filteredApiUrl.searchParams.append("start_time", start_time);
            }
            if (end_time) {
                filteredApiUrl.searchParams.append("end_time", end_time);
            }
            if (fylkesnavn) {
                filteredApiUrl.searchParams.append("fylkesnavn", fylkesnavn);
            }
            if (kommunenavn) {
                filteredApiUrl.searchParams.append("kommunenavn", kommunenavn);
            }

            try {
                const filteredResponse = await fetch(filteredApiUrl, {
                    method: "GET",
                    headers: {
                        Authorization: "Basic " + btoa(`${username}:${password}`),
                    },
                });

                if (!filteredResponse.ok) {
                    throw new Error(`Error: ${filteredResponse.status} ${filteredResponse.statusText}`);
                }

                const filteredResult = await filteredResponse.json();
                filteredData = filteredResult.data; // Update filtered data
                renderData(filteredData); // Render filtered data and update map markers
            } catch (error) {
                console.error("Fetch error during filtering:", error);
            }
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

document.addEventListener("DOMContentLoaded", fetchDataWithBasicAuth);
