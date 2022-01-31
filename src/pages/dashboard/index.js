import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../../components/table'
import {
    fetchUsersAsync,
    deleteUserById
} from '../../redux/users/users'
import {selectAllUsers} from '../../redux/users/selectors'
import ConfirmDialog from '../../components/confirmDialog'
import { Link, useNavigate } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@mui/material/IconButton'

export function Dashboard() {

  const getTableRows = (users) => {
    const rows = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        city: user.address.city,
        email: user.email
      }
    })

    return rows
  }

  const getTableColumns = () => {
    const columns = [
      { 
        field: 'id',
        headerName: 'ID', 
        disableClickEventBubbling: true,
        flex: 1,
        minWidth: 90,
        sortable: false
      },
      { 
        field: 'name', 
        headerName: 'Name', 
        sortable: false, 
        disableClickEventBubbling: true,
        flex: 1,
        minWidth: 150
      },
      { 
        field: 'username', 
        headerName: 'Username', 
        disableClickEventBubbling: true,
        flex: 1,
        minWidth: 150
      },
      {
        field: 'city',
        headerName: 'City',
        sortable: false,
        disableClickEventBubbling: true,
        flex: 1,
        minWidth: 150
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        disableClickEventBubbling: true,
        flex: 1,
        minWidth: 190
      },
      {
        field: 'edit',
        sortable: false,
        headerName: 'Edit',
        disableClickEventBubbling: true,
        renderCell: renderEditButton,
        flex: 1,
        minWidth: 120
      },
      {
        field: 'delete',
        sortable: false,
        headerName: 'Delete',
        disableClickEventBubbling: true,
        renderCell: renderDeleteButton,
        flex: 1,
        minWidth: 120
      },
    ]

    return columns
  }

  const renderEditButton = (params) => {
    return (
        <strong>
      <strong>
        <IconButton aria-label="delete" size='small' onClick={() => {onEditUser(params.row.id)}}>
          <EditIcon />
        </IconButton>
      </strong>
        </strong>
    )
}

const renderDeleteButton = (params) => {
  return (
      <strong>
        <IconButton aria-label="delete" size='small' onClick={() => {onDeleteUser(params.row.id)}}>
          <DeleteIcon />
        </IconButton>
      </strong>
  )
}

  const onDeleteUser = (userId) => {
    setSelectedUserId(userId)
    openDeleteUserDialog()
  }

  const onEditUser = (userId) => {
    navigate(`/user/${userId}`)
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

  const navigate = useNavigate()
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()
  const rows = getTableRows(users)
  const columns = getTableColumns()
  const deleteUserDialogTitle = "Are you sure that you want to delete this user ?"
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  useEffect(() => {
    if(users.length === 0){
      dispatch(fetchUsersAsync())
    }
  }, [])

  return (
    <Box component="section" sx={{p:2}}>
      <header >
        <h1>Dashboard</h1>
      </header>
      <Box>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            p: 1
          }}
        >
          <Link to={"/user"} style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='primary' startIcon={<AddIcon/>}>Add user</Button>
          </Link>
        </Box>
        <Table rows={rows} columns={columns}/>
      </Box>
      <ConfirmDialog  
          onClose={onCloseDeleteUserDialog}  
          open={isDeleteUserDialogOpen} 
          title={deleteUserDialogTitle} 
          onCancel={onCloseDeleteUserDialog}
          onConfirm={onConfirmDeleteUserDialog}
        />
    </Box>
  )
}