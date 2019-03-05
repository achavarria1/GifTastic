var API_KEY = "bNO1MXrOy52NRwJE5u90Q5ObUMoh4GIl";
var topics = ["mr robot", "suits", "game of thrones", "narcos", "silicon valley", "the sopranos", "stranger things", "bojack horseman"];

function makeButtons() {

  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");

    button.text(topics[i])
      .attr("class", "btn-small");

    $("#buttonSection").append(button);
  }
}

function createUserButtons() {

  $("#newShow").on("click", function() {
    event.preventDefault();
    if ($("#show").val() == "") {
      return null;
    } else {
      var newButton = $("<button>");
      var newButtonText = $("#show").val();
      newButton.text(newButtonText)
               .attr("class", "btn-small");
      if (topics.includes(newButtonText)) {
        return null;
      } else {
        topics.push(newButtonText);
        $("#buttonSection").append(newButton);
      }

    }
  });

}

function addButtonEventListener() {

  $(document).on("click", "#buttonSection button", function() {

    $("#gifSection").empty();
    var buttonText = $(this).text();
    var qurl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + buttonText + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
      url: qurl,
      method: 'GET'
    }).then(function(response) {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {

        var card = $("<card>");
        card.attr("class", "card-panel hoverable");

        var figcaption1 = $("<figcaption>");

        var figRating = response.data[i].rating;
        

        
        figcaption1.html("RATING : " + figRating);

        var stillImageSrc = response.data[i].images.original_still.url;
        var animateImageSrc = response.data[i].images.original.url;

        var image = $("<img>").attr("src", stillImageSrc)
                              .attr("data-state", "still")
                              .attr("data-still", stillImageSrc)
                              .attr("data-animate", animateImageSrc)
                              .attr("class", "responsive-img");

        
        
        card.append(image);
        card.append(figcaption1);

        $("#gifSection").append(card);
      }

      gifAnimation();

      createFavGif();

    });
  });
}

function gifAnimation() {
  $("img").on("click", function() {
    var state = $(this).attr("data-state");
    if (state == "still") {

      var anim = $(this).attr("data-animate");
      $(this).attr("src", anim)
             .attr('data-state', 'animate');

    } else {

      var still = $(this).attr('data-still');
      $(this).attr('src', still)
             .attr('data-state', 'still');

    }
  });
}



function init() {
  makeButtons();
  addButtonEventListener();
  createUserButtons();
}
init();