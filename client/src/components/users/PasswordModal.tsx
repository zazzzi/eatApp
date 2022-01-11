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
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { UserAuthContext } from "../../context/UsersContext";

interface IProps {
  closeModal: () => void;
  editOpen: boolean;
}

function PasswordModal(props: IProps) {
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [password1, setPassword1] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const { updateUserPassword } = useContext(UserAuthContext);

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
    if (event.target.id === "password1") {
      setPassword1(event.target.value);
    } else {
      setPassword2(event.target.value);
    }
  };

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (password1 && password1 === password2) {
      updateUserPassword(password1);
      props.closeModal()
    }
  }

  return (
    <Modal
      open={props.editOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box className={classes.modalFormContainer}>
          <form onSubmit={handleSubmit} className={classes.formStyle} action="">
            <Typography>Byt ditt lösenord:</Typography>
            <TextField
              id="password1"
              variant="outlined"
              margin="normal"
              placeholder="Lösenord"
              onChange={handleChange}
            />
            <TextField
              id="password2"
              variant="outlined"
              margin="normal"
              placeholder="Upprepa lösenord"
              onChange={handleChange}
            />
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
                  Avbryt
                </Button>
              </Box>
              <Box p={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Spara
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

export default PasswordModal;
