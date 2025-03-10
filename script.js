document.addEventListener("DOMContentLoaded", () => {
    const companyInput = document.getElementById("company-input");
    const getPriceBtn = document.getElementById("get-price-btn");
    const priceInfo = document.getElementById("price-info");
    const errorMessage = document.getElementById("error-message");
    const companyName = document.getElementById("company-name");
    const priceDisplay = document.getElementById("price");
    const messageDisplay = document.getElementById("message");

    getPriceBtn.addEventListener("click", async () => {
        const company = companyInput.value.trim();
        if (!company) {
            return;
        }

        try {
            const priceData = await fetchPriceData(company)
            displayPriceData(priceData);
        } catch (error) {
            showError();
        }

        async function fetchPriceData(company) {
            const url = `https://api.freeapi.app/api/v1/public/stocks/${company}`
            const response = await fetch(url)

            console.log(response)

            if (!response.ok) {
                throw new Error("Company not found");
            }
            const data = await response.json();
            return data;
        }

        function displayPriceData(cdata) {
            console.log(cdata)
            const { data, message } = cdata;

            companyName.textContent = `Name: ${data.Name}`;
            priceDisplay.textContent = `Price: ${data.CurrentPrice}`;
            messageDisplay.textContent = message;

            priceInfo.classList.remove("hidden");
            errorMessage.classList.add("hidden");
        }
    });

    function showError() {
        errorMessage.classList.remove("hidden");
        priceInfo.classList.add("hidden");
    }
})