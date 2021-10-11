import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { Alert, Button, InputGroup } from "reactstrap";
import { updatePasswordStart } from "../../redux/User/user.actions";
import { signOutUserStart } from "../../redux/User/user.actions";
import { useAuth } from "../../redux/User/user.sagas";

// react-toastify dependencies
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {

  const history = useHistory();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [drop, setDrop] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
      password: "",
    },
    async onSubmit(values) {
      try {
        const promises = [];
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Пароли не совпадают");
        }
        const password = passwordRef.current.value;
        if (passwordRef.current.value) {
          promises.push(dispatch(updatePasswordStart({ password })));
        }
        await Promise.all(promises).then(() => {
          dispatch(signOutUserStart());
          history.push("/login");
        });
      } catch (error) {
        console.log(error);
        setError("Failed to change password");
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

  return (
    <section id="loginForm">
      <center className="form login">
        {error && (
          <Alert style={{ fontSize: "1.2em" }} color="danger">
            {error}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <h3>email: {currentUser.email}</h3>

          <div className="field input">
            <InputGroup>
              <label htmlFor="newPassword"> Password </label>
              <input
                ref={passwordRef}
                className="newPassword"
                name="password"
                type={typePassword}
                placeholder="Enter new password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={formik.handleChange}
              />
            </InputGroup>
            <i
              onClick={toggleBtn}
              className={drop ? "fas fa-eye-slash" : "fas fa-eye"}
            />
          </div>
          {formik.values.password ? (
            <p className="passwordValid">
              the password must be at least 8 characters long and
              contain uppercase and lowercase letters and numbers
            </p>
          ) : null}
          <div className="field input">
            <InputGroup>
              <label htmlFor="newPasswordConfirm"> Password confirm </label>
              <input
                ref={passwordConfirmRef}
                className="newPasswordConfirm"
                name="newPasswordConfirm"
                type={typePassword}
                placeholder="Confirm password"
              />
            </InputGroup>
            <i
              onClick={toggleBtn}
              className={drop ? "fas fa-eye-slash" : "fas fa-eye"}
            />
          </div>
          <Button className="loginBtn" type="submit">
            {" "}
            Update password <i className="fas fa-edit" />
          </Button>
          <ToastContainer />
        </form>
        <div className="links">
          <Link to="/login" style={{ color: "#f6f6f6" }}>
            cancel
          </Link>
        </div>
      </center>
    </section>
  );
};

export default UpdatePassword;
