import fetch from 'isomorphic-fetch';

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
	console.log('At the beg of makeRequest');
	console.log(url);
	const headers = new Headers();
	console.log('Headers?');

	// if (method === 'POST') {
	// 	headers.append('Content-Type', 'application/json');
	// }
	// if (credentials) {
	// 	const {userId, password} = credentials;
	// 	headers.append('Authorization', 'Basic ' + btoa(`${userId}:${password}`));	
	// }

	return fetch(url, {
		method: method,
		headers: headers,
		body: JSON.stringify(body)
	}).then((response) => {
		if (response.status == 401) {
			const message = 'Please log in with valid credentials';
			alert(message);
			throw new Error(message);
		}
		return response.json();
	});	
}

export function reload() {
	var event = new CustomEvent('reload', {bubbles: true});
	window.dispatchEvent(event);
}