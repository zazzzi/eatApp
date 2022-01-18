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
  Snackbar,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { forwardRef, useContext, useEffect, useState } from "react";
import { MenuItemType } from "../../types/types";

import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { MenuContext } from "../../context/MenusContext";
import FileUploadField from "./FileUploadField";
import CustomizedSnackbars from "../menu/Alert";
import ClickAwayListener from "@mui/material/ClickAwayListener";

interface IProps {
  closeModal: () => void;
  editOpen: boolean;
  menuItem: MenuItemType;
  isNewItem: boolean;
}

function EditMenuModal(props: IProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [imgURL, setImgURL] = useState<string>("");
  const [alertPosition, setAlertPosition] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const [updatedMenuInfo, setUpdatedMenuInfo] = useState<any>();
  const [newMenuItem, setNewMenuItem] = useState<any>({});

  const { restaurantData, updateItemData, createNewMenuItem } =
    useContext(MenuContext);

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

  function updateMenuInfo(id: string, value: string) {
    setUpdatedMenuInfo({
      ...updatedMenuInfo,
      [id]: value,
    });
  }

  function createNew(key: string, value: string) {
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const uniqid = randLetter + Date.now();
    setNewMenuItem({
      ...newMenuItem,
      [key]: value,
      id: uniqid,
    });
  }

  function handleChange(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    if (!event.target.id) {
      updateMenuInfo(event.target.name, event.target.value);
      createNew(event.target.name, event.target.value);
    } else {
      updateMenuInfo(event.target.id, event.target.value);
      createNew(event.target.id, event.target.value);
    }
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    setOpenAlert(true);
    event.preventDefault();
    props.isNewItem
      ? createNewMenuItem(newMenuItem)
      : updateItemData(props.menuItem.title, updatedMenuInfo);
  };

  const setURL = (url: string) => {
    setNewMenuItem({
      ...newMenuItem,
      img: url,
    });
    setUpdatedMenuInfo({
      ...updatedMenuInfo,
      img: url,
    });
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Modal
      open={props.editOpen}
      onClose={props.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalFormContainer}>
        <Snackbar
          open={openAlert}
          autoHideDuration={20000}
          message={props.isNewItem ? "Produkt skapad!" : "Produkt uppdaterad!"}
          onClose={handleAlertClose}
        />
        <Box sx={style}>
          <form
            autoComplete={"off"}
            onSubmit={handleSubmit}
            className={classes.formStyle}
            action=""
          >
            <TextField
              select
              required
              name="category"
              variant="outlined"
              onChange={handleChange}
              label="Kategori"
              defaultValue={props.isNewItem ? [] : props.menuItem.category}
              margin="normal"
              placeholder="Kategori"
              className={classes.selectStyle}
              SelectProps={{
                multiple: true,
                id: "category",
              }}
            >
              {restaurantData.categories.map((t: any) => {
                return <MenuItem value={t}>{t}</MenuItem>;
              })}
            </TextField>

            <TextField
              id="title"
              required
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              placeholder={"Titel"}
              label="Titel"
              defaultValue={props.isNewItem ? null : props.menuItem.title}
            />
            <TextField
              id="description"
              required
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              placeholder="Information"
              label="Information"
              defaultValue={props.isNewItem ? null : props.menuItem.description}
            />
            <TextField
              id="price"
              required
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              placeholder="Pris"
              label="Pris"
              defaultValue={props.isNewItem ? null : props.menuItem.price}
            />
            <FileUploadField setUrl={setURL} rId={restaurantData.rID} />
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
                <Button type="submit" variant="contained" color="primary">
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
