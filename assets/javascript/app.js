var apiKey = "3bRtndO5pZ4dHN8o2dXsN7i0BF3s92oN";
var topics = [
  "The Simpsons",
  "SpongeBob SquarePants",
  "The Fresh Prince of Bel-Air",
  "The Goldbergs",
  "Looney Tunes",
  "Doctor Who",
  "Monty Python's Flying Circus",
  "RuPaul's Drag Race",
  "American Dad",
  "Family Guy"
];

$(document).ready(function() {
  topics.forEach(addTopicButton);

  $("#add").submit(function(event) {
    var newTopic = $("#newTopic").val();
    var foundTopic = -1;
    $(".topicButton").each(function(index) {
      if ($(this).attr("data-topic") === newTopic) {
        foundTopic = index;
        $(this).click();
      }
    });
    if (foundTopic === -1) {
      topics.push(newTopic);
      addTopicButton(newTopic);
      $(".topicButton").each(function(index) {
        if ($(this).attr("data-topic") === newTopic) {
          $(this).click();
        }
      });
    }
    event.preventDefault();
  });
});

function addTopicButton(topic) {
  var topicButton = $("<button>")
    .text(topic)
    .attr("data-topic", topic)
    .addClass("topicButton btn btn-outline-primary")
    .click(function() {
      $(".topicButton")
        .removeClass("btn-primary")
        .addClass("btn-outline-primary");
      $(this)
        .removeClass("btn-outline-primary")
        .addClass("btn-primary");
      $("#results").empty();
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?api_key=" +
        encodeURI(apiKey) +
        "&limit=10&q=" +
        encodeURI($(this).attr("data-topic"));
      $.ajax({ url: queryURL, method: "GET" }).then(buildCards);
    });
  $("#topics").append(topicButton);
}

function buildCards(response) {
  var cardColumns = $("<div>").attr("class", "card-columns");
  response.data.forEach(function(giphyData) {
    console.log(giphyData);
    var gifImages = giphyData.images;
    var card = $("<div>")
      .addClass("card")
      .css("width", gifImages.fixed_width_still.width + "px");
    var image = $("<img>")
      .attr("src", gifImages.fixed_width_still.url)
      .addClass("card-img-top")
      .css(
        "width",
        gifImages.fixed_width_still.width + "px",
        "height",
        gifImages.fixed_width_still.height + "px"
      )
      .click(function() {
        if ($(this).attr("src") === gifImages.fixed_width.url) {
          $(this).attr("src", gifImages.fixed_width_still.url);
        } else if ($(this).attr("src") === gifImages.fixed_width_still.url) {
          $(this).attr("src", gifImages.fixed_width.url);
        }
      });
    card.append(image);
    var cardBody = $("<div>").addClass("card-body");
    var cardText = $("<div>")
      .addClass("card-text")
      .html(
        "<p>rating: " +
          giphyData.rating +
          "</p>" +
          (giphyData.source
            ? '<p><a href="' + giphyData.source + '">source</a></p>'
            : "")
      );
    cardBody.append(cardText);
    card.append(cardBody);
    cardColumns.append(card);
  });
  $("#results").append(cardColumns);
}
