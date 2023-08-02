import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

export default function DeleteDialog({ title, contentText, deleteFunction, open, handleClose }) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "Staatliches", fontSize: "2rem" }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Disagree</Button>
                <Button variant="contained" onClick={deleteFunction} color='warning' autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}
