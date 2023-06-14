var searchInput;
const searchBtn = document.getElementById('button-addon2');
const todayEl = document.getElementById('today');
const thisWeekEl = document.getElementById('thisWeek');
const recentSearchesEl = document.getElementById('recentSearches');
const apiKey = "00d6e70ab2dff997ca29fe649255f321";
var lat;
var lon;
var recentSearchesArr = [];

var recentSearchBtn = document.createElement("input");
recentSearchBtn.type = "button";
recentSearchBtn.setAttribute("class", "btn btn-primary recent");

if(JSON.parse(localStorage.getItem("recentSearches")) != null) {
    recentSearchesArr = (JSON.parse(localStorage.getItem("recentSearches")));
} else {
    console.log("error")
}

function recentSearch() {
    if (recentSearchesArr.length == 0) {
        console.log("error")
        return;
    } else {
        for (var i=0; i<recentSearchesArr.length; i++){
            recentSearchBtn = document.createElement("input");
            recentSearchBtn.type = "button";
            recentSearchBtn.value = recentSearchesArr[i];
            recentSearchBtn.setAttribute("id", recentSearchesArr[i]);
            recentSearchBtn.setAttribute("class", "btn btn-primary recent");
            recentSearchesEl.appendChild(recentSearchBtn);
        }
    }

    $(".recent").click(function(event) {
        event.preventDefault();
        searchInput = $(this).val();
        console.log(searchInput);
        search();
    })
}

$(searchBtn).click(function(event) {
    event.preventDefault();
    searchInput = document.getElementById('searchInput').value;
    console.log(searchInput);
    search();
})

function search() {
    console.log(searchInput);
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.list[0])
                console.log(data.list[8])
                console.log(data.list[16])
                console.log(data.list[24])
                console.log(data.list[32])
                console.log(data.list[39])
                if (recentSearchesArr.includes(data.city.name) != true) {
                recentSearchesArr.push(data.city.name);
                }
                localStorage.setItem("recentSearches", JSON.stringify(recentSearchesArr));
                todayEl.removeAttribute('class')
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
                            <h5>${dayjs.unix(data.list[8].dt).format('M/DD/YYYY')}</h5>
                            <img src="https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}.png">
                            <p>Temp: ${data.list[8].main.temp}°F</p>
                            <p>Wind: ${data.list[8].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[8].main.humidity}%</p>
                        </div>
                    </div>
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[16].dt).format('M/DD/YYYY')}</h5>
                            <img src="https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}.png">
                            <p>Temp: ${data.list[16].main.temp}°F</p>
                            <p>Wind: ${data.list[16].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[16].main.humidity}%</p>
                        </div>
                    </div>
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[24].dt).format('M/DD/YYYY')}</h5>
                            <img src="https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}.png">
                            <p>Temp: ${data.list[24].main.temp}°F</p>
                            <p>Wind: ${data.list[24].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[24].main.humidity}%</p>
                        </div>
                    </div>
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[32].dt).format('M/DD/YYYY')}</h5>
                            <img src="https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}.png">
                            <p>Temp: ${data.list[32].main.temp}°F</p>
                            <p>Wind: ${data.list[32].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[32].main.humidity}%</p>
                        </div>
                    </div>
                    <div class="card" style="max-width: 10rem;">
                        <div class="card-body">
                            <h5>${dayjs.unix(data.list[39].dt).format('M/DD/YYYY')}</h5>
                            <img src="https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}.png">
                            <p>Temp: ${data.list[39].main.temp}°F</p>
                            <p>Wind: ${data.list[39].wind.speed}MPH</p>
                            <p>Humidity: ${data.list[39].main.humidity}%</p>
                        </div>
                    </div>
                `
            })
    })
}

recentSearch();