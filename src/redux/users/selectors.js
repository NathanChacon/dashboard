export const selectAllUsers = (state) => state.users.users
export const selectUserById = (state, id) => state.users.users.find((user) => user.id === id)