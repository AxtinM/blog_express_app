import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ProfileCircle,
  ProfileImage,
  ProfileMenuWrapper,
  Name,
  InsideMenuWrapper,
  Element,
  ButtonChangeImg,
} from "./ProfileComponents";
import { useSpring } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../features/useSlices";
import { logout } from "../../../features/useSlices";
import { authClient } from "../../../client";
import { clearStorage } from "../../../app/store";
import { ToastContainer } from "react-toastify";
import Notification from "../../popup/Notification";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import configData from "../../../config";

const ProfileImg = `${configData.BASE_URL}/images/profile/default.png`;

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

function Profile() {
  const [profileMenu, setProfileMenu] = useState(false);
  const [isImage, setIsImage] = useState(false);
  // eslint-disable-next-line
  const [width, height] = useWindowSize();

  const ProfileMenuSpring = useSpring({
    transform: profileMenu ? "translateY(5.5em)" : "translateY(-25em)",
    opacity: profileMenu ? "1" : "0",
    height: profileMenu ? "18em" : "0",
    display: "block",
  });

  const user = useSelector(selectUser);
  const [imageUrl, setImageUrl] = useState(ProfileImg);

  useEffect(() => {
    setProfileMenu(false);
  }, [width]);

  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      // eslint-disable-next-line
	const res = await authClient.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${user.user.token}` },
        }
      );
<<<<<<< HEAD
=======
      // const data = await res.data;
>>>>>>> 8f19dec44d6086bad07930a4e250f8a3d52cb8dd
      dispatch(logout());
      await clearStorage();
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logout());
        await clearStorage();
        Notification("error", "You are not authorized to do this");
      } else {
        console.log("error logging out !");
      }
    }
  };
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("file", imageUrl);

      const res = await authClient.post("/update_image", formData, {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      });
      const data = await res.data;
      return data;
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logout());
        await clearStorage();
        Notification("error", "You are not authorized to do this");
      } else {
        console.log("err : ", err);
      }
    }
  };

  useEffect(() => {
    if (user.user.image) {
      setImageUrl(user.user.image.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isImage === true) {
      handleUpdate()
        .then((res) => {
          setImageUrl(res.image);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsImage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImage]);

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
      <ProfileMenuWrapper style={ProfileMenuSpring}>
        <InsideMenuWrapper>
          <Name>{user.user.username}</Name>
          <Element text={user.user.email} label="Email" />
          <Element text={user.user.name} label="Name" />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageUrl(file);
              setIsImage(true);
            }}
          />

          <ButtonChangeImg
            style={{ bottom: "4em" }}
            onClick={() => {
              inputRef.current.click();
              Notification("success", "Image updated");
            }}
          >
            Upload
          </ButtonChangeImg>
          <ButtonChangeImg
            onClick={() => {
              handleLogout();
              // window.location.reload();
            }}
          >
            LogOut
          </ButtonChangeImg>
        </InsideMenuWrapper>
      </ProfileMenuWrapper>
      <ProfileCircle
        onClick={() => {
          setProfileMenu(!profileMenu);
        }}
      >
        <ProfileImage src={imageUrl} />
      </ProfileCircle>
    </>
  );
}

export default Profile;
