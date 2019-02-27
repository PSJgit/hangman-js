
/* Imports
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import Hangman from './hangman.js'

/* Page views data and templates
–––––––––––––––––––––––––––––––––––––––––––––––––– */

const pageRoot = document.getElementById('root')

// first render state, called on page load
const init = [
	{
		id: 'init',
		mainTxt: 'Hangman',
		subTxt: 'A simple game of Hangman. Try to guess the word within a certain number of guesses. If you want less guesses and harder words, update the difficulty!',
		score: '0',
		buttons: [
			{	
				'id': 'New Game'
			},
			{
				'id': 'Difficulty',
				'txt': 'Difficulty: Normal'
			}
		]
	}
]

// on new game: letters and stateMsg come from the render params (word and ...args)
const newGame = [
	{
		id: 'newGame',
		letters: null
	}, {
		id: 'state',
		stateMsg: null
	}
]

const render = (renderType, word, ...args) => {
	//console.warn('additional args:', args)

	let renderArrObj
	if (renderType === 'init') {
		// assign the obj to feed the data to the create html func
		renderArrObj = init
	}

	if (renderType === 'newGame') {
		// assign the obj to feed the data to the create html func 
		// params come from render func inside hangman class, assigined below
		renderArrObj = newGame
		for (var i = 0; i < renderArrObj.length; i++) {
			if (i === 0) {
				renderArrObj[i].letters = word.toString().split('')
			}
			if (i === 1) {
				renderArrObj[i].stateMsg = args.toString()
			}
		}
		//console.log('Updating renderArrObj with params from class render', renderArrObj)
	}

	// loop and call createHTML for all of the data obj or objs
	renderArrObj.forEach( (data, i) => {

		// gets the item to render from the objects in the array
		let renderItem = createHTML(data, i)
		//console.warn(renderItem)
		// if there is a return, render it to the dom
		if (renderItem !== undefined) {		
			if (data.id === 'init') {
				pageRoot.insertAdjacentHTML('beforeend', renderItem)
			} 
			if (data.id === 'newGame') {
				document.getElementById('words').insertAdjacentHTML('beforeend', renderItem)
			} 
			if (data.id === 'state') {
				document.getElementById('attempts').insertAdjacentHTML('beforeend', renderItem)
			} 
		}
	})
	//console.warn('page view rendered');
}

const createHTML = (data, i) => {
	//console.log('createHTML data', data)
	// temp html to return
	let html;

	// init page structure
	if (data.id === 'init') {
		html = `
			
			<div id='loading-bar' class='hide'>
				<div class='loading-bar-color-repeater'></div>
			</div>
			<div id='title-container'>
			<h1 class='title'>${data.mainTxt}</h1>

			</div>
			<div id='grid'>
				<div id='hangman-container'> 

					<div id='words'>
						<p class='sub-title'>${data.subTxt}</p>
					</div>
					<div id='attempts'></div>
					<div id='key-pressed'></div>
				</div>


				<div id='hangman-btns'>
					${data.buttons.map(button =>
						`<button id='${button.id.toLowerCase().split(' ').join('-')}' class='hvr-bob'><p>${button.txt !== undefined ? button.txt : button.id}</p></button>`
					).join('')}	
				</div>

				<div id='score' class='hide'>
					<p>Games: <span id='games'>0</span></p> 
					<p>Wins: <span id='wins'>0</span></p>
				</div>
			</div>
		`
	}
	// on new game click, replace contents of '#words' with new letters
	if (data.id === 'newGame') {
		html = `
			
			${data.letters.map(letter =>
				`<div class='letter fadeInDown' data-keyC='${letter.charCodeAt()}'><p class='letter-placeholder'>__</p></div>`
			).join('')}	
		`
	}
	// render inital state msg
		if (data.id === 'state') {
		html = `
			<p>${data.stateMsg}</p>
		`
	}

	return html;
}

export const clearRoot = () => {
	pageRoot.innerHTML = ''
}

export const clearGameContainer = () => {
	document.querySelectorAll('#words, #attempts').forEach( (el, index) => {
		el.innerHTML = ''
	})
}

export default render