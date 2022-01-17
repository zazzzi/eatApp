import { Box, Button, makeStyles, TextField, Theme } from "@material-ui/core";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase";

interface Iprops {
  setUrl: (url: string) => void;
  rId: string;
}

function FileUploadField(props: Iprops) {
  const [image, setImage] = useState<any>(null);
  const [imageURL, setImageURL] = useState<any>(null);
  const classes = useStyles();

  const onFileChange = (e: any) => {
    if (e.target.files[0] && e.target.files[0].size <= 5242880) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    const imgRef = ref(
      storage,
      `restaurantUploads/${props.rId}/${image!.name}`
    );
    await uploadBytes(imgRef, image).then((snapshot) => {
      console.log("File uploaded", snapshot);
    });

    getURL();
  };
  function getURL() {
    const imgRef = ref(
      storage,
      `restaurantUploads/${props.rId}/${image!.name}`
    );
    getDownloadURL(imgRef).then((url) => {
      props.setUrl(url);
    });
  }

  console.log(image);

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <input className="inputButton" type="file" onChange={onFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));

export default FileUploadField;
