import {
  Box,
  makeStyles,
  Modal,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
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
  handleAlert: (value: boolean, string: string) => void;
}

function EditMenuModal(props: IProps) {
  const classes = useStyles();
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
    event.preventDefault();
    props.handleAlert(true, "create");
    setTimeout(() => {
      props.isNewItem
        ? createNewMenuItem(newMenuItem)
        : updateItemData(props.menuItem.title, updatedMenuInfo);
      props.closeModal();
      props.handleAlert(false, "create");
    }, 1000);
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

  useEffect(() => {
    if (newMenuItem || updatedMenuInfo) {
      setImageIsUploaded(true);
    } else setImageIsUploaded(false);
  });

  if (!restaurantData) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Modal
      open={props.editOpen}
      onClose={props.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalFormContainer}>
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
                  return (
                    <MenuItem key={index} value={t}>
                      {t}
                    </MenuItem>
                  );
                }
              })}
            </TextField>

            <TextField
              id="title"
              required
              inputProps={{ maxLength: 30 }}
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
              inputProps={{ maxLength: 30 }}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              placeholder="Information"
              label="Information"
              defaultValue={props.isNewItem ? null : props.menuItem.description}
            />
            <TextField
              id="price"
              type="number"
              required
              inputProps={{ maxLength: 10 }}
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
                      : updatedMenuInfo
                      ? updatedMenuInfo.img
                      : props.menuItem.img
                  }
                  alt={
                    !imageIsUploaded ? "Uploaded background image" : undefined
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
                    props.handleAlert(false, "create");
                    props.closeModal();
                    setUpdatedMenuInfo(null);
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
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default EditMenuModal;
