import {
  DraftailEditor,
  BLOCK_TYPE,
  INLINE_STYLE,
  ENTITY_TYPE,
} from "draftail";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import { Spring, animated } from "react-spring";
import styled from "styled-components";
import { convertFromRaw, EditorState } from "draft-js";
import { selectUser, handleError, logout } from "../../../features/useSlices";
import { useSelector, useDispatch } from "react-redux";
import { articleClient } from "../../../client";
import { convertToRaw } from "draft-js";
import { ContentState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "../../../styles/medium-editor.css";
import { createRef, useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../../popup/Notification";
import Modal from "react-modal";
import DraftailExporter from "../../../config/DraftailExporter";
import exporterConfig from "../../../config/DraftailExporter";
import parse from "html-react-parser";
import {
  ModalInsideWrapper,
  ModalHeader,
  ModalTitle,
  ModalImage,
  ModalBody,
} from "./ModalComponent";

function FuncEditorComp() {
  const inputRef = createRef();
  Modal.setAppElement("#root");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [isImageSpring, setIsImageSpring] = useState(false);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const ButtonUpload = styled.button`
    background-color: #23232332;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    padding: 3px 5px;
    position: relative;
    text-align: center;
    text-decoration: none;
    width: 85%;
    height: 10em;

    &:hover {
      color: #fffa;
    }
    &:focus {
      outline: none;
    }
  `;

  const initial = JSON.parse(sessionStorage.getItem("draftail:content"));
  const initialTitle = sessionStorage.getItem("title");
  const initialImage = sessionStorage.getItem("image");
  const customStyles = {
    content: {
      backgroundColor: "#1a1a1aff",
      borderRadius: "5px",
      padding: "2em",
      width: "70%",
      margin: "0 auto",
    },
  };

  const onSave = (content) => {
    sessionStorage.setItem("draftail:content", JSON.stringify(content));
  };

  const createArticle = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", isImage ? image : null);
    formData.append("content", sessionStorage.getItem("draftail:content"));

    articleClient
      .post("/create", formData, {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
          ContentType: "multipart/form-data",
        },
      })
      .then((_res) => {
        Notification("success", "🔥 Article Saved! 🔥");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Notification("error", "😕 Try Loggin In! 😕");
          console.log("Unauthorized");
          dispatch(handleError(err.response.data.message));
          dispatch(logout());
        } else {
          Notification("error", "😕 Server Error! 😕");
          console.log(err.response.data.message);
          dispatch(handleError(err.response.data.message));
        }
      });
  };

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
    if (initialImage) {
      setImage(initialImage);
      setIsImage(true);
      setIsImageSpring(true);
    }
  }, []);

  return (
    <div className="editor">
      <Modal isOpen={isModalOpen} style={customStyles}>
        <ModalInsideWrapper>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalImage src={image} alt="article" />
          </ModalHeader>
          <ModalBody>
            {sessionStorage.getItem("draftail:content") !== "null" ||
            null ||
            undefined
              ? parse(
                  convertToHTML(
                    convertFromRaw(
                      JSON.parse(sessionStorage.getItem("draftail:content"))
                    )
                  )
                )
              : ""}
          </ModalBody>
          <div>
            <button
              style={{
                backgroundColor: "#232323ED",
                border: "2px solid #ededed",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1.2em",
                fontWeight: "bold",
                padding: "1em",
                position: "relative",
                textAlign: "center",
                textDecoration: "none",
                marginTop: "1em",
                marginBottom: "1em",
                borderRadius: "5px",
                outline: "none",
              }}
              onClick={() => {
                setIsModalOpen(false);
              }}
              type="button"
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </ModalInsideWrapper>
      </Modal>

      <div className="title-input">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            sessionStorage.setItem("title", e.target.value);
          }}
        />
        {isImage === true ? (
          <Spring scale={isImageSpring ? 1 : 0}>
            {(styles) => (
              <animated.img
                style={styles}
                src={image}
                onClick={() => {
                  setIsImageSpring(!isImageSpring);
                  setTimeout(() => {
                    setIsImage(false);
                    setImage(null);
                    URL.revokeObjectURL(image);
                  }, 500);
                }}
              />
            )}
          </Spring>
        ) : (
          <ButtonUpload
            onClick={() => {
              inputRef.current.click();
            }}
          >
            Upload Image
          </ButtonUpload>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          onChange={(e) => {
            const _file = e.target.files[0];
            setImage(URL.createObjectURL(_file));
            setIsImage(true);
            setIsImageSpring(true);
            sessionStorage.setItem("image", URL.createObjectURL(_file));
          }}
        />
      </div>

      <div className="editor-container">
        <DraftailEditor
          rawContentState={initial || null}
          onSave={onSave}
          blockTypes={[
            { type: BLOCK_TYPE.HEADER_TWO },
            { type: BLOCK_TYPE.HEADER_THREE },
            { type: BLOCK_TYPE.HEADER_FOUR },
            { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
            { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
            { type: BLOCK_TYPE.CODE },
            { type: BLOCK_TYPE.BLOCKQUOTE },
          ]}
          inlineStyles={[
            { type: INLINE_STYLE.BOLD },
            { type: INLINE_STYLE.ITALIC },
            { type: INLINE_STYLE.UNDERLINE },
            { type: INLINE_STYLE.KEYBOARD },
            { type: INLINE_STYLE.DELETE },
            { type: INLINE_STYLE.CODE },
          ]}
          entityTypes={[
            {
              // We use the same value for type as in the converter.
              type: ENTITY_TYPE.LINK,

              // We define what data the LINKs can have.
              attributes: ["url"],
              whitelist: {
                href: "^(?![#/])",
              },
            },
          ]}
        />
      </div>
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
      <div className="buttons">
        <button
          onClick={() => {
            setTitle("");
            sessionStorage.removeItem("title");
            setImage(null);
            sessionStorage.removeItem("image");
            setIsImage(false);
            setIsImageSpring(false);
            sessionStorage.removeItem("draftail:content");
          }}
        >
          reset
        </button>
        <button
          onClick={() => {
            createArticle();
          }}
        >
          Confirm
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            // console.log("STATE2");
            // console.log(JSON.parse(sessionStorage.getItem("state")));
          }}
        >
          Show
        </button>
      </div>
    </div>
  );
}

export default FuncEditorComp;
