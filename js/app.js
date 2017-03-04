/*javascript..................*/
/*Use the supplied mockup files and HTML snippets to guide you in building a Tic Tac Toe game. 
You can use jQuery or plain JavaScript to complete this project. 
Don't use an already programmed Tic Tac Toe plugin or library.*/
(function(){
var $startpage=$('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>');
var $drawpage=$('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>').hide();
var $winpage=$('<div class="screen screen-win" id="finish"> <header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>').hide();
 var player1 = $("#player1");
 var player2 = $("#player2");
  var box = $(".box");
  var boxcheck = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/*When the page loads, the startup screen should appear. Use the tictactoe-01-start.png mockup, and the start.txt HTML snippet to guide you.
Add programming, so that when the player clicks the start button the start screen disappears, the board appears, and the game begins.
 Use the tictactoe-02-inprogress.png mockup, and the board.txt HTML snippet to guide you.*/
 
// When page loads, show up start up screen
    $(document).ready(function() {
      $("body").append($startpage);
      $(".board").hide();
      $("body").append($drawpage); // Append the win information and display when game over
      $("body").append($winpage); // Append the draw information and display when game over
    });
	
//when button is clicked ,move to the board page
$(document).on("click", "#start .button", function(e) {
      e.preventDefault();
      $startpage.hide();
      $(".board").show();
    });

	 //This is the function to check current player
    var currentplayer1 = function() {
      if($(player1).hasClass("active")) {
        return true;
      } else {
        return false;
      }
    };
    var currentplayer2 = function() {
      if($(player2).hasClass("active")) {
        return true;
      } else {
        return false;
      }
    };
	// This is the function to check if current box is available
    var availablebox = function(e) {
      if(e.hasClass("box-filled-1") || e.hasClass("box-filled-2")) {
        return false;
      } else {
        return true;
      }
    };
	
	// This is the function to activate current box
    var activebox = function(e) {
      if(currentplayer1()) {
        e.addClass("box-filled-1");
      } else if(currentplayer2() && availablebox(e)) {
        e.addClass("box-filled-2");
      }
    };
	// This is th function to provide the turn to  player1 and player2
    var turnplayer = function($this) {
      if(currentplayer1()) {
        player2.addClass("active");
        player1.removeClass("active");
      } else {
        player1.addClass("active");
        player2.removeClass("active");
      }
    };
	// This is the function to mark up the box when player click on that box
    var markbox = function() {
      for(var i = 0; i < box.length; i++) {
        if(box.eq(i).hasClass("box-filled-1")) {
          boxcheck[i] = "o";
        }
        if(box.eq(i).hasClass("box-filled-2")) {
          boxcheck[i] = "x";
        }
      }
    };
	 // This is the function to consruct show win screen
    var winshow = function() {
      $(".board").hide();
      $winpage.show();
      $winpage.removeClass("screen-win-one screen-win-two");
      if(currentplayer1()) {
        $winpage.addClass("screen-win-one");
		$(".message").text(" winner");
      } else if(currentplayer2()) {
        $winpage.addClass("screen-win-two");
        $(".message").text("Winner");
      }
    };
	// This is the function to check win condition
    var wincondition = function() {
      // roow check condition...........
      if(boxcheck[0] + boxcheck[1] + boxcheck[2] == "ooo" || boxcheck[3] + boxcheck[4] + boxcheck[5] == "ooo" || boxcheck[6] + boxcheck[7] + boxcheck[8] === "ooo") {
        winshow();
      } else if(boxcheck[0] + boxcheck[1] + boxcheck[2] == "xxx" || boxcheck[3] + boxcheck[4] + boxcheck[5] == "xxx" || boxcheck[6] + boxcheck[7] + boxcheck[8] === "xxx") {
        winshow();
        // column check condition.........
      } else if(boxcheck[0] + boxcheck[3] + boxcheck[6] == "ooo" || boxcheck[1] + boxcheck[4] + boxcheck[7] == "ooo" || boxcheck[2] + boxcheck[5] + boxcheck[8] === "ooo") {
        winshow();
      } else if(boxcheck[0] + boxcheck[3] + boxcheck[6] == "xxx" || boxcheck[1] + boxcheck[4] + boxcheck[7] == "xxx" || boxcheck[2] + boxcheck[5] + boxcheck[8] === "xxx") {
        winshow();
        // diagonal check condition..........
      } else if(boxcheck[0] + boxcheck[4] + boxcheck[8] == "ooo" || boxcheck[2] + boxcheck[4] + boxcheck[6] == "ooo") {
        winshow();
      } else if(boxcheck[0] + boxcheck[4] + boxcheck[8] == "xxx" || boxcheck[2] + boxcheck[4] + boxcheck[6] == "xxx") {
        winshow();
      } else if($(".box-filled-1").length + $(".box-filled-2").length === 9){
        $drawpage.show();
        $drawpage.addClass("screen-win-tie");
        $(".message").text("It's a draw");
        $(".board").hide();
      }
    };
	
	//changing the background color according to player and their boxes,image
    box.hover(
      function() {
        if(currentplayer1() && availablebox($(this))) {
          $(this).css("background-image", "url(img/o.svg)");
        } else if(currentplayer2() && availablebox($(this))) {
          $(this).css("background-image", "url(img/x.svg)");
        }
      },
      //reset background
      function() {
        $(this).css("background", "");
      }
    );
	// When click the box, active current box on basis of current player, check win condition and turn player
    box.click(
      function() {
        if( availablebox($(this))) {
          activebox($(this));
          markbox();
          wincondition();
          turnplayer();
        }

      } );
  // Reset the data again when player play again
  $(document).on("click", "#finish .button", function(e) {
    e.preventDefault();
    $winpage.hide(); 
    $drawpage.hide(); 
    $(".board").show();
    box.removeClass("box-filled-1"); 
    box.removeClass("box-filled-2");
    player1.addClass("active"); 
    player2.removeClass("active"); 
    boxcheck = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  });

	})(jQuery);











 
 
 
