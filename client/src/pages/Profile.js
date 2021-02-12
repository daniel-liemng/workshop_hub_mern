import React from "react";
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
          <Grid item xs={12} sm={4} lg={3} alignItems='center'>
            <Avatar src={user1Photo} className={classes.avatar} />
            <div>
              <input
                accept='image/*'
                className={classes.imgInput}
                id='icon-button-file'
                type='file'
              />
              <label htmlFor='icon-button-file'>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<PhotoCamera />}
                  component='span'
                >
                  Upload photo
                </Button>
              </label>
            </div>
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
