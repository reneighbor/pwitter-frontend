import {authenticated} from './javascript';
import {getCredentials} from './javascript';
import {makeRequest} from './javascript';
import {reload} from './javascript';

window.addEventListener('reload', (e) => {
	if (authenticated())  {
		window.tweet.innerHTML = `
			<textarea name="body" rows="10" columns="200"required>
			</textarea>

		    <button type="submit">Post</button>
			`
	} else {
		window.tweet.innerHTML = '';
	}
})

window.tweet.addEventListener("submit", (e) => {
	e.preventDefault();
	postTweet(window.tweet.body.value);
});

function postTweet(body) {
	if (!authenticated()) {
		return;
	}

	const credentials = getCredentials();
	const {username} = getCredentials();

	return makeRequest('POST', `http://localhost:5000/users/${username}/tweets`, credentials, {
		body: body
	}).then((jsonResponse) => {
		reload();
	});
}