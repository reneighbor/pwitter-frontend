window.addEventListener('reload', (e) => {
	if (authenticated())  {
		window.tweet.innerHTML = `
		<form id="tweetForm">
			<textarea name="body" rows="10" columns="200"required>
			</textarea>

		    <button type="submit">Post</button>
		</form>
			`
		window.tweetForm.addEventListener("submit", (e) => {
			e.preventDefault();
			postTweet(window.tweetForm.body.value);
		});
	} else {
		window.tweet.innerHTML = '';
	}
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