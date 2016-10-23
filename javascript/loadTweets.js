window.addEventListener('reload', function (e) { 
	if (authenticated()) {
		loadTweets();
	} else {
		removeTweets();
	}
});

function removeTweets() {
	window.tweets.innerHTML = '';
}

function loadTweets() {
	var credentials = getCredentials()
	return makeRequest('GET', 'http://localhost:5000/tweets', credentials)
		.then((jsonResponse) => {
			window.tweets.innerHTML = '';
			for (const tweet of jsonResponse.tweets) {
				window.tweets.innerHTML += 
				`
				<li class="tweet">
					<p>${tweet.date_created}</p>
					<p>${tweet.body}</p>
					<p>${tweet.username}</p>					
				</li>
				`
			}
		});
};
