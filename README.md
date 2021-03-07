# HANGMAN

## What is it?

A game of hangman, words are fetched from the wordnik api and set to high commonality to make it easier/more fun than a random dictionary word. Tracks basic score for session, has difficulty settings and offline mode if no api key is provided.

## Demo

Modern browsers only: [Hangman Game](https://psjgit.github.io/hangman-js/)

## Built With

* Vanilla JS
* Babel
* Webpack
* WordNik Api

## API KEY

To see the game run with more words loaded in, you'll need an API key. You can get one for free from here: [WordNikAPI](https://developer.wordnik.com/). When you have your key, create a config.js file in the root of the project with this in it:

```
const hangmanConfig = {
	KEY: '###-YOUR-KEY-HERE-###'
}

```

If you don't want to get an API key, the game will run off some predefined word lists.

## Commands

To install the project, run:

```
npm i
```

To run in development mode:

```
npm run dev
```

And to create a dist version:

```
npm run build
```

## Authors

* **Patrick Jones** - [PSJgit](https://github.com/PSJgit)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
