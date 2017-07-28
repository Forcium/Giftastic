$(document).ready(function() {
  renderButtons();
});

// Array of initial animals
var topic = ["dog", "cat", "bird", "fish", "sugar glider", "horse", "donkey", "panda"];


function renderButtons() {                      //renderButton will display buttons for intial array set
  $("#buttonsA").empty();                       //empty out button div

  for (var i=0; i<topic.length; i++) {
    var button = $("<button>");                 //creating buttons via JS
    button.addClass("animalButton");
    button.attr("animalData", topic[i]);
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
})
