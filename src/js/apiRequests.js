
/* WordNik API
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// !!!!!!! Add a key for the api below, replacing hangmanConfig.KEY
// !!!!!!! When there's no key the game will have access to less words
// !!!!!!! But it will still work

let key
let api

const min = 5
const max = 10

try {
	key = hangmanConfig.KEY
	// excluded some types of speech and set word commonality to make the game more fun
	api = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb%2C%20adverb&minCorpusCount=100000&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=${min}&maxLength=${max}&api_key=${key}`
} catch(err) {
	console.warn('No Api Key provided - the game will still run, but with less words to choose from', err )
}

const getRandomWord = async () => {
	
	if (api) {
		try {
			const response = await fetch(api)
			if (response.status === 200) {
				const data = await response.json()
				return data.word
			} 
		} catch (err) {
			//console.warn(err)
		}
	} else {
		return undefined
	}
	
}

export default getRandomWord


