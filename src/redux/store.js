import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/users'

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})
