import { useRef, useEffect } from "react";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import configData from "../config";

const SliderElementH1 = styled.h1`
  font-size: 1.8em;
  font-weight: 700;
  font-family: spacy;
  color: #fff;
  margin-bottom: 10px;
  margin-top: ${(props) => (props.noMarginTop ? "0" : "20px")};
  @media (max-width: 850px) {
    font-size: 1.5em;
  }
`;

const SliderElementP = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  width: 100%;
  line-height: 18px;
  font-family: spacy;
  color: #eeeeee;
  @media (max-width: 850px) {
    font-size: 0.8rem;
    width: 90%;
  }
`;

const SliderAuthorName = styled.p`
  color: #ff2e63;
  font-size: 1.2em;
  font-weight: 300;
  font-family: spacy;
  margin: 10px 0;
`;

const SliderElementImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: ${(props) => (props.rounded ? "10px" : "0")};
  object-fit: cover;
  @media (max-width: 550px) {
    width: 90%;
    height: 85%;
  }
`;

function SliderElement({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    console.log("width", ref.current ? ref.current.offsetWidth : 0);
    // eslint-disable-next-line
  }, [ref.current]);

  const path = data.imageHeadline.path;

  const LinkElementWrapper = styled.div`
    height: fit-content;
    width: 150em;
    margin: 50px auto;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    @media (max-width: 850px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin: 0;
    }
  `;

  return (
    <LinkElementWrapper
      ref={ref}
      href="/"
      style={{
        maxWidth: "100%",
      }}
    >
      <SliderElementImg
        rounded
        src={`${configData.BASE_URL}/${path}`}
      ></SliderElementImg>
      <div
        className="slider-text"
        style={{
          width: "50%",
          marginRight: 20,
        }}
      >
        <SliderElementH1>{data.title}</SliderElementH1>
        <span
          className="author-name"
          style={{
            fontSize: "0.8em",
            fontWeight: "300",
            fontFamily: "spacy",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: "0.8em",
          }}
        >
          By |<SliderAuthorName>{data.author.username}</SliderAuthorName>
        </span>
        <SliderElementP>{data.overview}</SliderElementP>
      </div>
    </LinkElementWrapper>
  );
}

export { SliderElementImg, SliderAuthorName, SliderElementH1, SliderElementP };

export default SliderElement;
