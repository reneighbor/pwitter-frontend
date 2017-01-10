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
	window.tweets.innerHTML ='<ol id="tweetsList"></ol>';
	var credentials = getCredentials();

	return makeRequest('GET', 'http://localhost:5000/tweets', credentials)
		.then((jsonResponse) => {
			for (const tweet of jsonResponse.tweets) {
				window.tweetsList.innerHTML += 
				`
				<li class="tweet">
					<p>${tweet.date_created}</p>
					<p class="body">${tweet.body}</p>
					<p>${tweet.username}</p>					
				</li>
				`
			}
		});
};
