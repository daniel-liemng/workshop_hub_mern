import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { useAppContext } from "../../context/AppContext";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "10rem",
    height: "10rem",
    margin: "2rem auto",
  },
  imgInput: {
    display: "none",
  },
  preview: {
    margin: "1rem",
  },
  previewAvatar: {
    width: "10rem",
    height: "10rem",
    margin: "1rem auto",
  },
}));

const ProfileAvatar = () => {
  const classes = useStyles();

  const { uploadAvatarPhoto, profile, loading } = useAppContext();

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    // preview file after choose phto
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Apply avatar photo change
  const handlePhotoSubmit = (e) => {
    e.preventDefault();

    if (!previewSource) return;

    uploadImage(previewSource);
  };

  const uploadImage = (base64EncodedImage) => {
    uploadAvatarPhoto(base64EncodedImage);
  };

  return (
    <div>
      <Typography variant='h5' align='center'>
        {profile.user.name}
      </Typography>
      <Avatar src={profile.avatar} className={classes.avatar} />
      <form onSubmit={handlePhotoSubmit}>
        <div>
          <input
            accept='image/*'
            className={classes.imgInput}
            id='icon-button-file'
            type='file'
            value={fileInputState}
            onChange={handleFileInputChange}
          />
          <label htmlFor='icon-button-file'>
            <Button
              variant='contained'
              color='primary'
              startIcon={<PhotoCamera />}
              component='span'
              type='button'
            >
              Upload photo
            </Button>
          </label>
        </div>

        {previewSource && (
          <div className={classes.preview}>
            <Typography variant='body1'>Preview</Typography>
            <Avatar src={previewSource} className={classes.previewAvatar} />
          </div>
        )}

        <Button
          variant='contained'
          color='primary'
          type='submit'
          style={{ marginTop: "1rem" }}
        >
          Apply avatar
        </Button>
      </form>
    </div>
  );
};

export default ProfileAvatar;
