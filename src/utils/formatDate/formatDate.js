import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

const formatDate = datetime => {
	let fromNow = moment(datetime).fromNow();
	return fromNow;
}

export default formatDate;