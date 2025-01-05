const fetchDataWithBasicAuth = async () => {
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
        console.log(data);

        const formatDateAndTime = (datetimeString) => {
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

        data?.data.map((item) => {
            const { date: start_date, time: start_time } = formatDateAndTime(item.start_time);
            const { date: end_date, time: end_time } = formatDateAndTime(item.end_time);

            const markup = `<div class="card_container">
                            <div class="card_container_img_area">
                                <div class="card_container_inner_img_area">
                                    <img src=${item.image} alt="" />
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
            const dataContainer = document.querySelector(".divider_area_left_grid");
            dataContainer.insertAdjacentHTML("beforeend", markup);
        });
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("dataContainer").textContent = `Error: ${error.message}`;
    }
};

document.addEventListener("DOMContentLoaded", fetchDataWithBasicAuth);
