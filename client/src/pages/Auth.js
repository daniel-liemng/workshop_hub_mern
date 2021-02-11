import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    width: 400,
    height: "auto",
    margin: "3rem auto",
    padding: "1rem",
  },
}));

const Auth = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </Box>
    );
  };
  return (
    <Paper elevation={2} className={classes.paperStyle}>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        onChange={handleChange}
        aria-label='disabled tabs example'
      >
        <Tab label='Sign In' />

        <Tab label='Sign Up' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup handleChange={handleChange} />
      </TabPanel>
    </Paper>
  );
};

export default Auth;
