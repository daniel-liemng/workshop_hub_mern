import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    padding: "1rem",
    margin: "1rem auto",
  },
  avatarStyle: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: "0.7rem",
  },
  btnStyle: {
    margin: "1rem 0",
  },
  linkStyle: {
    textDecoration: "none !important",
    cursor: "pointer",
  },
}));

const Login = ({ handleChange }) => {
  const classes = useStyles();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <Grid className={classes.rootStyle}>
      <Grid align='center'>
        <Avatar className={classes.avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Sign In</Typography>
      </Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form noValidate>
            <Field
              as={TextField}
              label='Email'
              name='email'
              placeholder='Enter email'
              fullWidth
              required
              helperText={<ErrorMessage name='email' />}
            />
            <Field
              as={TextField}
              label='Password'
              name='password'
              placeholder='Enter password'
              type='password'
              fullWidth
              required
              helperText={<ErrorMessage name='password' />}
            />

            <Button
              type='submit'
              color='primary'
              variant='contained'
              disabled={props.isSubmitting}
              className={classes.btnStyle}
              fullWidth
            >
              {props.isSubmitting ? "Loading" : "Sign in"}
            </Button>
          </Form>
        )}
      </Formik>

      <Typography>
        Don't have an account?
        <Link
          onClick={() => handleChange("event", 1)}
          className={classes.linkStyle}
        >
          {" "}
          Sign Up
        </Link>
      </Typography>
    </Grid>
  );
};

export default Login;
