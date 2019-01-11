export default {
	'HEADERS_A': {headers: {'Accept': 'application/json',
	 'Content-Type': 'application/json',
	  'Authorization': 'Token ' + localStorage.token}},

	'HEADERS_B': {headers: {'Accept': 'application/json',
	 'Content-Type': 'application/json'}},

	'HEADERS_C': {headers: {'Authorization': 'Token ' + localStorage.token}}
};