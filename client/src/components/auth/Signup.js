import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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

const Signup = ({ handleChange }) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password is at least 6 characters long")
      .matches(
        passwordRegExp,
        "Password must have one uppercase, lowercase, number, special symbol"
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not match")
      .required("Required"),
    terms: Yup.boolean().oneOf([true], "Please accept the terms & conditions"),
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
          <AddCircleOutlineOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Sign Up</Typography>
        <Typography variant='caption' gutterBottom>
          Please fill this form to create an account !
        </Typography>
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
              label='Name'
              name='name'
              placeholder='Enter name'
              fullWidth
              required
              helperText={<ErrorMessage name='name' />}
            />

            <Field
              as={TextField}
              label='Email'
              name='email'
              placeholder='Enter email'
              fullWidth
              required
              helperText={<ErrorMessage name='email' />}
            />

            <FormControl fullWidth required>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Field
                as={Input}
                id='password'
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Enter password'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormHelperText>
              <ErrorMessage name='password' />
            </FormHelperText>

            <FormControl fullWidth required>
              <InputLabel htmlFor='confirmPassword'>
                Confirm Password
              </InputLabel>
              <Field
                as={Input}
                id='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                placeholder='Enter confirm password'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormHelperText>
              <ErrorMessage name='confirmPassword' />
            </FormHelperText>

            <FormControlLabel
              control={<Field as={Checkbox} name='terms' />}
              label='I accept the terms and conditions'
              style={{ marginTop: "1rem" }}
            />
            <FormHelperText>
              <ErrorMessage name='terms' />
            </FormHelperText>

            <Button
              type='submit'
              color='primary'
              variant='contained'
              disabled={props.isSubmitting}
              className={classes.btnStyle}
              fullWidth
            >
              {props.isSubmitting ? "Loading" : "Sign Up"}
            </Button>
          </Form>
        )}
      </Formik>

      <Typography>
        Already have an account?
        <Link
          onClick={() => handleChange("event", 0)}
          className={classes.linkStyle}
        >
          {" "}
          Sign In
        </Link>
      </Typography>
    </Grid>
  );
};

export default Signup;
