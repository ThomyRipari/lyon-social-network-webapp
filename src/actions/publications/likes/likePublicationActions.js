import axios from 'axios';

/* Import Endpoint & Headers */
import endpoints from '../../../utils/requests/endpoints';
import headers from '../../../utils/requests/headers';

export default function likePublications(id) {
	return dispatch => {
		axios.post(endpoints.LIKE_PUBLICATIONS, JSON.stringify({publication_id: id}), headers.HEADERS_A)

		.then((res) => {
			if (res.data.message === "UNLIKE") {
				document.getElementById("like-icon-" + id).style.color = "white";
				document.getElementById("likes-count-" + id).style.color = "white";
           		document.getElementById("likes-count-" + id).innerHTML = parseInt(document.getElementById("likes-count-" + id).innerHTML, 10) - 1;

			} else {
        		document.getElementById("like-icon-" + id).style.color = "blue";
        		document.getElementById("likes-count-" + id).style.color = "blue";
            	document.getElementById("likes-count-" + id).innerHTML = parseInt(document.getElementById("likes-count-" + id).innerHTML, 10) + 1;
        	}
		})

		.catch(() => {
			window.location.href = '/server-error';
		})
	}
}