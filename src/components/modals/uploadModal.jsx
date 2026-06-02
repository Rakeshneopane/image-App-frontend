import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent } from "../ui/dialog.jsx";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { Button } from "../ui/button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { uploadImages } from "../../store/slices/imageSlice.js";
import { useState } from "react";

export default function UploadModal(){

    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState({
        type: "",
        size: "",
        name: "",
        tags: "",
        file: "",
    });
    const {albumsData: albums} = useSelector((state)=> state.albumSlice);
    const defaultAlbum = albums?.filter((album)=> album.name === "default"); 

    function handleFileChange(e){
        
        const file = e.target.files[0];
        
        const MAX_BYTES = 5 * 1024 * 1024;
        const acceptedName = ["jpeg", "png", "jpg", "webp",];
        if(file.size > MAX_BYTES){
            return alert("File size is more than 5 MB");
        }
        if(!acceptedName.includes(file.type.split("/")[1])){
            return alert("file not of image file type");
        }
        setImageFile((prev)=> (
            {...prev, 
            name: file.name,
            size: file.size,
            type: file.type,
            file,
         }));
    }

    function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("uploaded-image", imageFile.file);
        formData.append("name", imageFile.name);
        formData.append("size", imageFile.size);
        formData.append("tags", imageFile.tags.split(","));
        // formData.append("albumId", defaultAlbum[0]?._id);

        dispatch(uploadImages(formData));

    }

    return(
        <>            
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Upload image </DialogTitle>
                </DialogHeader>
                
                <Label>Select an image file to upload</Label>
                <Input type={"file"} onChange={(e)=>handleFileChange(e)} ></Input>
                <Label>Tags</Label>
                <Input placeholder={"tags"} name={"tags"} value={imageFile.tags} onChange={(e)=>setImageFile((prev)=>({...prev, tags: e.target.value}))}></Input>
                <Button onClick={(e)=>handleSubmit(e)} > Upload </Button>
            </DialogContent>
        </>
    );
}