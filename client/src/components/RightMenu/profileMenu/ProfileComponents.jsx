import { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import EditIcon from "@mui/icons-material/Edit";
import { useSpring } from "react-spring";

const ProfileMenuWrapper = styled(animated.div)`
  width: 20em;
  height: 25em !important;
  border-radius: 2px;
  color: #fff;
  background-color: rgba(4, 4, 5, 0.9);
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -5em;
  right: 10px;
  z-index: 10;
`;

const ProfileCircle = styled(animated.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #fff;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  display: block;
  z-index: 11;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  z-index: 100;
`;

const Name = styled.h2`
  font-size: 1.4em;
  color: #fff;
  margin-bottom: 1em;
  font-family: spacy;
`;

const InsideMenuWrapper = styled.div`
  width: 90%;
  height: 100%;
  padding: 1em;
  padding-top: 1em;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const ElementWrapper = styled.div`
  width: 78%;
  height: fit-content;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin: 10px 0;
`;

const BottomBorder = styled(animated.span)`
  display: inline-block;
  height: 3px;
  width: 100%;
  border-radius 2px;
  background-color: #fff;
`;

const NormalDiv = styled.div`
  width: 100%;
  height: 25px;
  padding-bottom: 0.3em;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`;

const TextInfo = styled.p`
  font-size: 15px;
  font-family: spacy;
  color: #fff;
`;

const TextInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 0.3em;
  background-color: inherit;
  border: 0;
  font-size: 14px;
  font-family: spacy;
  color: #fff;
`;

const TextLabel = styled.p`
  font-size: 1.2em;
  font-family: spacy;
  margin: 4px 0;
`;

const ButtonChangeImg = styled.button`
  width: 8em;
  height: fit-content;
  border: 2px solid #fff;
  padding: 10px;
  opacity: 0.8;
  color: #fff;
  background-color: inherit;
  border-radius: 15px;
  font-size: 17px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 0;
  transform: translateX(50%);
  display: inline-block;
  box-sizing: content-box;

  &:hover {
    opacity: 1;
  }
`;

export const Element = ({ text, label }) => {
  const [edit, setEdit] = useState(false);
  const BBSpring = useSpring({
    opacity: edit ? "1" : "0",
    transform: edit ? "translateY(-4px)" : "translateY(20px)",
  });

  return (
    <>
      <ElementWrapper>
        <TextLabel>{label}</TextLabel>
        <NormalDiv>
          {edit ? (
            <TextInput placeholder={text} />
          ) : (
            <TextInfo>{text}</TextInfo>
          )}
          <EditIcon
            onClick={() => {
              setEdit(!edit);
            }}
            color="info"
            style={{
              fontSize: "medium",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
          />
        </NormalDiv>
        <BottomBorder style={BBSpring} />
      </ElementWrapper>
    </>
  );
};

export const ImageInput = ({ label }) => {
  return (
    <>
      <ElementWrapper style={{ height: "fit-content" }}>
        <TextLabel>{label}</TextLabel>
        <ButtonChangeImg type="file" accept="image/png, image/jpeg" />
      </ElementWrapper>
    </>
  );
};

export {
  ProfileCircle,
  InsideMenuWrapper,
  ProfileImage,
  ProfileMenuWrapper,
  Name,
  ElementWrapper,
  BottomBorder,
  ButtonChangeImg,
};
