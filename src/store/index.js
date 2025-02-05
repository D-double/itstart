import { configureStore } from '@reduxjs/toolkit'
import seminars from './features/seminars'
import languages from './features/languages'

export default configureStore({
  reducer: {
    seminars, /* хранилище для управления семинарами и модальным окном */
    languages, /* хранилище для выбора языка приложения */
  }
})