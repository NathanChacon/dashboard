import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from './usersApi'

const initialState = {
    users: [],
    status:  'idle',
    error: null
}

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsers()

    return response.data
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: { 
    deleteUserById: (state, action) => {
      const idToDelete = action.payload
      state.users = state.users.filter((user) => user.id !== idToDelete)
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    editUserById: (state, action) => {
      const userId = parseInt(action.payload.id)
      state.users = state.users.map((user) => {
        if(user.id === userId){
          return {...action.payload}
        }
        else{
          return user
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.users = action.payload
        state.error = null
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = "Error while trying to get users"
      })
  },
})

export const {deleteUserById, addUser, editUserById} = usersSlice.actions

export default usersSlice.reducer
