import {reload} from './javascript';

window.logoutButton.addEventListener('click', (e) => {
	logout();
	reload();
});

function logout() {
	sessionStorage.removeItem('userId');
	sessionStorage.removeItem('usseername');
	sessionStorage.removeItem('password');
}