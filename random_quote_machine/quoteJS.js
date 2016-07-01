$(document).ready(function() {

  $("#getMessage").on("click", function() {
    $.getJSON("http://api.icndb.com/jokes/random", function(a) {
      var html = "<div class = 'joke'>";
      var keys = Object.keys(a);
      if (a["type"] === "success") {
        var quoteObject = a["value"];
        if (quoteObject.hasOwnProperty("joke")) {
          html += quoteObject["joke"] + "<br>";
        }
      }

      html += "</div>";
      $(".joke").remove();
      $(".jokeMessage").append(html);

    });
  });

  $("#tweet-button").on("click", function() {
    window.open('https://twitter.com/intent/tweet?hashtags=ChuckNorrisQuotes&text=' + $(".joke").text());
  });

  $("#fb-button").on("click", function() {

  });
});