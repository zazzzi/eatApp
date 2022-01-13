import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import * as React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { MenuContext } from '../../context/MenusContext';
import { useContext } from 'react';
import { Link } from "react-router-dom";

interface Iprops {
  table: string
}

export default function AlertDialog({table}:Iprops) {
  const [open, setOpen] = React.useState(false);
  const {deleteTable} = useContext(MenuContext)
  const classes = useStyles(); 

  const handleDelete = (tableNr: string) => {
    deleteTable(tableNr)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        <DeleteIcon/>Radera
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Är du säkert?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose()}>Nej</Button>
          <Button 
            onClick={() => {
              handleDelete(table)
              handleClose()
            }} 
            autoFocus
            >
            <Link to={'/tables'}> 
              Ja
            </Link >
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  button: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "8rem",
    margin: '1rem'
  }, 
}));