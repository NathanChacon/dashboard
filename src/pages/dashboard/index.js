import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../components/table'
import {
    fetchUsersAsync,
    selectAllUsers,
    deleteUserById
} from '../../redux/users/users';
import ConfirmDialog from '../../components/confirmDialog';

export function Dashboard() {

  const getTableRows = (users) => {
    const rows = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        city: user.address.city,
        email: user.email,
        actions: <span>
                  <Button onClick={() => {onDeleteUser(user.id)}}>DELETE</Button>
                  <Button onClick={() => {onEditUser(user.id)}}>EDIT</Button>
                </span>
      }
    })

    return rows
  }

  const getTableColumns = () => {
    const columns = [
      {
        key: "id",
        title: "Id"
      },
      {
        key: "name",
        title: "Name"
      },
      {
        key: "username",
        title: "Username"
      },
      {
        key: "city",
        title: "City"
      },
      {
        key: "email",
        title: "Email"
      },
      {
        key: "actions",
        title: ""
      }
    ]

    return columns
  }

  const onDeleteUser = (userId) => {
    setSelectedUserId(userId)
    openDeleteUserDialog()
  }

  const onEditUser = (userId) => {
    console.log(userId)
  }

  const onCloseDeleteUserDialog = () => {
    setIsDeleteUserDialogOpen(false)
  }

  const openDeleteUserDialog = () => {
    setIsDeleteUserDialogOpen(true)
  }

  const onConfirmDeleteUserDialog = () => {
    dispatch(deleteUserById(selectedUserId))
    onCloseDeleteUserDialog()
  }

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const rows = getTableRows(users)
  const columns = getTableColumns()
  const deleteUserDialogTitle = "Are you sure that you want to delete this user ?"
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  useEffect(() => {
      dispatch(fetchUsersAsync())
  }, [])

  return (
    <Box component="section" sx={{p:2}}>
      <header >
        <h1>Dashboard</h1>
      </header>
      <Table rows={rows} columns={columns}/>
      <ConfirmDialog  
        onClose={onCloseDeleteUserDialog}  
        open={isDeleteUserDialogOpen} 
        title={deleteUserDialogTitle} 
        onCancel={onCloseDeleteUserDialog}
        onConfirm={onConfirmDeleteUserDialog}
      />
    </Box>
  );
}