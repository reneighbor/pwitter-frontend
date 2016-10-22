import test from 'ava';
import PhantomJS from 'phantomjs-adapter';

const browser = new PhantomJS();

// Make js files log to stdout in test
// browser.logs.forEach((log) => {
//   console.log(log);
// });

test.before(async () => {
	// python -m SimpleHTTPServer 8080 
	await browser.open('http://127.0.0.1:8080');
});

test(async (t) => {
	const form = await browser.find('form[id="login"]');

	const usernameField = await browser.find('input[name="userId"]', {wait: 2000});
	
	const passwordField = await browser.find('input[name="password"]');
	console.log(passwordField);

	await usernameField.fillIn('US508f050371364c');
	await passwordField.fillIn('HDY2JT5IJRIQPYIP');

	const submitButton = await browser.find('button[type="submit"]')
	await submitButton.click();
});