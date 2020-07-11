
import {defaultLocale} from '../../constants/defaultValues'

import {
    CHANGE_LOCALE
} from '../actions';

const INIT_STATE = {
	locale: defaultLocale,
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case CHANGE_LOCALE:
		return { ...state, locale:action.payload};

		default: return { ...state };
	}
}