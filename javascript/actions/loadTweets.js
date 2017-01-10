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
	console.log(window.tweets);
	window.tweets.innerHTML +='<ol id="tweetsList>';
	console.log(window.tweets); // is it the same empty div both times?
	// Why can't I add an <ol> to the nside of my div?
	// I think I was able to when loading the login form. It was also a div with an ID
	// 

	var credentials = getCredentials()
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
