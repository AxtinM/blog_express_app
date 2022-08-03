import styled from "styled-components";

const ModalInsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  font-family: spacy;
  color: #fff;
  width: 100%;
  margin: 0 auto;
  z-index: 100;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20em;
  margin: 5em 0;
`;

const ModalTitle = styled.h2`
  font-size: 2em;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-decoration: none;
`;

const ModalImage = styled.img`
  max-width: 30em;
  max-height: 30em;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
  margin-bottom: 1em;
  margin-top: 1em;
  cursor: pointer;
`;

const ModalBody = styled.div`
  font-size: 0.8em;
  line-height: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 2em;
  padding: 1em;
`;

export { ModalInsideWrapper, ModalHeader, ModalTitle, ModalImage, ModalBody };
