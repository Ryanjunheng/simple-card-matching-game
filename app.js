$(document).ready(function() {
    let game = {
        cards: [1, 2, 3, 4, 1, 2, 3, 4], // hardcode 4 pairs of cards, same numbers/pair
        score: 0, //score to record every correct match
        start: function() {
        	//starting stage of the game
            game.shuffle(); 
        },
        shuffle: function() {
        	//shuffle function, to shuffle the number places in the array.
            let random = 0;
            let temporary = 0;
            $.each(game.cards, function(i) {
                random = Math.round(Math.random() * i); //this generates a random number between 0 up to number of cards(8)
                temporary = game.cards[i]; 
                game.cards[i] = game.cards[random];
                game.cards[random] = temporary; //swapping place between the 2 cards number selected.
            });
            // console.log(game.cards);
            game.assignNumberToCards();
        },
        assignNumberToCards: function() {
        	// assign the each value in the shuffled cards array to the div with class of "card"
        	$(".card").each(function(index){
        		$(this).attr("data-number", game.cards[index]);
        	});
        	game.actionOnClick();
        },
        actionOnClick: function() {
        	//function to display the cards value attribute assigned above 
        	$(".card").on("click", function() {
        		$(this).html("<p>" + $(this).attr("data-number") + "</p>").addClass("selected");
        		game.checkSelectedCardsValue();
        	});
        },
        checkSelectedCardsValue: function() {
        	//function to check and compare selected cards value and perform further action based on the value selected
        	if ($(".selected").length === 2) {
        		//if 2 cards only flipped/selected
        		let firstCard = $(".selected").first().attr("data-number"); //store the first card value to variable
        		let lastCard = $(".selected").last().attr("data-number"); //store the last card value to variable
        		if (firstCard == lastCard) {
        			// if the selected pair are of the same number, make the cards disappear
        			$(".selected").each(function(){
        				$(this).animate({
        					opacity: 0
        				}).removeClass("nomatch selected"); //remove the class because they are no longer selected nor unmatched
        			});	
        			game.score += 1; //increment score by 1 for each successful match
        			$(".score").text("Score: " + game.score); //write out the score
        			game.checkState(); //after every match, check the state of the game
        		} else {
        			// else flip the cards back over
        			setTimeout(function() {
        				//the wrong-matching cards will flipped after 0.5s delay
        				$(".selected").each(function(){
        					$(this).html("").removeClass("selected"); //remove the html content(number) of the cards as well as the class 'selected'
        				});
        			}, 500);
        		}
        	}
        },
        checkState: function() {
        	//function to display the endgame sentence if there are no more cards which haven't been selected.
        	if ($(".nomatch").length === 0) {
        		$(".container").html("<h2>You have won! Game Over!</h2><br><p class=\"score\">Score: " + game.score + "</p>");
        	}
        },
    };
    game.start(); //start the game
});