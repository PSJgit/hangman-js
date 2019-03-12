
/* Imports
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import "@babel/polyfill"
import render, {clearGameContainer} from './js/render.js'
import Hangman from './js/hangman.js'
import getRandomWord from './js/apiRequests.js'
import wordlist from './js/wordSets.js'
import {animateHelper, shuffle, isMobileDevice} from './js/utils.js'

// style
import "./scss/index.scss"

/* Vars
–––––––––––––––––––––––––––––––––––––––––––––––––– */

let activeGame
let difficulty = 1
const difficultyArr = ['Easy', 'Normal', 'Hard', 'Insane']
let input
let inputLoaded = false


/* ON READY 
–––––––––––––––––––––––––––––––––––––––––––––––––– */

document.addEventListener("DOMContentLoaded", (e) => {
	
	// pass init keyword to render func to show the basic page
	render('init')
	const loadingBar = document.getElementById('loading-bar')

	
	/* Game start up sequence
	–––––––––––––––––––––––––––––––––––––––––––––––––– */

	const loadGame = async () => {

		// show the loadingBar, css keyframe runs
		animateHelper(loadingBar, 'loading-bar-start', false)
		clearGameContainer()

		// fetch the word from the api
		let word = await getRandomWord()

		if (word === undefined) {
			// get a word from the back up word lists
			word = shuffle(wordlist[difficulty])
		}
		// start the game
		activeGame = new Hangman(word, difficulty)
		// finish loadingBar animation
		animateHelper(loadingBar, 'loading-bar-finish', true)

		if (isMobileDevice() ) {
			document.querySelector('.mobile-input').classList.remove('hide')
			document.querySelector('.mobile-input').focus()
		}
	}


	/* Events
	–––––––––––––––––––––––––––––––––––––––––––––––––– */

	if (isMobileDevice() && inputLoaded === false) {
		inputLoaded = true
		input = document.createElement('input')
		input.setAttribute('type', 'text')
		input.setAttribute('placeholder', 'Add your guess here')
		input.setAttribute('maxlength', '1')
		input.setAttribute('class', 'mobile-input hide')
		document.getElementById('hangman-container').appendChild(input)
		
		document.querySelector('.mobile-input').addEventListener('input', (e) => {
			if (activeGame !== undefined ) {
				if (activeGame.state === 'playing') {
					activeGame.checkValidKey(e.target.value)
					setTimeout(function() {
						e.target.value = ''
					}, 300)
				}
			}
		})
	} else {
		document.addEventListener('keyup', (e) => {
			if (activeGame !== undefined ) {
				if (activeGame.state === 'playing') {
					activeGame.checkValidKey(e.key)
				}
			}
		})
	}

	// On new game
	document.querySelector('#new-game').addEventListener('click', (e) => {
		e.target.classList.add('hide')
		document.getElementById('difficulty').classList.add('hide')
		loadGame()	

	})

	// Update difficulty
	document.querySelector('#difficulty').addEventListener('click', (e) => {
		difficulty >= difficultyArr.length-1 ? difficulty = 0 : difficulty++
		e.target.innerHTML = `<p>Difficulty: ${difficultyArr[difficulty]}</p>`
	})

});