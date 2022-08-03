import styled from "styled-components";

const ModalInsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1aff;
  font-family: spacy;
  color: #fff;
  width: 100%;
  margin: 0 auto;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30em;
  margin: 5em 0;
`;

const ModalTitle = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-decoration: none;
`;

const ModalImage = styled.img`
  max-width: 20em;
  max-height: 20em;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
  margin-bottom: 1em;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ModalBody = styled.div`
  font-size: 1em;
  line-height: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 2em;
  padding: 1em;
`;

export { ModalInsideWrapper, ModalHeader, ModalTitle, ModalImage, ModalBody };
