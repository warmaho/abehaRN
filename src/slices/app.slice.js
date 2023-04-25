/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  checked: false,
  loggedIn: false,
  pokemon: {},
  favorites: [],
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.loggedIn = payload.loggedIn
      state.checked = payload.checked
    },
    saveMe: (state, { payload }) => {
      state.pokemon = payload.pokemon
    },
    saveFav: (state, { payload }) => {
      state.favorites = [...state.favorites, payload.favorites]
    },
    clearFav: (state) => {
      state.favorites = []
    },
  },
})

export const { action } = appSlice
export const {
  authenticate, saveMe, saveFav, clearFav,
} = appSlice.actions

export default appSlice.reducer
