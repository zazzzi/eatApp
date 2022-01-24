import {
  Box,
  makeStyles,
  Modal,
  TextField,
  Button,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { MenuItemType } from "../../types/types";
import DeleteIcon from "@material-ui/icons/Delete";
import { MenuContext } from "../../context/MenusContext";
import FileUploadField from "./FileUploadField";
interface IProps {
  closeModal: () => void;
  editOpen: boolean;
  menuItem: MenuItemType;
  isNewItem: boolean;
}

function EditMenuModal(props: IProps) {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [updatedMenuInfo, setUpdatedMenuInfo] = useState<any>();
  const [newMenuItem, setNewMenuItem] = useState<any>({});
  const [imageIsUploaded, setImageIsUploaded] = useState<boolean>(false);

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
    bgcolor: "#FEFEFE",
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
    props.closeModal();
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
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    if (newMenuItem || updatedMenuInfo) {
      setImageIsUploaded(true);
    } else setImageIsUploaded(false);
  });

  if(!restaurantData){
    return <></>
  }

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
              {restaurantData.categories.map((t: any, index: number) => {
                if (t !== "Alla") {
                  return <MenuItem key={index} value={t}>{t}</MenuItem>;
                }
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
            {imageIsUploaded ? (
              <Box display="flex" justifyContent="center">
                <img
                  className={classes.backgroundImage}
                  src={
                    imageIsUploaded && props.isNewItem
                      ? newMenuItem.img
                      : props.menuItem.img
                  }
                />
              </Box>
            ) : null}
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

const useStyles = makeStyles(() => ({
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
  backgroundImage: {
    maxHeight: "10rem",
  },
}));

export default EditMenuModal;
