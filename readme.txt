Name: Kyle Gaudet
Email: kylegaudet@student.uml.edu
Date: 12/18/2022


Github Repository URL:

https://github.com/KyleGaudet/COMP-4610-HW5

Github Pages URL:

https://kylegaudet.github.io/COMP-4610-HW5/

Write-Up:

I was able to (as far as I am aware) implement all of the required features of
the assignment that were described in the rubric/assignment pdf. However I did not implement either of the extra
credit features.
I used an associative array to store the information about various tiles, as well as two string index arrays
to represent the board and tile rack. These two arrays were used to determine what spots had tiles on them at 
any given time or not. Most of the features were fairly straightforward to implement, other than setting some of
the properties of the draggables and droppables due to the jQuery UI documentation not being very descriptive. 
Below is the full list of included features.

Included Features:

	- Tiles are randomly generated according to the official tile distributions, and the current distribution
	  is updated as they are generated throughout a game.
	
	- Tiles are only able to be placed on the board or rack, if they are placed anywhere else on the webpage they
	  will revert back to their previous position.

	- The game can be restarted at any time by hitting the restart button. Doing so will regenerate the tiles on the 
	  tile rack, empty the board, and reset the score and remaining tiles.

	- Users can drag tiles onto the board to create words (any combo of letters is fine since I didnt validate the words)

	- The current word is displayed above the board, and is updated as players add/remove tiles

	- Once a tile is placed on the board tiles must be placed next to a tile on the board

	- Tiles on either side of a word on the board can be moved back to the rack

	- A tile removed from the middle of a word will revert to its position, in order to remove a letter from the middle of a word
	  the user must remove the tiles from one of the sides of it in order to put it back on the rack
	  (This is done since words with spaces are not allowed)

	- When letters are added to the board the score that would be gained by submitting the word appears next to their current score
	  in the (+ number ) area

	- When a word is submitted with the submit word button the score is updated, as well as the number of tiles remaining to be drawn

	- The score and tiles remaining updates until the game is restarted

	- The user can submit as many words as they want as long as they have enough tiles

	- When all 100 tiles are used up the user must restart if they wish to play again
