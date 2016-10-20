import test from 'ava';
import PhantomJS from 'phantomjs-adapter';

const browser = new PhantomJS();

test.before(async () => {
	// python -m SimpleHTTPServer 8080 
	await browser.open('http://127.0.0.1:8080');
  	await browser.sendEvent('load');

});

test(async (t) => {
	console.log('searching for inputs')

	const form = await browser.find('form[id="login"]');
	console.log(form)

	const searchBox = await browser.find('input[name="userId"]');
	console.log(searchBox)
	const usernameField = await browser.find('input[name="userId"]');
	// const passwordField = await browser.find('input[name="password"]');

	usernameField.fillIn('US508f050371364c');
	// passwordField.fillIn('HDY2JT5IJRIQPYIP');

	browser.find('button[type="submit"]').click();

	// const tweetInput = browser.find("")

});