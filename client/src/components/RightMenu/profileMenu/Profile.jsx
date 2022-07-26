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
    transform: profileMenu ? "translateY(5.5em)" : "translateY(-5em)",
    opacity: profileMenu ? "1" : "0",
    height: profileMenu ? "18em" : "0",
  });

  const user = useSelector(selectUser);
  const [imageUrl, setImageUrl] = useState(ProfileImg);

  useEffect(() => {
    setProfileMenu(false);
    // console.log(user);
  }, [width]);

  const inputRef = useRef(null);

  // useEffect(() => {
  //   if (imageUrl) {
  //     setImageUrl(imageUrl);
  //   }
  // }, [imageUrl]);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await authClient.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${user.user.token}` },
        }
      );
      const data = await res.data;
      console.log(data);
      dispatch(logout());
      await clearStorage();
    } catch (err) {
      console.log("error logging out !");
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
      console.log("Response --------- \n ", res);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log("err : ", err);
    }
  };

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
