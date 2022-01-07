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
} from "@material-ui/core";
import { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

interface IProps {
  closeModal: () => void;
  editOpen: boolean;
}

function EditMenuModal(props: IProps) {
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Dryck");

  const tabs: Array<string> = ["Dryck", "Mat", "Snacks", "Cocktails", "Beer"];

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

  const handleChange = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setCategory(event.target.value);
  };

  return (
    <Modal
      open={props.editOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box className={classes.modalFormContainer}>
          <form className={classes.formStyle} action="">
            <TextField
              select
              variant="outlined"
              onChange={handleChange}
              label="Kategori"
              value={category}
              margin="normal"
              placeholder="Kategori"
              className={classes.selectStyle}
            >
              {tabs.map((t) => {
                return <MenuItem value={t}>{t}</MenuItem>;
              })}
            </TextField>

            <TextField variant="outlined" margin="normal" placeholder="Titel" />
            <TextField
              variant="outlined"
              margin="normal"
              placeholder="Information"
            />
            <TextField variant="outlined" margin="normal" placeholder="Pris" />
            <TextField
              variant="outlined"
              helperText="Lägg till ny kategori"
              margin="normal"
              placeholder="Ny kategori"
            />
          </form>
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
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
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

export default EditMenuModal;
