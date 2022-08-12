import { useState } from "react";
import { useSpring } from "react-spring";
import {
  ModalMenuWrapper,
  ModalTitle,
  ModalBtn,
  ModalCrossWrapper,
  ModalCrossStick,
} from "./ModalComponents";

import LabelInputComponent from "./LabelInputComponent";

import "../../styles/modal.css";

// redux
import { useDispatch } from "react-redux";
import { handleError, login } from "../../features/useSlices";

// client
import { authClient } from "../../client";

import { ToastContainer } from "react-toastify";
import Notification from "../popup/Notification";

function AuthModalMenu({
  springStyle1,
  setRegisterBtn,
  registerBtn,
  setLoginBtn,
  loginBtn,
}) {
  // react-spring
  const [cross, setCross] = useState(false);

  const CrossSpring = useSpring({
    transform: cross ? "rotate(360deg)" : "rotate(0deg)",
  });

  // redux
  const dispatch = useDispatch();

  // client functions
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (email, password) => {
    const res = await authClient.post("/login", { email, password });
    const data = await res.data;
    return data;
  };

  const handleRegister = async (email, password, username, name) => {
    const res = await authClient.post("/register", {
      email: email,
      password: password,
      username: username,
      name: name,
    });
    const data = await res.data;
    return data;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalMenuWrapper style={springStyle1}>
        <div className="header-modal-wrapper">
          {loginBtn ? (
            <ModalTitle>Login</ModalTitle>
          ) : (
            <ModalTitle
              style={{
                flexGrow: 2,
              }}
            >
              Create Account
            </ModalTitle>
          )}
          <ModalCrossWrapper
            style={CrossSpring}
            onMouseEnter={() => {
              setCross(true);
            }}
            onMouseLeave={() => {
              setCross(false);
            }}
            onClick={() => {
              setRegisterBtn(false);
              setLoginBtn(false);
            }}
          >
            {/* @ts-ignore */}
            <ModalCrossStick transform="translateY(2px) rotate(45deg)" />
            {/* @ts-ignore */}
            <ModalCrossStick transform="translateY(-2px) rotate(-45deg)" />
          </ModalCrossWrapper>
        </div>
        {loginBtn ? (
          <>
            <div className="label-input-wrapper">
              <LabelInputComponent
                label="Email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                text={undefined}
                sm={undefined}
              />
            </div>
            <div className="label-input-wrapper">
              <LabelInputComponent
                placeholder="***********"
                label="Password"
                type="password"
                text="Did You Forget Your Password?"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                sm={undefined}
              />
            </div>
            <div className="button-modal-wrapper">
              <ModalBtn
                style={{ color: "#FF2E63" }}
                onClick={async () => {
                  try {
                    const res = await handleLogin(email, password);
                    dispatch(login({ user: res.user, isLoggedIn: true }));
                    Notification("success", "Login Successful");
                  } catch (err) {
                    dispatch(handleError(err.response.data.message));
                    Notification("error", err.response.data.message);
                  }
                }}
              >
                Login
              </ModalBtn>
              <ModalBtn
                onClick={() => {
                  setRegisterBtn(!registerBtn);
                  setLoginBtn(!loginBtn);
                  setEmail("");
                  setPassword("");
                }}
              >
                Register
              </ModalBtn>
            </div>
          </>
        ) : (
          <>
            <div className="label-input-wrapper">
              <LabelInputComponent
                label="Name"
                placeholder="John Davidson"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type={undefined}
                text={undefined}
                sm={undefined}
              />
            </div>
            <div className="label-input-wrapper">
              <LabelInputComponent
                label="Alias"
                placeholder="TheDarkNight"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type={undefined}
                text={undefined}
                sm={undefined}
              />
            </div>
            <div className="label-input-wrapper">
              <LabelInputComponent
                label="Email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                text={undefined}
                sm={undefined}
              />
            </div>
            <div className="label-input-wrapper">
              <LabelInputComponent
                placeholder="***********"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                text={undefined}
                sm={undefined}
              />
            </div>
            <div className="button-modal-wrapper">
              <ModalBtn
                style={{ color: "#FF2E63" }}
                onClick={async () => {
                  try {
                    await handleRegister(email, password, username, name);
                    setRegisterBtn(!registerBtn);
                    setLoginBtn(!loginBtn);
                    setEmail("");
                    setPassword("");
                    setUsername("");
                    setName("");
                    Notification("success", "Account Created Successfully");
                  } catch (err) {
                    dispatch(handleError(err.response.data.message));
                    Notification("error", err.response.data.message);
                  }
                }}
              >
                Register
              </ModalBtn>
              <ModalBtn
                onClick={() => {
                  setRegisterBtn(!registerBtn);
                  setLoginBtn(!loginBtn);
                  setEmail(null);
                  setPassword(null);
                  setUsername(null);
                  setName(null);
                }}
              >
                Login
              </ModalBtn>
            </div>
          </>
        )}
      </ModalMenuWrapper>
    </>
  );
}

export default AuthModalMenu;
