import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

// асинхронный метод для получения всех семинаров
export const getSeminars = createAsyncThunk('seminars/getSeminars', async () => {
  try {
    const result = await axios.get(import.meta.env.VITE_BASE_URL);
    return result.data;
  } catch (error) {
    console.log(error);
  }
})

// асинхронный метод для удаления семинара
export const delSeminar = createAsyncThunk('seminars/delSeminar', async (_, {dispatch, getState}) => {
  try {
    let { seminarInfo } = getState().seminars
    const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${seminarInfo.id}`);
    dispatch(getSeminars())
    dispatch(closeModal())
  } catch (error) {
    console.log(error);
  }
})

// асинхронный метод для изменения семинара
export const changeSeminar = createAsyncThunk('seminars/editSeminar', async (elem, {dispatch}) => {
  try {
    const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/${elem.id}`, elem);
    dispatch(getSeminars())
    dispatch(closeModal())
  } catch (error) {
    console.log(error);
  }
})

// асинхронный метод для добавления семинара
export const addSeminar = createAsyncThunk('seminars/addSeminar', async (elem, {dispatch}) => {
  try {
    const obj = JSON.stringify(elem);
    const result = await axios.post(import.meta.env.VITE_BASE_URL, obj);
    dispatch(getSeminars())
    dispatch(closeModal())
  } catch (error) {
    console.log(error);
  }
})


// объект хранилища для работы с модальным окном и семинарами
const initialState = {
  seminars: null,
  search: '',
  currentId: 0,
  seminarInfo: null,
  isError: false,
  modal: false,
  modalStatus: 'edit',
  statusList: {
    edit: 'edit',
    del: 'del',
    add: 'add'
  }
}

export const seminarsSlice = createSlice({
  name: 'seminars',
  initialState,
  reducers: { // методы для изменения состояния в хранилище
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setAddStatus: (state)=>{
      state.currentId = parseInt(state.currentId) + 1;
      state.modalStatus = state.statusList.add;
      state.modal = true;
    },
    setSeminarInfo: (state, action)=>{
      const seminar = state.seminars.find((elem)=> elem.id == action.payload.id)
      state.seminarInfo = seminar
      state.modalStatus = action.payload.status;
      state.modal = true;
    },
    setModal: (state, action) => {
      state.modal = action.payload
    },
    closeModal: (state) => {
      state.modal = false;
      state.seminarInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSeminars.pending, (state, action) => {
      state.isError = false;
    })
    builder.addCase(getSeminars.fulfilled, (state, action) => {
      const lastId = [...action.payload].sort((a, b)=> a.id - b.id).pop().id;
      state.currentId = lastId;
      state.seminars = [...action.payload];
    })
    builder.addCase(getSeminars.rejected, (state, action) => {
      state.isError = true;
    })
  }
})

export const {
  setSearch,
  setAddStatus,
  setSeminarInfo,
  setModal,
  closeModal
} = seminarsSlice.actions

export default seminarsSlice.reducer