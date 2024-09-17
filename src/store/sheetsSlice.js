import { createSlice } from '@reduxjs/toolkit';

const sheetsSlice = createSlice({
  name: 'sheets',
  initialState: [],
  reducers: {
    addSheet: (state, action) => {
      state.push(action.payload);
    },
    updateSheet: (state, action) => {
      const { id, title, questions } = action.payload;
      const sheet = state.find((sheet) => sheet.id === id);
      if (sheet) {
        sheet.title = title;
        sheet.questions = questions;
      }
    },
    deleteSheet: (state, action) => {
      return state.filter((sheet) => sheet.id !== action.payload);
    },
  },
});

export const { addSheet, updateSheet, deleteSheet } = sheetsSlice.actions;
export default sheetsSlice.reducer;
