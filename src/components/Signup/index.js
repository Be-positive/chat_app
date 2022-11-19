import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { signUpUserStart } from "../../redux/User/user.actions";
import { useFormik } from "formik";
import { Alert, Button, InputGroup } from "reactstrap";
import { useAuth } from "../../redux/User/user.sagas";

// react-toastify dependencies
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [typePassword, setTypePassword] = useState("password");
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      displayName: "",
      photoURL: "",
    },
    onSubmit(values) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Пароли не совпадают");
      }
      try {
        setError("");
        const displayName = formik.values.displayName;
        const email = formik.values.email;
        const password = formik.values.password;
        const photoURL = formik.values.photoURL;
        dispatch(
          signUpUserStart({      
            displayName,      
            email,
            password,
            photoURL,
          })
        );
        toast.success("Signup success", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch {
        setError("Failed to create account");
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
        <h2>Welcome to Helpsy</h2>
        {error && (
          <Alert style={{ fontSize: "1.2em" }} color="danger">
            {error}
          </Alert>
        )}
        <form action="#" onSubmit={formik.handleSubmit}>   

         <div className="field input">
            <InputGroup>
              <label htmlFor="displayName">Name </label>
              <input
                type="text"
                name="displayName"
                value={formik.values.displayName}
                placeholder="Full name"
                onChange={formik.handleChange}
              />
            </InputGroup>
          </div>      

          <div className="field input">
            <InputGroup>
              <label htmlFor="email">Email </label>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Email"
                required
              />
            </InputGroup>
          </div>
          <div className="field input">
            <InputGroup>
              <label htmlFor="password">Password </label>
              <input
                ref={passwordRef}
                className="password"
                name="password"
                type={typePassword}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Create password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
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
              <label htmlFor="password-confirm">Confirm Password</label>
              <input
                ref={passwordConfirmRef}
                className="password"
                id="password-confirm"
                name="password-confirm"
                type={typePassword}
                placeholder="Confirm password"
                required
              />
            </InputGroup>
            <i
              onClick={toggleBtn}
              className={drop ? "fas fa-eye-slash" : "fas fa-eye"}
            />
          </div>
          <div className="avatar" >
            <InputGroup>
              <label htmlFor="photoURL">Avatar</label>
              <input
                //maybe type "file" instead "image"?
                type="file"
                name="photoURL"
                //maybe "src" instead "value"?
                accept="image/jpeg,image/png,image/gif"
                // value={formik.values.photoURL}
                src={formik.values.photoURL}
                placeholder="your avatar"
                onChange={formik.handleChange}                
                required
              />
            </InputGroup>
          </div>
          <br/>
          <Button color="secondary" className="loginBtn" type="submit">
            Register <i className="fas fad fa-angle-double-right" />
          </Button>
          <ToastContainer />
        </form>
        <div className="loginLink" style={{ fontSize: "1.1em" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#302929" }}>
            Sign in
          </Link>
        </div>
      </center>
    </section>
  );
};

export default Signup;
