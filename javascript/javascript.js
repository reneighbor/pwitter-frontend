import fetch from 'isomorphic-fetch';
window.Promise = Promise; // To make Promise available in 
//phantom-js during isomorphic-fetch compiling

export function authenticated() {
	return Boolean(getCredentials());
}

export function getCredentials() {
	if (!sessionStorage.getItem('userId')) {
		return null;
	}
	return {
		userId: sessionStorage.getItem('userId'),
		password: sessionStorage.getItem('password'),
		username: sessionStorage.getItem('username')
	};
}

export function makeRequest(method, url, credentials, body) {
	const headers = new Headers();

	if (method === 'POST') {
		headers.append('Content-Type', 'application/json');
	}
	if (credentials) {
		const {userId, password} = credentials;
		headers.append('Authorization', 'Basic ' + btoa(`${userId}:${password}`))
	}

	try {
		const request = fetch(url, {
			method: method,
			headers: headers,
			body: JSON.stringify(body)
		}).then((response) => {
			console.log('Got response');
			console.log(response);
			if (response.status == 401) {
				const message = 'Please log in with valid credentials';
				alert(message);
				throw new Error(message);
			}
			return response.json();
		}, (error) => {
			console.log('Fetch threw error');
			console.log(error);
			throw error;
		});	
	} catch(exception) {
		console.log(exception);
	}
	
	return request;
}

export function reload() {
	var event = new CustomEvent('reload', {bubbles: true});
	window.dispatchEvent(event);
}