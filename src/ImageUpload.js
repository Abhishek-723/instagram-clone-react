import  Button from '@material-ui/core/Button';
import React, { useState } from 'react'

function ImageUpload() {
    const [caption, setCaption] = useState(null);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');

    const handleChange = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleUpload = () => {

    }

    return (
        <div>
            <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange}/>

            <Button onChange={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
