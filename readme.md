# Speedgame

Game where buttons light up and turn off in random order, your task is to press them in the order they light up.
If you press the buttons in wrong order or press end button, the game will end and a modal will
show your score, judgement message and inform you if you made top 5. You get to insert your name and it will show up in the scoreboard if you made top 5.

## Technologies used

Built with:

- HTML
- CSS
- JavaScript

## **handleStartButton()**

- Checks if start buttons text is "start" if it is then calls startGame() else calls endGame()

## **startgame()**

- Function to start the game. Changes start buttons text to "end", add's click eventlisteners to game buttons and calls the activateButton() function

## **endGame()**

- Function to end the game. Plays the end game sound, gets judgement message and checks if score made top 5 by using getJudgement() and
  checkIfTopFive() functions, sets their returns and the score into the end game modal. Removes event listeners from game buttons and turns them all active.  
  Removes event listener from start button (so it cant be clicked while waiting for endgame modal to show) and changes it's text to "start"
  Clears the timeout set by activateButton() function and sets a timeout of 2,5 seconds which after the modal will show and the start button will get its event listener back

## **activateButton()**

- Checks start buttons text, if it had changed to "start" the game will end. If text is "end" then gets random number (0, 1, 2 or 3 and checks that its not the same as the last id pushed into buttonsOrderArray. If its not the same, the id gets pushed into the array (to keep track of the order the buttons lighted up) otherwise the function will call itself again. If it was the same then lights up the button with that same id. Sets time out for the button to turn off and decreases the timeout with 10ms.

## **handleClick**

- Checks if the id saved in buttonOrderArrays index that matches the current score does not match the id of the clicked button. If it does not then its not the next button to be pushed and endGame() function will be called. If they match then a pop sound is played and the button will turn off and 1 point will be awarded.

## **getJudgement()**

- Returns the judgement message based on score

## **checkIfTopFive**

- Checks if the score is top 5 score

## **submitScore()**

- Checks that name has been entered, pushes the name and the score as an object to an
  array and sorts it in descending order with price. Sets names and scores into score
  board and resets all values by calling resetValues()

## **resetValues()**

- Resets all values to their original state
