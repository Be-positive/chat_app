import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  twitterSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";
import { useFormik } from "formik";
import { Alert, Button, InputGroup } from "reactstrap";

//react-toastify dependencies
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//style
import "../Style/style.css";
import { useAuth } from "../../redux/User/user.sagas";

const SignIn = () => {

  const {currentUser} = useAuth()

  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (currentUser) {      
      history.push("/");
    }
  }, [history, currentUser]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      try {
        setError("");
        const email = formik.values.email;
        const password = formik.values.password;
        dispatch(emailSignInStart({ email, password }));
        history.push("/")
      } catch {
        setError("invalid email or password");
      }
      alert(JSON.stringify(values, null, 2));
    },
  });

  const toggleBtn = () => {
    if (drop === false) {
      setDrop(true);
      setTypePassword("text");
    } else {
      setDrop(false);
      setTypePassword("password");
    }
  };

  const handleTwitterSignIn = () => {
    dispatch(twitterSignInStart());
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  return (
    <section id="loginForm">      
      <center className="form login">
        <h2>Welcome to WEHELP</h2>
        {error && (
          <Alert style={{ fontSize: "1.em" }} color="danger">
            {error}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="field input">
            <InputGroup>
              <label htmlFor="email">Email </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                placeholder="Enter email"
                onChange={formik.handleChange}
              />
            </InputGroup>
          </div>
          <div className="field input">
            <InputGroup>
              <label htmlFor="password">Password </label>
              <input
                type={typePassword}
                name="password"
                value={formik.values.password}
                placeholder="Enter password"
                onChange={formik.handleChange}
                className="password"
              />
            </InputGroup>
            <i
              onClick={toggleBtn}
              className={drop ? "fas fa-eye-slash" : "fas fa-eye"}
            />
          </div>

          <Button className="loginBtn" type="submit">
            Sign in <i className="fas fa-sign-in-alt" />
          </Button>
          <ToastContainer />
        </form>

        <h6>
          <Link to="/recovery" style={{ color: "#2A2A33" }}>
            {" "}
            Forgot your password?{" "}
          </Link>
        </h6>

        <div className="loginLink" style={{ fontSize: "1.3em" }}>
          Not yet have an account?{" "}
          <Link style={{ color: "#2A2A33" }} to="/signup">
            Sign up
          </Link>
        </div>
        <hr/>

        <h5> or connect with: </h5>

        <div className="socialSignin">
          <Button color="dark" onClick={handleTwitterSignIn}>
            Twitter <i className="fab fa-twitter" />
          </Button>
          <Button color="dark" onClick={handleGoogleSignIn}>
            Google <i className="fab fa-google" />
          </Button>
        </div>
      </center>
    </section>
  );
};

export default SignIn;
