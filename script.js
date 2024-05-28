// const apiUrl = "https://api.coincap.io/v2/assets";

//  const fetchData = async () => {
//     let response = await fetch(apiUrl);
//     let data = await response.json();
//     return data;
//  }

//  let info = document.querySelector(".coin #h3");
// info.innerHTML = `${fetchData.priceUsd.floor(2)}`;

const apiUrl = "https://api.coincap.io/v2/assets";

const fetchData = async () => {
    try {
        let response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data.data; // Return the 'data' array from the API response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const updatePrices = async () => {
    const data = await fetchData();
    if (data) {
        const coins = [
            { id: 'bitcoin', selector: '.coin-list .coin:nth-child(1) h3' },
            { id: 'ethereum', selector: '.coin-list .coin:nth-child(2) h3' },
            { id: 'dogecoin', selector: '.coin-list .coin:nth-child(3) h3' }
        ];

        coins.forEach(coin => {
            const coinData = data.find(item => item.id === coin.id);
            if (coinData && coinData.priceUsd) {
                const priceElement = document.querySelector(coin.selector);
                if (priceElement) {
                    priceElement.innerHTML = `$${parseFloat(coinData.priceUsd).toFixed(2)}`;
                }
            }
        });
    }
};

// Call the function to update the prices
updatePrices();
