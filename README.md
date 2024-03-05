# Pixel Running Jumping Cramming Simulator
Pixel Running Jumping Cramming Simulator is a platformer that uses a jump mechanic in order to navigate through obstacles that are procedurally generated. The game gets progressively difficult the longer you survive! The speed of the obstacles increases over time. Once you have collided with one of the obstacles the game will end and the top scores that are located locally on your machine will be displayed.

We made use of JavaScript, HTML, CSS, and a shell script. JavaScript was used in the level.js file which includes functions that spawn the character and the obstacles, detect collisions, implement sound effects, and reset the gameloop. HTML and CSS was used to structure the game.

# How To Play
You can play the game here: https://cs.csub.edu/~pzavala/3350/lab05/game.html

The only control is jumping, which is executed by the spacebar!

![Running Game](https://github.com/PriscillaZvl/CMPS-3350-lab05/assets/115668530/90a985b0-3cb1-4bda-82a5-709a0bd10ff0)

# Local Build

If you want to run the game locally follow these steps:

First clone the repository
```
git clone https://github.com/PriscillaZvl/CMPS-3350-lab05
```
Next go to the project directory
```
cd CMPS-3350-lab05
```
Next invoke the deploy.sh script by executing the following command. Note that the script will deploy the source files into ~/public_html/3350/lab05, from wherever your source files are placed. You only need to deploy the scripts if your source files and public_html directories are different.
```
./deploy.sh
```
Lastly open your browser and enter the following URL
```
https://cs.csub.edu/~yourusername/3350/lab05/game.html
```
If you have a different web server environment or wish to use localhost, you can open game.html directly or access your web server through something like http://localhost:port/game.html.

Contributors: Nicholas Marolla and Priscilla Zavala
