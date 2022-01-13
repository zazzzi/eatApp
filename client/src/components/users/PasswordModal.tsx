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
  Input,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [matching, setMatching] = useState(true);

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
      props.closeModal();
    } else {
      setMatching(false);
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
            <OutlinedInput
              className={classes.inputField}
              id="password1"
              placeholder="Lösenord"
              required
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <OutlinedInput
              className={classes.inputField}
              required
              id="password2"
              placeholder="Lösenord"
              onChange={handleChange}
              error={!matching}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="password2">{!matching ? "Lösenorden matchar inte." : ""}</FormHelperText>
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
                <Button type="submit" variant="contained" color="primary">
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
  inputField: {
    margin: "0.5rem 0",
  },
}));

export default PasswordModal;
