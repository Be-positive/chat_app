import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  resetPasswordStart,
  resetUserState,
} from "../../redux/User/user.actions";
import { Alert, InputGroup, Button } from "react-bootstrap";
import { useFormik } from "formik";

// style
import "../Style/style.css";

// react-toastify dependencies
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const EmailPassword = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess, history, dispatch]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setError(userErr);
    }
  }, [userErr]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit(values) {
      try {
        setError("");
        const email = formik.values.email;
        dispatch(
          resetPasswordStart({
            email,
          })
        );
      } catch {
        setError("Failed to reset password");
      }
      toast.success("Check your email for further instruction", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section id="loginForm">
      <center className="form login">
        
        {error && <Alert color="danger"> {error} </Alert>}

        <form onSubmit={formik.handleSubmit}>
          <div className="field input">
            <InputGroup>
              <label htmlFor="email">Email </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </InputGroup>
          </div>

          <Button className="loginBtn" type="submit">
            Send link <i className="fas fa-solid fa-paper-plane"/>
          </Button>
          <ToastContainer />
        </form>
        <hr/>

        <div className="links">
          <Link to="/login" style={{ color: "#f6f6f6" }}>
            Sign in
          </Link>
          {` | `}
          <Link to="/signup" style={{ color: "#f6f6f6" }}>
            Sign up
          </Link>
        </div>
      </center>
    </section>
  );
};

export default EmailPassword;
