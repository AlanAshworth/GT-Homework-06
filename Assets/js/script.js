$(function () {
  // DOM ------------------------------------------------------------------------------------
  var cities = [];
  var searchedCityList = document.getElementById("searchedCityList");

  // Function calls -------------------------------------------------------------------------
  initializeCities();

  // Functions ------------------------------------------------------------------------------
  function initializeCities() {
    let savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities !== null) {
      cities = savedCities;
    }
    updateCityList();
  }

  function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  function updateCityList() {
    $("#searchedCityList").html("");
    for (let i = 0; i < cities.length; i++) {
      let newCity = $("<li>")
        .addClass("list-group-item")
        .attr("data-city", cities[i])
        .text(cities[i]);
      $("#searchedCityList").prepend(newCity);
    }
  }

  function addCity(event) {
    event.preventDefault();

    if ($("#searchCityInput").val() === "") {
      return;
    } else {
      cities.push($("#searchCityInput").val());
      $("#searchCityInput").val("");
      saveCities();
      updateCityList();
    }
  }

  // TODO: set weather card and forecast cards to clicked index
  function targetCity(event) {
    var element = event.target;

    if (element.matches("li") === true) {
      var index = element.getAttribute("data-city");
      console.log("data-city: ", index);
      return index;
    }
  }

  // Event-Listeners ------------------------------------------------------------------------
  $("#searchCityButton").on("click", addCity);
  $("#searchedCityList").on("click", targetCity);

  // API Calls ------------------------------------------------------------------------------
  var q = "Atlanta";
  var apikey = "54a9099a651206645d31affb6bbd4e54";
  var queryWeatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    q +
    "&units=imperial&appid=" +
    apikey;

  var queryForecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    q +
    "&units=imperial&appid=" +
    apikey;

  // Get the current day's weather | API documentation @ https://openweathermap.org/current
  $.ajax({
    url: queryWeatherURL,
    method: "GET",
  }).then(function (response) {
    console.log("Weather: ", queryWeatherURL);
    console.log(response);

    console.log(
      response.name + " (" + moment().format("l") + ") " + response.weather.icon
    );
    console.log("Temperature: " + response.main.temp + " °F");
    console.log("Humidity: " + response.main.humidity + "%");
    console.log("Wind Speed: " + response.wind.speed + " MPH");

    var lattitude = response.coord.lat;
    var longitude = response.coord.lon;

    $("#weatherHighlight").text(
      response.name + " (" + moment().format("l") + ") "
    );
    $("#weatherIcon").attr(
      "src",
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );
    $(".temp").text("Temperature: " + response.main.temp + " °F");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");

    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        apikey +
        "&lat=" +
        lattitude +
        "&lon=" +
        longitude,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log("atlanta: ", response.value);

      $(".uv").text("UV Index: " + response.value);
    });
  });

  // Get the forecasted weather | API documentation @ https://openweathermap.org/forecast5
  $.ajax({
    url: queryForecastURL,
    method: "GET",
  }).then(function (response) {
    console.log("Forecast: ", queryForecastURL);
    console.log(response);

    $("#forecastDateDay1").text(moment().add(1, "days").format("l"));
    $("#forecastDateDay2").text(moment().add(2, "days").format("l"));
    $("#forecastDateDay3").text(moment().add(3, "days").format("l"));
    $("#forecastDateDay4").text(moment().add(4, "days").format("l"));
    $("#forecastDateDay5").text(moment().add(5, "days").format("l"));

    $("#forecastIconDay1").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[0].weather[0].icon +
        ".png"
    );
    $("#forecastIconDay2").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[10].weather[0].icon +
        ".png"
    );
    $("#forecastIconDay3").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[19].weather[0].icon +
        ".png"
    );
    $("#forecastIconDay4").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[28].weather[0].icon +
        ".png"
    );
    $("#forecastIconDay5").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[37].weather[0].icon +
        ".png"
    );

    $("#forecastTempDay1").text("Temp: " + response.list[0].main.temp + " °F");
    $("#forecastTempDay2").text("Temp: " + response.list[10].main.temp + " °F");
    $("#forecastTempDay3").text("Temp: " + response.list[19].main.temp + " °F");
    $("#forecastTempDay4").text("Temp: " + response.list[28].main.temp + " °F");
    $("#forecastTempDay5").text("Temp: " + response.list[37].main.temp + " °F");

    $("#forecastHumidityDay1").text(
      "Humidity: " + response.list[0].main.humidity + "%"
    );
    $("#forecastHumidityDay2").text(
      "Humidity: " + response.list[10].main.humidity + "%"
    );
    $("#forecastHumidityDay3").text(
      "Humidity: " + response.list[19].main.humidity + "%"
    );
    $("#forecastHumidityDay4").text(
      "Humidity: " + response.list[28].main.humidity + "%"
    );
    $("#forecastHumidityDay5").text(
      "Humidity: " + response.list[37].main.humidity + "%"
    );
  });
});
