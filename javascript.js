const headers = new Headers();
headers.append('Authorization', "Basic " 
	+ btoa("USde4dfd9937e948:57M8U3RF1NHLYRG8"));

fetch('http://localhost:5000/tweets', {
	headers: headers
})
	.then((response) => response.json())
	.then((jsonResponse) => {
		console.log(jsonResponse);
		for (const tweet of jsonResponse.tweets) {
			window.tweets.innerHTML += 
			`
			<li>
				<p>${tweet.date_created}</p>
				<p>${tweet.body}</p>
				<p>${tweet.username}</p>					
			</li>
			`
		}
	})