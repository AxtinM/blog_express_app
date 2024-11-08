import styled from "styled-components";
import { animated } from "react-spring";

const ModalWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(238, 238, 238, 0.4);
  z-index: 10;
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const ModalMenuWrapper = styled(animated.div)`
  height: 47em;
  width: 35em;
  background-color: #fff;
  z-index: 20;
  border-radius: 25px;
  color: #222831;
  display: flex;
  justify-content: space-around;
  font-family: spacy;
  flex-direction: column;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  position: relative;
  opacity: 0;
  @media (max-width: 768px) {
    height: 90%;
    border: none;
  }
`;

const ModalTitle = styled.h1`
  text-align: center;
  font-size: calc(1.3rem + 0.8vw);
  font-style: bold;
  color: inherit;
`;

const ModalLable = styled.h3`
  font-size: calc(12px + 0.5vw);
  color: inherit;
  margin-bottom: 15px;
`;

const ModalInput = styled.input`
  border: 2px solid #222831;
  width: 100%;
  padding: 9px 15px;
  font-size: calc(0.6rem + 0.4vw);
  color: inherit;
  border-radius: 20px;
`;

const LabelInputWrapper = styled.div`
  width: 70%;
  height: fit-content;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const ModalBtn = styled(animated.button)`
  height: fit-content;
  width: 8rem;
  border: 2px solid #222831;
  background-color: #fff;
  color: inherit;
  font-size: calc(12px + 0.5vw);
  font-family: spacy;
  border-radius: 20px;
  margin: 0.7em 0 0.5em 0;
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: #222831;
    color: #fff;
  }
`;

const ModalChangePassText = styled.p`
  font-size: calc(10px + 0.2vw);
  color: #393e46;
  align-self: flex-end;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ModalCrossWrapper = styled(animated.span)`
  display: block;
  position: absolute;
  background-color: inherit;
  right: 35px;
  top: 40px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  box-sizing: box-border;
`;

const ModalCrossStick = styled.span((props) => ({
  height: "4px",
  width: "1rem",
  backgroundColor: "#ff2e63",
  display: "block",
  borderRadius: "5px",
  // @ts-ignore
  transform: props.transform,
}));

const ModalErrorMessageWrapper = styled(animated.div)`
  display: flex;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;
  padding: 0.6em;
  background-color: #fff2f2;
  color: red;
  border-radius: 5px;
  position: absolute;
  top: -5em;
`;

// const ModalSuccessMessageWrapper = styled(animated.div)`
//   display: flex;
//   width: fit-content;
//   height: fit-content;
//   justify-content: center;
//   align-items: center;
//   margin: 0.5em 0;
//   padding: 0.6em;
//   background-color: #fff2f2;
//   color: red;
//   border-radius: 5px;
//   position: absolute;
//   top: -5em;
// `;

export const ErrorMsg = (props) => {
  return (
    <ModalErrorMessageWrapper style={props.style}>
      <p style={{ color: "inherit" }}>{props.error}</p>
    </ModalErrorMessageWrapper>
  );
};

export {
  ModalWrapper,
  ModalMenuWrapper,
  ModalTitle,
  ModalLable,
  ModalInput,
  LabelInputWrapper,
  ModalBtn,
  ModalChangePassText,
  ModalCrossWrapper,
  ModalCrossStick,
};
