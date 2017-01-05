import test from 'ava';
import {remote} from 'webdriverio';

const options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

test.beforeEach((t) => {
    t.context.browser = remote(options).init().url('http://127.0.0.1:8080');
});

test.afterEach.always((t) => {    
    t.context.browser.end();
});

test('logging in loads page and adds credentials to session storage', async(t) => {
    await confirmNotLoggedIn(t);
    await attemptLogin(t, 'USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG');
    await confirmLoggedIn(t, 'USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG');
});

test('submitting with bad creds does not log in', async(t) => {
    await confirmNotLoggedIn(t);
    await attemmptLoginBadCredentials(t);
    await confirmNotLoggedIn(t);
});

test('posting a tweet adds that tweet to tweets list', async(t) => {
    await attemptLogin(t, 'USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG');
    await confirmLoggedIn(t, 'USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG');

    const tweetsList = await getTweetsList(t);
    await postTweet(t, `Tweet ${tweetsList.length + 1}`);
    
    const updatedTweetsList = await getTweetsList(t);
    t.is(updatedTweetsList.length, tweetsList.length + 1);

    t.is(updatedTweetsList[0], `Tweet ${tweetsList.length + 1}`);
});

test('logging out removes logged-in components and clears session storage', async(t) => {
    await attemptLogin(t, 'USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG');
    await confirmLoggedIn(t, 'USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG');
    await logOut(t);
    await confirmNotLoggedIn(t);
});

async function confirmNotLoggedIn(t) {
    const postTweetField = await t.context.browser.elements('textarea[name="body"]');
    t.is(postTweetField.value.length, 0);

    const tweetsListTweets = await t.context.browser.elements('li[class="tweet"]');
    t.is(tweetsListTweets.value.length, 0);

    const sessionStorageUserId = await t.context.browser.execute(() => window.sessionStorage.userId);
    t.is(sessionStorageUserId.value, null);

    const sessionStoragePassword = await t.context.browser.execute(() => window.sessionStorage.password);
    t.is(sessionStoragePassword.value, null);
}

async function confirmLoggedIn(t, userId, password) {
    await t.context.browser.waitForExist('textarea[name="body"]', 2000);

    const postTweetField = await t.context.browser.elements('textarea[name="body"]');
    t.is(postTweetField.value.length, 1);

    const tweetsListTweets = await t.context.browser.elements('li[class="tweet"]');
    t.true(tweetsListTweets.value.length > 1);

    const sessionStorageUserId = await t.context.browser.execute(() => window.sessionStorage.userId);
    t.is(sessionStorageUserId.value, userId);

    const sessionStoragePassword = await t.context.browser.execute(() => window.sessionStorage.password);
    t.is(sessionStoragePassword.value, password);
}

async function attemmptLoginBadCredentials(t) {
    await t.context.browser.addValue('input[name="userId"]', "Bad UserId");
    await t.context.browser.addValue('input[name="password"]', "Bad Password");


    await t.context.browser.click('form#loginForm button[type="submit"]');
    // Added in case 401 doesn't come back in time, give
    // it full waitUntil length
    const alertPresent = await t.context.browser.waitUntil(() => {
        return t.context.browser.alertText();
    }, 5000); 

    const alertText = await t.context.browser.alertText();

    t.true(alertText.includes("Please log in with valid credentials"));
    await t.context.browser.alertAccept();
}

async function attemptLogin(t, userId, password) {
    await t.context.browser.addValue('input[name="userId"]', userId);
    await t.context.browser.addValue('input[name="password"]', password);

    await t.context.browser.click('form#loginForm button[type="submit"]');
}

async function getTweetsList(t) {
    const tweetsElements = await t.context.browser.elements('li[class="tweet"]');
    const tweetsList = [];

    for (let i = 1; i <= tweetsElements.value.length; i++) {
        tweetsList.push(await t.context.browser.getText(`li.tweet:nth-child(${i}) p.body`));
    }
    return tweetsList;
};

async function postTweet(t, body) {
    await t.context.browser.addValue('textarea[name="body"]', body);
    await t.context.browser.click('form#tweet button[type="submit"]');

    await t.context.browser.waitUntil(async () => {
        const firstTweetText = await t.context.browser.getText('li.tweet:first-child .body');
        return firstTweetText == body;
    }, 5000);
}

async function logOut(t) {
    await t.context.browser.click('button#logoutButton');
}