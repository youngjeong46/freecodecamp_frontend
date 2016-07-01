$(document).ready(function() {
  var city = "";
  var country = "";
  var lat = "";
  var long = "";
  var degreeUnit = "";

  function weatherPicture(icon) {
    var backgroundPicture='';
    switch (icon) {
      case "01d":
      case "01n": // match uses regular expression.
        backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/clear.jpg';
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/overcast.jpg';
        break;
      case "04d":
      case "04n":
        backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/mostly_cloudy.jpg';
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/rainy.jpg';
        break;
      case "11d":
      case "11n":
        backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/thunderstorm.jpg';
        break;
      case "13d":
      case "13n":
        backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/snow.jpg';
        break;
      case "50d":
      case "50n":
        backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/mist.jpg';
        break;
    }
    return backgroundPicture;
  }

  if ($("#unit-convert").text() === "Convert to C") {
    degreeUnit = "imperial";
  } else {
    degreeUnit = "metric";
  }

  var getWeatherData = function(unit) {
    var weatherAPIAddress = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + unit + "&APPID=364d39566447970d061d017d3f32509f";

    $.getJSON(weatherAPIAddress, function(weatherData) {
      var temp = weatherData.main.temp;
      var icon = weatherData.weather[0].icon;
      var iconAddress = "http://openweathermap.org/img/w/" + icon + ".png";
      var unitLabel = '';
      if (unit === "imperial") {
        unitLabel = "F";
      } else {
        unitLabel = "C";
      }

      $("#weather-icon-degrees").append("<p id='degree-label'><img src=" + iconAddress + "\>" + temp + " " + unitLabel + "</p>");
      $(".weather-container").css('background-image', 'url("' + weatherPicture(icon)+ '")');
    });

  };

  $.getJSON("http://ip-api.com/json", function(data) {
    if (data["status"] === "success") {
      lat = data.lat;
      long = data.lon;
      city = data.city;
      country = data.country;
      $(".location-description").html("<p>" + city + ", " + country + " (" + lat + "," + long + ")</p>");
      getWeatherData(degreeUnit);
    }
  });

  $("#unit-convert").on("click", function() {
    $("#degree-label").remove();
    var buttonText = $("#unit-convert");
    if (buttonText.text() === "Convert to C") {
      buttonText.text('Convert to F');
      getWeatherData("metric");
    } else {
      buttonText.text('Convert to C');
      getWeatherData("imperial");
    }
  });
});