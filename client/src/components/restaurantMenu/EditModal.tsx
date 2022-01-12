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
import { useContext, useEffect, useState } from "react";
import { MenuItemType } from "../../types/types";

import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { MenuContext } from "../../context/MenusContext";

interface IProps {
  closeModal: () => void;
  editOpen: boolean;
  menuItem: MenuItemType;
  isNewItem: boolean;
}

function EditMenuModal(props: IProps) {
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [updatedMenuInfo, setUpdatedMenuInfo] = useState<any>();
  const { restaurantData, updateItemData } = useContext(MenuContext);

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

  function handleChange(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    if (!event.target.id) {
      updateMenuInfo(event.target.name, event.target.value);
    } else {
      updateMenuInfo(event.target.id, event.target.value);
    }
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateItemData(props.menuItem.title, updatedMenuInfo);
  };

  function test(event: any) {
    console.log(event);
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
            {/* <TextField
              variant="outlined"
              margin="normal"
              defaultValue={null}
              placeholder="Ny kategori"
              label="Skapa ny kategori"
            /> */}
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
