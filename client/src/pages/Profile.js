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

import { useAppContext } from "../context/AppContext";
import ProfileAvatar from "../components/profile/ProfileAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "2rem 2rem",
  },
  pageTitle: {
    margin: "1.5rem auto",
  },
}));

const Profile = () => {
  const classes = useStyles();

  const { getMyProfile, profile, loading } = useAppContext();

  useEffect(() => {
    getMyProfile();
  }, []);

  if (!profile || loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid>
          <Typography variant='h4' align='center' className={classes.pageTitle}>
            Profile
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={4} lg={3}>
            <ProfileAvatar />
          </Grid>
          <Grid item xs={12} sm={8} lg={9}>
            <Button variant='contained' color='secondary'>
              Create Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
