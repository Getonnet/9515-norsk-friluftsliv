document.addEventListener("DOMContentLoaded", () => {
    const selectItemOne = document.getElementById("selectOne");
    const selectItemTwo = document.getElementById("selectTwo");

    const fetchDataWithFilter = async () => {
        const username = "dev@getonnet.agency";
        const password = "kothinpassword";
        const apiUrl = `https://friluftsliv.getonnet.dev/api/event-filters`;

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

            // Initialize Choices.js with the select element
            const selectOne = new Choices(selectItemOne, {
                searchEnabled: true,
            });
            const selectTwo = new Choices(selectItemTwo, {
                searchEnabled: true,
            });

            const formattedChoices = data.fylkesnavn.map((item) => {
                return {
                    value: item,
                    label: item,
                };
            });
            selectOne.setChoices([...formattedChoices], "value", "label", true);
            const formattedChoicesTwo = data.kommunenavn.map((item) => {
                return {
                    value: item,
                    label: item,
                };
            });
            selectTwo.setChoices([...formattedChoicesTwo], "value", "label", true);
            console.log(data);
        } catch (error) {
            console.error("Fetch error:", error);

            // Display error message to the user
            const container = document.getElementById("dataContainer");
            if (container) {
                container.textContent = `Error: ${error.message}`;
            }
        }
    };

    fetchDataWithFilter();
});
