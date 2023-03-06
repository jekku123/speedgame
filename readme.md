# Speedgame

## **startgame()**

- starts the game by changing start button value to "end" and adds event
- listeners for buttons. then calls activateButton

## **endGame()**

- reset stuff etc listeners, checks if score is top 5 and gets the judgements for the score
- and opens the modal

## **activateButton()**

- activates buttons for set interval and pushes the id of the
- activated button to an array to keep track in which order the
- buttons were activated, function keeps calling itself recursively untill
- the condition for start button text to not be "start" is false

## **handleClick**

- check if the clicked buttons matches the one pushed into the array before with same index

## **getJudgement()**

- sets the judgement message

## **submitScore()**

- pushses the score to an array of objs with {name, score} then sorts the array by scores and loops the values into hs board
