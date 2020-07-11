import {
    CHANGE_LOCALE
} from '../actions';


export const changeLocale = (locale) => {
    localStorage.setItem('currentLanguage', "jp");
    return (
        {
            type: CHANGE_LOCALE,
            payload: locale
        }
    )
}

