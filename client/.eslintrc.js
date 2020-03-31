module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'cypress/globals': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:cypress/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	"parser": "babel-eslint",
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react','cypress'
	],
	'rules': {
		'indent': [
			'error',
			2
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'no-trailing-spaces': 'error',
		'arrow-spacing': [
			'error', {'before': true, 'after': true}
		]
	}
}