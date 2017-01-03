function authenticated() {
	return Boolean(getCredentials());
}

function getCredentials() {
	if (!sessionStorage.getItem('userId')) {
		return null;
	}
	return {
		userId: sessionStorage.getItem('userId'),
		password: sessionStorage.getItem('password'),
		username: sessionStorage.getItem('username')
	};
}

function makeRequest(method, url, credentials, body) {
	const headers = new Headers();

	if (method === 'POST') {
		headers.append('Content-Type', 'application/json');
	}
	if (credentials) {
		const {userId, password} = credentials;
		headers.append('Authorization', 'Basic ' + btoa(`${userId}:${password}`))
	}

	return fetch(url, {
			method: method,
			headers: headers,
			body: JSON.stringify(body)
		}).then((response) => {
			console.log('Got response');
			console.log(response);
			if (response.status == 401) {
				const message = 'Please log in with valid credentials';
				setTimeout(() => {
					alert(message);
				}, 10000);
				throw new Error(message);
			}
			return response.json();
		}, (error) => {
			console.log('Fetch threw error');
			console.log(error);
			throw error;
	});	
}

function reload() {
	var event = new CustomEvent('reload', {bubbles: true});
	window.dispatchEvent(event);
}