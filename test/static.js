import test from 'ava';
import PhantomJS from 'phantomjs-adapter';

const browser = new PhantomJS();

test.before(async () => {
	// python -m SimpleHTTPServer 8080 
	await browser.open('http://127.0.0.1:8080')
});

test(async (t) => {
	const usernameField = browser.find('input[name="userId"]');
	const passwordField = browser.find('input[name="password"]');

	
});