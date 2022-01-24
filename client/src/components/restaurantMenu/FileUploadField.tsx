import {
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { storage } from "../../firebase";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

interface Iprops {
  setUrl: (url: string) => void;
  rId: string;
}

function FileUploadField(props: Iprops) {
  const [image, setImage] = useState<any>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = (_event: any) => {
    if (hiddenFileInput && hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

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

  return (
    <Box
      mt={2}
      mb={2}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <input
        ref={hiddenFileInput}
        style={{ display: "none" }}
        className="inputButton"
        type="file"
        onChange={onFileChange}
      />
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Button onClick={handleClick}>
          <PhotoCamera />
        </Button>
        {image ? <Typography>{image.name}</Typography> : null}
      </Box>
      <Box mt={2}>
        <Button variant="outlined" size="small" onClick={handleUpload}>
          Ladda upp
        </Button>
      </Box>
    </Box>
  );
}

export default FileUploadField;
