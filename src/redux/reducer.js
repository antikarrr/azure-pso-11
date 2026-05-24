import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({

  name: "app",

  initialState: {

    client: {

      toggleForm: false,

      formId: null,

      deleteId: null,

    },

  },

  reducers: {

    toggleChangeAction: (state) => {

      state.client.toggleForm =
        !state.client.toggleForm;

    },

    updateAction: (state, action) => {

      state.client.formId =
        action.payload;

    },

    deleteAction: (state, action) => {

      state.client.deleteId =
        action.payload;

    },

  },

});

export const {

  toggleChangeAction,

  updateAction,

  deleteAction,

} = appSlice.actions;

export default appSlice.reducer;