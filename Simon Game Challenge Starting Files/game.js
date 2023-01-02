let buttonColours = ["red", "blue", "green", "yellow"];
let randomNumber
let userClickedPattern = [];
let gamePattern = [];
let numeroVeces = 1;
let i = 0;
let n = 0;
let errorEncontrado = 0;
let timeout;

function newSecuence() {
  randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColours[randomNumber]);
};

//Llamar a las funciones al pulsar una tecla

$(document).keydown(function() {
  if (errorEncontrado === 1) {
    errorEncontrado--;
    reset2();
  } else {
    secuencia(numeroVeces);
  }

});



function secuencia(numeroveces) {
  while (i < numeroVeces) {
    newSecuence();
    setTimeout(animacion, 400);
    $("h1").text("Level " + numeroVeces);
    i++;
  }


}

// Animacion
function animacion() {

  for (let i = 0; i < gamePattern.length; i++) {
    task(i);
}
}

function task(i){
  setTimeout(function() {
    $('#' + gamePattern[i]).fadeOut(200).fadeIn(200);
    let audio = new Audio('sounds/' + gamePattern[i] + '.mp3');
    audio.play();
  }, 400*i);
}




// Llevar cuenta de lo que se ha clickado

$(".btn").click(function() {
  let userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
});

//Funcionamiento

$(".btn").click(function() {
  if (errorEncontrado === 0) {

    if (userClickedPattern[n] === gamePattern[n]) {
      console.log("bien");
      let removerPressed = $(this).attr('id');
      $('#' + removerPressed).addClass("pressed")


      timeout = setTimeout(function() {
        $('#' + removerPressed).removeClass("pressed")
      }, 100);

      let audio = new Audio('sounds/' + gamePattern[n] + '.mp3');
      audio.play();
    } else {
      fallo();

    }
    n++;

    if (n === gamePattern.length && errorEncontrado === 0) {
      reset();
    } else {

    }
  } else {
    console.log("mal");
  }

});

function reset() {
  userClickedPattern.length = 0;
  n = 0;
  numeroVeces++;
  secuencia(numeroVeces);
}

function reset2() {
  $("body").removeClass("game-over");
  userClickedPattern.length = 0;
  n = 0;
  gamePattern.length = 0
  numeroVeces = 1;
  i = 0;
  secuencia(numeroVeces);
}


function fallo() {
  let audio = new Audio('sounds/wrong.mp3');
  audio.play();
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  timeout = setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);
  errorEncontrado++;
}
