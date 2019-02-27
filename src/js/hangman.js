
/* Imports
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import render from './render.js'
import {animateHelper} from './utils.js'

/* Hangman game class
–––––––––––––––––––––––––––––––––––––––––––––––––– */

class Hangman {
	constructor(word, difficulty) {
		this.word = word.toLowerCase()
		this.userInput = []
		this.instance = Hangman.instance()
		this.state = 'playing'
		this.score = 0
		this.difficulty = difficulty
		this.attempts = this.calcAttempts()
		this.maxAttempts = this.attempts
		this.stateMsg = `You have <span class='bw-color-repeater'>${this.attempts}</span> attempts left. Press any letter key on your keyboard to get started`

		// calls to render functions to init the game
		render('newGame', this.word, this.stateMsg)

		// ref to dom 
		this.titleHangman = document.querySelector('.title')
		// reset title text bg color
		this.titleHangman.style.backgroundImage = `linear-gradient(to top, #000000 0%, #FFFFFF 0%, #FFFFFF 100%)`
		this.letters = document.querySelectorAll('.letter')
		this.playerLetter = document.querySelector('#key-pressed')
		this.gameCountRef = document.getElementById('games')
		this.winCountRef = document.getElementById('wins')
		this.playerLetter.innerHTML = ''
		this.btns = document.querySelectorAll('#start-game, #difficulty')

		// show the score/game count
		if (this.instance === 1) {
			this.gameCountRef.closest('.hide').classList.remove('hide')			
		}
	}

	animateTitle(maxAttempts) {
		// calc css :before element width on the title
		const decimal = this.attempts / (this.maxAttempts+1) 
		const percent = 100 - (decimal * 100) 

		this.titleHangman.style.backgroundImage = `linear-gradient(to top, #000000 ${percent}%, #FFFFFF 0%, #FFFFFF 100%)`
		//console.log('animate title func = ', this.maxAttempts, this.attempts, decimal, percent)
	}

	gameState() {
		//console.warn(this.state, 'and attempts left',this.attempts, '')

		// set states and display state msg
		if (this.score === this.letters.length) {
			this.state = 'win'
			this.stateMsg = 'You have won!'
			// use static score to count and display the games won
			this.winCountRef.innerHTML = Hangman.score()

		} else if (this.attempts === 0) {
			this.state = 'lose'
			this.stateMsg = `Game over! The word was ${this.word.toUpperCase()}`
		} else {
			this.stateMsg = `You have <span class='bw-color-repeater'>${this.attempts}</span> attempts left.`
		}

		// act on states
		if (this.state === 'lose' || this.state === 'win') {

			// animate the title (non cached look up for .title)
			animateHelper(document.querySelector('.title'), 'tada-end', false)
			// bring back the game btns
			this.btns.forEach( (el, index) => {
				el.classList.remove('hide')
			})
			// clear out the user keypress dom indicator
			this.playerLetter.innerHTML = ''
			// use static instance to count and display the games
			this.gameCountRef.innerHTML = this.instance
		}
	}

	// change attempts/guesses for the user via the difficulty
	calcAttempts() {
		let baseAttempts = 5
		let diffCalc = baseAttempts / this.difficulty

		if (diffCalc === Infinity) {
			diffCalc = 10
		} else {
			diffCalc = Math.ceil(diffCalc)
		}

		return diffCalc
	}

	// checks if the keypress can go into the array
	checkValidKey(keypress) {
		// only single/new letters go into ar, nothing else
		if (!this.userInput.includes(keypress) && keypress.match(/[a-zA-Z]+/g) && keypress.length === 1 && this.state === 'playing') {
			this.userInput.push(keypress.toLowerCase())
			
			// show to the player
			this.playerLetter.innerHTML = `<p>Your guesses: ${this.userInput.join(', ').toUpperCase()}</p>`

			// check if the player is correct
			let validKeyArr = this.isCorrectKey(keypress)

			if (validKeyArr.length > 0) {
				// correct, reveal letter
				validKeyArr.forEach( (el, index) => {
					el.html.insertAdjacentHTML('beforeend', `<p class='zoom-in-bounce'>${el.key}</p>`)
					el.html.querySelector('.letter-placeholder').remove()
					this.score++
				})
			} else {
				// incorrect, decrease count
				this.attempts--
				this.animateTitle()
			}
			// check state after keypress
		}

		this.gameState()
		// update the attemps message
		document.querySelector('#attempts > p').innerHTML = this.stateMsg
		//console.log(this.userInput)
	}

	// checks if the keypress is a correct guess, returns obj with the html, keyCode and key
	isCorrectKey(keypress) {
		
		let matches = []

		for (var i = 0; i < this.letters.length; i++) {
			// get the keycode stored in the data attr
			let keyCode = this.letters[i].dataset.keyc
			// convert to a letter
			let key = this.convertChar(keyCode)
			if (key === keypress) {
				matches.push({
					html: this.letters[i],
					keyCode: keyCode,
					key: key
				})
			}
		}
		return matches
	}

	// converts numbers to keys and keys to numbers
	convertChar(input) {
		if (isNaN(input)) {
			return input.charCodeAt()
		} else {
			return String.fromCharCode(input)
		}
	}

	// logs out a number to each game for total session playcount
	static instance() {
		Hangman.instances = (Hangman.instances || 0) + 1
		return Hangman.instances
  }

  	// same as above but for score
	static score() {
		Hangman.finalScore = (Hangman.finalScore || 0) + 1
		return Hangman.finalScore
  }

}

export default Hangman
