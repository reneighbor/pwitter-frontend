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

test('submitting with bad creds does not log in', async(t) => {
    await confirmNotLoggedIn(t);
    await attemmptLoginBadCredentials(t);
    await confirmNotLoggedIn(t);
});

async function confirmNotLoggedIn(t) {
    const postTweetField = await t.context.browser.elements('textarea[name="body"]');
    const tweetsListTweets = await t.context.browser.elements('li[class="tweet"]');
    t.is(postTweetField.value.length, 0);
    t.is(tweetsListTweets.value.length, 0);

    const sessionStorageUserId = await t.context.browser.execute(() => window.sessionStorage.userId);
    const sessionStoragePassword = await t.context.browser.execute(() => window.sessionStorage.password);
    t.is(sessionStorageUserId.value, null);
    t.is(sessionStoragePassword.value, null);
}

async function attemmptLoginBadCredentials(t) {
    await t.context.browser.addValue('input[name="userId"]', "Bad UserId");
    await t.context.browser.addValue('input[name="password"]', "Bad Password");

    await t.context.browser.click('button[type="submit"]');
    const alertText = await t.context.browser.alertText();

    t.true(alertText.includes("Please log in with valid credentials"));
    t.context.browser.alertAccept();
}