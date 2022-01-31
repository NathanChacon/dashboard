import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

function ConfirmDialog(props) {
  const { onClose, open, title, onCancel, onConfirm} = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
          <Button variant='contained' color='error' onClick={onCancel}>Cancel</Button>
          <Button variant='contained' color='success' onClick={onConfirm}>Confirm</Button>
        </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog