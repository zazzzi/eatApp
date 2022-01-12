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
import { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

interface Iprops {
  closeModal: () => void;
  editOpen: boolean;
}

function EditTableModal(props: Iprops) {
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [tableValue, setTableValue] = useState<number>()

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

  const handleSubmit = (event: any) => {
    event.preventDefault()
    //set up a loading response
    setTableValue(event.target.value)
    console.log(event.target.value)
  };

  return (
    <Modal
      open={props.editOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <form className={classes.formStyle} onSubmit={handleSubmit}>
        <Box className={classes.modalFormContainer}>
        <Typography variant="h4"><b>Bordsnummer</b></Typography>
          <TextField
              type="number"
              variant="outlined"
              margin="normal"
              placeholder={"Nummer"}
              label="Nummer"
            />
          
        </Box>
        <Box mt={2} className={classes.modalButtonsContainer}>
          <Box p={2}>
            <Button
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
          <Box p={2}>
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              onClick={() => {
                props.closeModal();
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
        </form>
      </Box>
    </Modal>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  modalButtonsContainer: {
    display: "flex",
    width: "20%",
    justifyContent: "space-around",
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
    flexDirection: "column",
  },
}));


export default EditTableModal; 