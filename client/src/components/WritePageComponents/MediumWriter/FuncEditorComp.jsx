import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
import { Spring, animated } from "react-spring";
import styled from "styled-components";
import { convertFromRaw } from "draft-js";
import { selectUser, handleError, logout } from "../../../features/useSlices";
import { useSelector, useDispatch } from "react-redux";
import { articleClient } from "../../../client";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "../../../styles/medium-editor.css";
import { createRef, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../../popup/Notification";
import Modal from "react-modal";
// import DraftailExporter from "../../../config/DraftailExporter";
// import exporterConfig from "../../../config/DraftailExporter";
import parse from "html-react-parser";
import {
  ModalInsideWrapper,
  ModalHeader,
  ModalTitle,
  ModalImage,
  ModalBody,
} from "./ModalComponent";

const ImageUrlToData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };
    xhr.onerror = function (e) {
      reject(this.statusText);
    };
    xhr.send();
  });
};

function FuncEditorComp() {
  const inputRef = createRef();
  Modal.setAppElement("#root");
  const [file, setFile] = useState(null);
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
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      zIndex: "10",
    },
    content: {
      backgroundColor: "#1a1a1a",
      borderRadius: "10px",
      padding: "2em",
      width: "90%",
      margin: "0 auto",
      border: "none",
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
    formData.append("file", isImage ? file : null);

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
          // dispatch(handleError(err.response.data.message));
          dispatch(logout());
        } else {
          Notification("error", "😕 Server Error! 😕");
          // dispatch(handleError(err.response.data.message));
        }
      });
  };

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
    if (initialImage) {
      setImage(initialImage);
      ImageUrlToData(initialImage)
        .then((data) => {
          setIsImage(true);
          setIsImageSpring(true);
          setFile(data);
        })
        .catch(() => {
          Notification("warning", "🔥 Image NOT Loaded! 🔥");
          setFile(null);
          setImage(null);
          setIsImage(false);
          setIsImageSpring(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal isOpen={isModalOpen} style={customStyles}>
        <ModalInsideWrapper>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalImage src={image} />
          </ModalHeader>
          <ModalBody>
            {/* eslint-disable-next-line eqeqeq */}
            {sessionStorage.getItem("draftail:content") !== null &&
            sessionStorage.getItem("draftail:content") !== "null" &&
            sessionStorage.getItem("draftail:content") !== undefined
              ? parse(
                  convertToHTML(
                    convertFromRaw(
                      JSON.parse(sessionStorage.getItem("draftail:content"))
                    )
                  )
                )
              : null}
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
                padding: "0.7em 1em",
                position: "relative",
                textAlign: "center",
                textDecoration: "none",
                marginTop: "1em",
                marginBottom: "1em",
                borderRadius: "10px",
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
      <div className="editor">
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
                      setFile(null);
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
              setFile(_file);
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
            ]}
            inlineStyles={[
              { type: INLINE_STYLE.BOLD },
              { type: INLINE_STYLE.ITALIC },
              { type: INLINE_STYLE.UNDERLINE },
              { type: INLINE_STYLE.KEYBOARD },
              { type: INLINE_STYLE.DELETE },
              { type: INLINE_STYLE.CODE },
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
              setFile(null);
              sessionStorage.removeItem("draftail:content");
              Notification("success", "🎉 Successfull Reset! 🎉");
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
            }}
          >
            Show
          </button>
        </div>
      </div>
    </>
  );
}

export default FuncEditorComp;
