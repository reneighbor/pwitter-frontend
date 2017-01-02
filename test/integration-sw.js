// import test from 'ava';
// import webdriver, {By, 	until} from 'selenium-webdriver';


	
// test.beforeEach(async (t) => {
// 	// share the browser across tests via text context
// 	t.context.browser = new webdriver.Builder()
// 							.forBrowser('chrome')
// 							.build();


// 	await t.context.browser.get('http://127.0.0.1:8080');
// });

// test.afterEach.always(async(t) => {
// 	await t.context.browser.quit();
// })

// test.only('submitting bad credentials does not log in and clears sessionStorage', async (t) => {
// 	const browser = t.context.browser;

// 	const postTweetField = await browser.findElements(By.css('textarea[name="body"]'));
// 	const tweetsListTable = await browser.findElements(By.css('li[class="tweet"]'));
// 	t.is(postTweetField.length, 0);
// 	t.is(tweetsListTable.length, 0);

// 	const sessionStorageUserId = await browser.executeScript(() => window.sessionStorage.userId);
// 	const sessionStorageUserPassword = await browser.executeScript(() => window.sessionStorage.password);
// 	t.is(sessionStorageUserId, null)
// 	t.is(sessionStorageUserPassword, null)
	
// 	await attemptLogin('BadLogin', 'BadPassword', t);
// 	await browser.wait(until.alertIsPresent());

// 	const alert = await browser.switchTo().alert();
// 	console.log(alert);
// 	await alert.accept();

	

// 	const sessionStorageUserIdAfter = await browser.executeScript(() => window.sessionStorage.userId);
// 	const sessionStorageUserPasswordAfter = await browser.executeScript(() => window.sessionStorage.password);
// 	t.is(sessionStorageUserIdAfter, null)
// 	t.is(sessionStorageUserPasswordAfter, null)

// 	const postTweetFieldLoaded = await browser.findElements(By.css('textarea[name="body"]'));
// 	const tweetsListTableLoaded = await browser.findElements(By.css('li[class="tweet"]'));
// 	t.is(postTweetField.length, 0);
// 	t.is(tweetsListTable.length, 0);
// });

// test('logging in loads post-tweet and load-tweet fields and saves login info to sessionStorage', async (t) => {
// 	const browser = t.context.browser;

// 	const postTweetField = await browser.findElements(By.css('textarea[name="body"]'));
// 	const tweetsListTable = await browser.findElements(By.css('li[class="tweet"]'));
// 	t.is(postTweetField.length, 0);
// 	t.is(tweetsListTable.length, 0);

// 	let sessionStorageUserId = await browser.executeScript(() => window.sessionStorage.userId);
// 	let sessionStorageUserPassword = await browser.executeScript(() => window.sessionStorage.password);
// 	t.is(sessionStorageUserId, null)
// 	t.is(sessionStorageUserPassword, null)

// 	await attemptLogin('USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG', t);

// 	await browser.wait(until.elementLocated(By.css('textarea[name="body"]')));
// 	await browser.wait(until.elementLocated(By.css('li.tweet')));

// 	const postTweetFieldLoaded = await browser.findElements(By.css('textarea[name="body"]'));
// 	const tweetsListTableLoaded = await browser.findElements(By.css('li.tweet'));
// 	t.is(postTweetFieldLoaded.length, 1);
// 	t.true(tweetsListTableLoaded.length > 1);

// 	sessionStorageUserId = await browser.executeScript(() => window.sessionStorage.userId);
// 	sessionStorageUserPassword = await browser.executeScript(() => window.sessionStorage.password);
// 	t.is(sessionStorageUserId, 'USd91f346acdaf46')
// 	// t.is(sessionStorageUserPassword, 'YZ9KPOIS0KLM9AKG')
// });


// // Dealing with real life data
// // Count and increment tweets  // done
// // Randomize string
// // Dedicated account / login for integration tests // done

// test('posting a tweet adds that tweet to the tweets list', async (t) => {
// 	const browser = t.context.browser;
// 	await attemptLogin('USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG', t);

// 	let tweetsList = await browser.wait(until.elementLocated(By.css('ol#tweets')));

// 	const tweetsLoaded = await browser.wait(until.elementsLocated(By.css('li.tweet')));
// 	const tweets = await browser.findElements(By.css('li.tweet'));

// 	const tweetsLengthOld = tweets.length

	
// 	const tweetInput = await browser.findElement(By.css('form#tweet textarea'));
// 	tweetInput.sendKeys("I am R!");

// 	const tweetSubmit = await browser.findElement(By.css('form#tweet button'));
// 	await tweetSubmit.click();

// 	const tweetPosted = await browser.wait(until.elementTextContains(tweetsList, "I am R!"))
// 	tweetsList = await browser.findElements(By.css('ol#tweets li.tweet'));

// 	t.is(tweetsList.length, tweetsLengthOld + 1)

// 	console.log(await tweetsList[0].findElement(By.css('p.body')).getText());

// 	t.is(await tweetsList[0].findElement(By.css('p.body')).getText(), "I am R!");
// });

// async function attemptLogin (userId, password, t) {
// 	const browser = t.context.browser; 

// 	const usernameField = await browser.findElement(By.css('input[name="userId"]'));	
// 	const passwordField = await browser.findElement(By.css('input[name="password"]'));
	
// 	await usernameField.sendKeys(userId);
// 	await passwordField.sendKeys(password);

// 	const submitButton = await browser.findElement(By.css('button[type="submit"]'));
// 	await submitButton.click();
// 	return;
// };
