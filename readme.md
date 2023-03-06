# Speedgame

- Game where buttons light up and turn off in random order, your task is to press them in the order they light up.
  If if you press the buttons in wrong order or press end button, the game will end and modal will
  show score, message and tell if you made top 5. You get to insert your name and it will show up at the scoreboard if
  you made top 5.

## **startgame()**

- Starts the game by changing start button value to "end" and adds event
  listeners for buttons, then calls activateButton()

## **endGame()**

- Plays an endgame sound, checks if score is top 5 and gets the judgements for the score from checkIfTopFive() and getJudgement() functions. Sets the score to the modal and changes button text. Then removes event listeners, clears timeout and sets timeout for modal to open

## **randomIdx()**

- Returns a random number (0,1,2 or 3)

## **activateButton()**

- Checks start buttons text, if it had changed to "start" the game will end. It text is still "end" then gets random id from randomIdx() and checks that its not the same as the last id pushed into buttonsOrderArray. If its not the same, the id gets pushed into the array (to keep track of the order the buttons lighted up) otherwise the function will call itself again.
  If it was the same then lights up the button with that same id. Sets time out for the button to turn off and decreases the timeout with 10ms.

## **handleClick**

- Check if the clicked button matches the one pushed into the array before with same index

## **getJudgement()**

- Sets the judgement message

## **submitScore()**

- Checks that name has been entered, pushes the name and the score as an object to an array and sorts it in descending order with price. Sets names and scores into score board and all values by calling resetValues()

## **resetValues()**

- Resets all values
