var apiKey = "3bRtndO5pZ4dHN8o2dXsN7i0BF3s92oN";
var topics = [
  "The Simpsons",
  "SpongeBob SquarePants",
  "The Fresh Prince of Bel-Air",
  "Cheers",
  "Law & Order",
  "The Goldbergs",
  "Looney Tunes",
  "Doctor Who",
  "Monty Python's Flying Circus",
  "RuPaul's Drag Race",
  "American Dad",
  "Family Guy"
];

$(document).ready(function(){
  topics.forEach(function(topic) {
    var topicButton = $("<button>")
      .text(topic)
      .attr("data-topic", topic)
      .addClass("topicButton btn btn-outline-primary")
      .click(function(){
        $(".topicButton")
          .removeClass("btn-primary")
          .addClass("btn-outline-primary");
        $(this)
          .removeClass("btn-outline-primary")
          .addClass("btn-primary");
        $("#results").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + encodeURI(apiKey) + "&limit=10&q=" + encodeURI($(this).attr("data-topic"));
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          console.log(response);
          var cardColumns = $("<div>")
            .attr("class", "card-columns");
          response.data.forEach(function(giphyData){
            var card = $("<div>")
              .addClass("card")
              .css("width", giphyData.images.fixed_width.width + "px");
            var image = $("<img>")
              .attr("src", giphyData.images.fixed_width.url)
              .addClass("card-img-top")
              .css("width", giphyData.images.fixed_width.width + "px", "height", giphyData.images.fixed_width.height + "px");
            card.append(image);
            cardColumns.append(card);
          });
          $("#results").append(cardColumns);
        });
      });
    $("#topics").append(topicButton);
  });
});
