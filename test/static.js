import test from 'ava';
import PhantomJS from 'phantomjs-adapter';

const browser = new PhantomJS();

browser.logs.forEach((log) => {
  console.log(log);
});

test.before(async () => {
	await browser.open('http://127.0.0.1:8080');
});

test.after.always(async() => {
	await browser.exit();
})

test('logging in loads post-tweet and load-tweet fields', async (t) => {
	const postTweetField = await browser.find('textarea[name="body"]');
	t.is(postTweetField, null);
	const tweetsListTable = await browser.find('li[class="tweet"]');
	t.is(tweetsListTable, null);

	const usernameField = await browser.find('input[name="userId"]');	
	const passwordField = await browser.find('input[name="password"]');

	await usernameField.fillIn('US508f050371364c');
	await passwordField.fillIn('HDY2JT5IJRIQPYIP');

	const submitButton = await browser.find('button[type="submit"]')
	await submitButton.click({wait: 2000});

	const postTweetFieldLoaded = await browser.find('textarea[name="body"]', {wait: 2000});
	t.not(postTweetFieldLoaded, null);
	const tweetsListTableLoaded = await browser.find('li[class="tweet"]');
	t.not(tweetsListTableLoaded, null);
});
