import { Box, Button, makeStyles, TextField, Theme } from "@material-ui/core";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase";

interface Iprops {}

function FileUploadField(props: Iprops) {
    const [image, setImage] = useState<any>(null)
    const [imageURL, setImageURL] = useState<any>(null)
  const onFileChange = (e: any) => {
    if (e.target.files[0]){
        setImage(e.target.files[0])
    }
  };
  const handleUpload = () => {
      const imgRef = ref(storage, `uploads/${image!.name}`)
        uploadBytes(imgRef, image).then((snapshot)=>{
            console.log("File uploaded", snapshot);
        })



        getDownloadURL(imgRef).then((url) => {
           console.log(url);
           
        })
  };
  function test (){
    const imgRef = ref(storage, `uploads/${image!.name}`)
    getDownloadURL(imgRef).then((url) => {
        console.log(url);
        
     })
  }

  console.log(image);
  

  return (
    <Box>
        <input type="file" onChange={onFileChange} />
        <Button onClick={handleUpload}>Upload</Button>
        <Button onClick={test}>get url</Button>
        <p>{imageURL}</p>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));

export default FileUploadField;