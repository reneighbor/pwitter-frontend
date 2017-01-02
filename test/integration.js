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

test.only('posting a tweet adds that tweet to tweets list', async(t) => {
    await attemptLogin(t, 'USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG');
    await confirmLoggedIn(t, 'USd91f346acdaf46', 'YZ9KPOIS0KLM9AKG');

    const tweetsList = await getTweetsList(t);
    await postTweet(t, "This will get added to the top");
    
    const updatedTweetsList = await getTweetsList(t);
    t.is(updatedTweetsList.length, tweetsList.length + 1);
    
    t.true(updatedTweetsList[0].body.includes("This will get added to the top"))
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

async function confirmLoggedIn(t, userId, password) {89
    await t.context.browser.waitForExist('textarea[name="body"]', 1000);

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

    await t.context.browser.click('button[type="submit"]');
    const alertText = await t.context.browser.alertText();

    t.true(alertText.includes("Please log in with valid credentials"));
    await t.context.browser.alertAccept();
}

async function attemptLogin(t, userId, password) {
    await t.context.browser.addValue('input[name="userId"]', userId);
    await t.context.browser.addValue('input[name="password"]', password);

    await t.context.browser.click('button[type="submit"]');
}

async function getTweetsList(t) {
    const tweetsList = await t.context.browser.elements('li[class="tweet"]');
    return tweetsList.value;
};

async function postTweet(t, body) {
    await t.context.browser.addValue('textarea[name="body"]', body);
    await t.context.browser.click('button[type="submit"]');
    // await t.450076context.browser.waitForExist('span[class="confirm-post-tweet"]');
}