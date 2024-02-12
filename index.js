let userCity = '';
let apiKey = '';
const inputElement = document.getElementById('inputcity');
const dropdownElement = document.getElementById("dwbutton");

inputElement.addEventListener('input', () => {
    userCity = inputElement.value;
});
inputElement.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        fetchWeather(userCity);
    }
});
document.getElementById('inputApikey').addEventListener('input', () => {
    apiKey = document.getElementById('inputApikey').value;
});
document.getElementById('searchbutton').addEventListener('click', () => {
    fetchWeather(userCity);
});
function selectedItem(value) {
    dropdownElement.textContent = value;
}

async function fetchWeather(cityName) {
    try {
        let url;
        if(dropdownElement.textContent === 'Actual') {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        }
        else {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        
        if(dropdownElement.textContent === 'Actual') {

        }
        else {
            for(let i = 0; i < data.list.length; i++) {
                const date = new Date(data.list[i].dt * 1000);
                const formattedDate = date.toLocaleDateString("en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString("en-US", {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                  });
                console.log(formattedDate + ' ' + formattedTime);
            }
        }

        displayWeather(data);
    } catch (error) {
        const str = "Error fetching data: " + error;
        alert(str);
    }
}
  
function displayWeather(data) {
    // Extracting data from the response
    const cityName = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon;
    const weatherDescription = data.weather[0].description;

    // Constructing the icon URL
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    // Updating the DOM elements
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('temperature').textContent = `Temperature: ${temp} °C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} km/h`;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-icon').alt = `Icon representing ${weatherDescription}`;
}
