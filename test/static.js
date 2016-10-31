import test from 'ava';
import webdriver, {By, until} from 'selenium-webdriver';

const browser = new webdriver.Builder()
							.forBrowser('chrome')
							.build();
	

test.before(async (t) => {
	await browser.get('http://127.0.0.1:8080');
});

test.after.always(async(t) => {
	await browser.quit();
})

test.only('submitting bad credentials does not log in and clears sessionStorage', async (t) => {
	const postTweetField = await browser.findElements(By.css('textarea[name="body"]'));
	const tweetsListTable = await browser.findElements(By.css('li[class="tweet"]'));
	t.is(postTweetField.length, 0);
	t.is(tweetsListTable.length, 0);

	const sessionStorageUserId = await browser.executeScript(() => window.sessionStorage.userId);
	const sessionStorageUserPassword = await browser.executeScript(() => window.sessionStorage.password);
	t.is(sessionStorageUserId, null)
	t.is(sessionStorageUserPassword, null)

	const usernameField = await browser.findElement(By.css('input[name="userId"]'));	
	const passwordField = await browser.findElement(By.css('input[name="password"]'));
	
	await usernameField.sendKeys('BadUsername');
	await passwordField.sendKeys('BadPassword');

	const submitButton = await browser.findElement(By.css('button[type="submit"]'));
	// stub out alert button
	await browser.executeScript("window.alert = function(msg){return true;};");
	await submitButton.click();

	await browser.executeScript(() => console.log('Wasting time'));

	const sessionStorageUserIdAfter = await browser.executeScript(() => window.sessionStorage.userId);
	const sessionStorageUserPasswordAfter = await browser.executeScript(() => window.sessionStorage.password);
	t.is(sessionStorageUserIdAfter, null)
	t.is(sessionStorageUserPasswordAfter, null)

	const postTweetFieldLoaded = await browser.findElements(By.css('textarea[name="body"]'));
	const tweetsListTableLoaded = await browser.findElements(By.css('li[class="tweet"]'));
	t.is(postTweetField.length, 0);
	t.is(tweetsListTable.length, 0);
});

test('logging in loads post-tweet and load-tweet fields and saves login info to sessionStorage', async (t) => {
	const postTweetField = await browser.findElements(By.css('textarea[name="body"]'));
	const tweetsListTable = await browser.findElements(By.css('li[class="tweet"]'));
	t.is(postTweetField.length, 0);
	t.is(tweetsListTable.length, 0);

	let sessionStorageUserId = await browser.executeScript(() => window.sessionStorage.userId);
	let sessionStorageUserPassword = await browser.executeScript(() => window.sessionStorage.password);
	t.is(sessionStorageUserId, null)
	t.is(sessionStorageUserPassword, null)

	const usernameField = await browser.findElement(By.css('input[name="userId"]'));	
	const passwordField = await browser.findElement(By.css('input[name="password"]'));
	
	await usernameField.sendKeys('US508f050371364c');
	await passwordField.sendKeys('HDY2JT5IJRIQPYIP');

	const submitButton = await browser.findElement(By.css('button[type="submit"]'));
	await submitButton.click();

	await browser.wait(until.elementLocated(By.css('textarea[name="body"]')));
	await browser.wait(until.elementLocated(By.css('li[class="tweet"]')));

	const postTweetFieldLoaded = await browser.findElements(By.css('textarea[name="body"]'));
	const tweetsListTableLoaded = await browser.findElements(By.css('li[class="tweet"]'));
	t.is(postTweetFieldLoaded.length, 1);
	t.true(tweetsListTableLoaded.length > 1);

	sessionStorageUserId = await browser.executeScript(() => window.sessionStorage.userId);
	sessionStorageUserPassword = await browser.executeScript(() => window.sessionStorage.password);
	t.is(sessionStorageUserId, 'US508f050371364c')
	t.is(sessionStorageUserPassword, 'HDY2JT5IJRIQPYIP')
});
