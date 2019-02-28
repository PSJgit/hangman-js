
/* WordNik API
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// !!!!!!! Add a key for the api below, replacing hangmanConfig.KEY
// !!!!!!! When there's no key the game will have access to less words
// !!!!!!! But it will still work

let key

try {
	key = hangmanConfig.KEY
} catch(err) {
	console.warn('No Api Key provided - game will still run but with less words to choose from', err )
}

const min = 5
const max = 10

// excluded some types of speech and set word commonality to make the game more fun
const randomWord = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb%2C%20adverb&minCorpusCount=100000&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=${min}&maxLength=${max}&api_key=${key}`

const getRandomWord = async () => {
	
	try {
		const response = await fetch(randomWord)
			if (response.status === 200) {
			const data = await response.json()
			return data.word
		} 
	} catch (err) {
		//console.warn(err)
	}
}

export default getRandomWord


