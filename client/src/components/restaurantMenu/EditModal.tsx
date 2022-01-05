import { Box, makeStyles, Theme, Modal, TextField, Button, Select, MenuItem} from "@material-ui/core";
import { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';


interface IProps {
	closeModal: () => void;
	editOpen: boolean;
  }

function EditMenuModal(props: IProps) {
	const classes = useStyles()
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [open, setOpen] = useState(false);

	const tabs: Array<string> = ["Dryck", "Mat", "Snacks", "Cocktails", "Beer"]

	const style = {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: "space-around",
		alignItems: 'center',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '70vw',
		bgcolor: '#FEFEFE',
		border: '2px solid #000',
		borderRadius: "30px",
		boxShadow: 24,
		p: 4,
	  };

	  //   const uploadImage = (e: any) => {
//     const formData = new FormData();
//     formData.append("img", e.target.files[0]);
//     fetch("/image", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         Accept: "multipart/form-data; boundary=Row",
//       },
//       body: formData,
//     }).then((res) =>
//       res.json().then((result) => {
//         if (result.errorCode) {
//           console.log({ result });
//         }
//       })
//     );
//   };

  return (
	<Modal
		open={props.editOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
			<TextField
				type="file"
				// className={classes.input}
				style={{ display: 'none' }}
				id="raised-button-file"
				// onChange={uploadImage}
			/>
			<label htmlFor="raised-button-file">
				<Button variant="contained" component="span">
				<AddIcon/>
					Upload image
				</Button>
			</label> 
			<Box className={classes.modalFormContainer}>
				<TextField margin="normal" placeholder="Titel"></TextField>
				<TextField margin="normal" placeholder="Information"></TextField>
				<TextField margin="normal" placeholder="Pris"></TextField>
					<Select label={'Dryck'}>
					{
						tabs.map((t) => {
							return <MenuItem value={t}>{t}</MenuItem>

						}
						)
					}
					</Select>
				<TextField margin="normal" placeholder="Kategori"></TextField>
			</Box>
		  <Box mt={2} className={classes.modalButtonsContainer}>
			<Button>Save</Button>
			<Button onClick={() => {
                props.closeModal();
                
              }}>Cancel</Button>
		  </Box>
        </Box>
      </Modal>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
	modalButtonsContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
	},
	modalFormContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%"
	}
}));


export default EditMenuModal; 