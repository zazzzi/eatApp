import {
  Box,
  makeStyles,
  Theme,
  Modal,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { MenuContext } from "../../context/MenusContext";

interface Iprops {
  closeModal: () => void;
  editOpen: boolean;
  restaurantData: any
}

function EditTableModal(props: Iprops) {
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [tableValue, setTableValue] = useState<string>('')
  const {addTable} = useContext(MenuContext)
  const [tableValueTaken, setTableValueTaken] =useState<boolean>(false)
  
  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    bgcolor: "#FEFEFE",
    border: "2px solid #000",
    borderRadius: "30px",
    boxShadow: 12,
    p: 4,
  };

  const handleInput = (event: any) => {
    props.restaurantData.tables.includes(event.target.value) ? 
    setTableValueTaken(true) : setTableValueTaken(false)
    setTableValue(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    addTable(tableValue)
  };

  //check if table already exists 
 
  return (  
    <Modal
      open={props.editOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Box className={classes.modalFormContainer}>
        <form className={classes.formStyle} onSubmit={handleSubmit}>
          <Typography variant="h4"><b>Bordsnummer</b></Typography>
          <TextField
                error={tableValueTaken}
                type="number"
                variant="outlined"
                margin="normal"
                placeholder={"Nummer"}
                label="Nummer"
                onChange={handleInput}
                helperText={ tableValueTaken ? "Bordet finns redan" : null}
          /> 
          <Box mt={1} className={classes.modalButtonsContainer}>
            <Box p={1}>
              <Button
                className={classes.button}
                color="secondary"
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={() => {
                  props.closeModal();
                }}
              >
                Cancel
              </Button>
            </Box>
            <Box p={1}>
              <Button 
                className={classes.button}
                disabled={tableValueTaken} 
                variant="contained" 
                color="primary"
                type="submit"
                onClick={() => {
                  setTimeout(() => props.closeModal(), 1)
                }}
              >
                Save
              </Button>
            </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}



const useStyles = makeStyles((theme: Theme) => ({
  modalButtonsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  modalFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  selectStyle: {
    minWidth: "11rem",
  },
  formStyle: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
  }, 
  button: {
    width: '8rem'
  }
}));


export default EditTableModal; 