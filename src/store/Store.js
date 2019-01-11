import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/* rootReducer */
import rootReducer from '../reducers/index';

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;