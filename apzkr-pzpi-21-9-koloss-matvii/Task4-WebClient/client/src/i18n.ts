import ru from './trans/ru.json'
import ua from './trans/ua.json'

import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'


const resources = {
    ua: {
        translation:ua,
    },
    ru:{
        translation:ru,
    }
}

const language:string | null = localStorage.getItem('language');

i18n
.use(initReactI18next)
.init({
    resources,
    lng: language ? JSON.parse(language) : "ua",
    fallbackLng:'ua'
})

export default i18n;