window.addEventListener('load', (e) => {
	window.login.innerHTML += `
	<form id="loginForm">
		<label>userId
			<input type="text" placeholder="Enter userId" name="userId" required>
		</label>

	    <label>Password
	    	<input type="password" placeholder="Enter Password" name="password" required>
	    </label>
	    
	    <button type="submit">Login</button>
	</form>
		`

	window.loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		authenticate(window.loginForm.userId.value, window.loginForm.password.value)
			.then(() => {
				reload();
			});
	});

	if (authenticated()) {
		reload();
	}
});



function authenticate(userId, password) {
	sessionStorage.setItem('userId', userId);
	sessionStorage.setItem('password', password);

	const credentials = getCredentials();

	return makeRequest('GET', `http://localhost:5000/users?userId=${userId}`, credentials)
		.then(
			(jsonResponse) => {
				sessionStorage.setItem('username', jsonResponse.user.username);
			},
			(error) => {
				sessionStorage.removeItem('userId');
				sessionStorage.removeItem('password');
			}
		);		
}
