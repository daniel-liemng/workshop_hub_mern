import React, { useEffect, useState } from "react";
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

import user1Photo from "../assets/user1.jpg";
import { useAppContext } from "../context/AppContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "2rem 2rem",
  },
  avatar: {
    width: "10rem",
    height: "10rem",
    margin: "2rem auto",
    position: "relative",
  },
  imgInput: {
    display: "none",
  },
}));

const Profile = () => {
  const classes = useStyles();

  const { uploadAvatarPhoto, getMyProfile, profile, loading } = useAppContext();

  const [fileInputState, setFileInputState] = useState("");
  // const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  // const [myProfile, setMyProfile] = useState(null);

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

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    if (!previewSource) return;

    uploadImage(previewSource);
  };

  const uploadImage = (base64EncodedImage) => {
    console.log(base64EncodedImage);

    uploadAvatarPhoto(base64EncodedImage);
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  if (!profile) {
    return <h2>Loading</h2>;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant='h5' align='center'>
              Profile
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={4} lg={3}>
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
              <Button
                variant='contained'
                color='primary'
                type='submit'
                style={{ letterSpacing: "2px" }}
              >
                Apply avatar
              </Button>
            </form>

            {previewSource && (
              <img src={previewSource} alt='abc' style={{ height: "300px" }} />
            )}
          </Grid>
          <Grid item xs={12} sm={8} lg={9}>
            266
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
