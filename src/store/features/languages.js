import {
  createSlice
} from '@reduxjs/toolkit';
import words from '../../assets/lang';

// объект хранилища для изменения языка приложения
const initialState = {
  lang: 'ru',
  words 
}

export const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload
    },
  },
})

export const {
  setLang,
} = languagesSlice.actions

export default languagesSlice.reducer