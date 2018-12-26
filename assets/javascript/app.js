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

var searchParams = new URLSearchParams(window.location.search);
var newTopic = searchParams.get("newTopic");
if (newTopic && topics.indexOf(newTopic) === -1) {
  topics.push(newTopic);
}

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
              .css("width", giphyData.images.fixed_width_still.width + "px");
            var image = $("<img>")
              .attr("src", giphyData.images.fixed_width_still.url)
              .addClass("card-img-top")
              .css("width", giphyData.images.fixed_width_still.width + "px", "height", giphyData.images.fixed_width_still.height + "px")
              .click(function(){
                if ($(this).attr("src") === giphyData.images.fixed_width.url) {
                  $(this).attr("src", giphyData.images.fixed_width_still.url);
                }
                else if ($(this).attr("src") === giphyData.images.fixed_width_still.url) {
                  $(this).attr("src", giphyData.images.fixed_width.url);
                }
              });
            card.append(image);
            var cardBody = $("<div>")
              .addClass("card-body");
            var cardText = $("<div>")
              .addClass("card-text")
              .text("rating: " + giphyData.rating);
            cardBody.append(cardText);
            card.append(cardBody);
            cardColumns.append(card);
          });
          $("#results").append(cardColumns);
        });
      });
    $("#topics").append(topicButton);
  });

  if (newTopic) {
    $(".topicButton").each(function(){
      if ($(this).attr("data-topic") === newTopic) {
        $(this).click();
      }
    });
  }
});
