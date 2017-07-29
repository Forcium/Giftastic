
$(document).ready(function() {
  renderButtons();
});

// Array of initial animals
var topic = ["dog", "cat", "bird", "fish", "sugar glider", "horse", "donkey", "panda", "hedgehog", "skunk", "guinea pig", "lizard"];



function renderButtons() {                      //renderButton will display buttons for intial array set

  $("#buttonsA").empty();                       //empty out button div

  for (var i=0; i<topic.length; i++) {
    var button = $("<button>");                 //creating buttons via JS
    button.addClass("animalButton");
    button.attr("animal-data", topic[i]);
    button.text(topic[i]);

    $("#buttonsA").append(button);              //button is created and added to html
  }
}



$("#animalSubmit").on("click", function(event) {     //user inputs a NEW animal
    event.preventDefault();   //~~~~~~~~~~~~~~~~~~~~~~~Prevent a link from opening the URL
  var newAnimal = $("#put-animal").val().trim();

  topic.push(newAnimal);
  $("#put_animal").val("");

  renderButtons();
  $("#put-animal").val("")      //~~~~~~~~~~~~~~~~clear out the input field for adding a new animal
});


function getAnimalGifs() {
  var addAttribute = $(this).attr("animal-data");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + addAttribute + "&api_key=d5589f089013444f8a5f800650fbf5a9";

  $.ajax({          //~~~~~~~~~~~~~~~~~~~~~~~~~AJAX calling to Giphy API
      method: "GET",
      url: queryURL,
    })
    .done(function(response) {
      var results = response.data;

      $("#gifThumbs").empty();
      for (var i = 0; i < results.length; i++) {    //for looping through the results
        var newDiv = $("<div>");    //~~~~~~~~~~~~~~~~creating a new div for insertion
        newDiv.addClass("animalGif");

        var rating = $("<h2>").html("Rated: " + results[i].rating);   // created var for rating
        newDiv.append(rating);      //~~~~~~~~~~~~~~~~appended rating on JS but not yet into html

        var newImages = $("<img>");
        newImages.attr("src", results[i].images.fixed_height_still.url);
        newImages.attr("data-still", results[i].images.fixed_height_still.url);
        newImages.attr("data-animate", results[i].images.fixed_height.url);
        newImages.attr("data-state", "still");
        newDiv.append(newImages);        //~~~~~~~~~~~~~~~~~~append images to newDiv, still not html

        $("#gifThumbs").append(newDiv);   //~~~~~~~~~~~~~~NOW appending to html
      }
    });
}

function animateGif() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    console.log(state);
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    console.log(this);
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}


$(document).ready(function() {
  renderButtons();
});

$(document).on("click", ".animalButton", getAnimalGifs);
$(document).on("click", ".animalGif", animateGif);
