var searchInput;
const searchBtn = document.getElementById('button-addon2');
const todayEl = document.getElementById('today');
const thisWeekEl = document.getElementById('thisWeek');
const apiKey = "00d6e70ab2dff997ca29fe649255f321";
var lat;
var lon;

searchBtn.addEventListener('click', search);

function search(event) {
    event.preventDefault();
    searchInput = document.getElementById('searchInput').value
    console.log(searchInput);
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.list[0])
                console.log(data.list[8])
                console.log(data.list[16])
                console.log(data.list[24])
                console.log(data.list[32])
                console.log(data.list[39])
                todayEl.innerHTML = `
                    <h2>${data.city.name} ${dayjs.unix(data.list[0].dt).format('M/DD/YYYY')}</h2>
                    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png">
                    <p>Temp: ${data.list[0].main.temp}°F</p>
                    <p>Wind: ${data.list[0].wind.speed}MPH</p>
                    <p>Humidity: ${data.list[0].main.humidity}%</p>
                `
                thisWeekEl.innerHTML = `
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[0].dt).format('M/DD/YYYY')}</h5>
                            <p>Temp: ${data.list[0].main.temp}°F</p>
                            <p>Wind: ${data.list[0].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[0].main.humidity}%</p>
                        </div>
                    </div>
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[0].dt).format('M/DD/YYYY')}</h5>
                            <p>Temp: ${data.list[0].main.temp}°F</p>
                            <p>Wind: ${data.list[0].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[0].main.humidity}%</p>
                        </div>
                    </div>
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[0].dt).format('M/DD/YYYY')}</h5>
                            <p>Temp: ${data.list[0].main.temp}°F</p>
                            <p>Wind: ${data.list[0].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[0].main.humidity}%</p>
                        </div>
                    </div>
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[0].dt).format('M/DD/YYYY')}</h5>
                            <p>Temp: ${data.list[0].main.temp}°F</p>
                            <p>Wind: ${data.list[0].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[0].main.humidity}%</p>
                        </div>
                    </div>
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[0].dt).format('M/DD/YYYY')}</h5>
                            <p>Temp: ${data.list[0].main.temp}°F</p>
                            <p>Wind: ${data.list[0].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[0].main.humidity}%</p>
                        </div>
                    </div>

                `
            })
    })
}