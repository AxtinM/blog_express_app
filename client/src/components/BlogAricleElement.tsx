import styled from "styled-components";
import {
  SliderElementImg,
  SliderElementH1,
  SliderAuthorName,
} from "./SliderElement";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import configData from "../config";
import { NavLink } from "react-router-dom";

const BlogArticleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: fit-content;
  margin-left: 5px;
  margin-bottom: 4em;
  margin-top: 1em;
  width: 45rem;
  @media (max-width: 768px) {
    width: 100%;
    margin: 1em;
  }
`;
const TextContentWrapper = styled.div`
  margin-left: 20px;
  @media (max-width: 550px) {
    display: none;
  }
`;

function BlogAricleElement({ data }) {
  const path: string = data.imageHeadline.path;
  return (
    <NavLink to={`/article/${data._id}`}>
      <BlogArticleWrapper>
        <SliderElementImg src={`${configData.BASE_URL}/${path}`} />
        <TextContentWrapper>
          {/* @ts-ignore */}
          <SliderElementH1>{data.title}</SliderElementH1>
          <span
            className="author-name"
            style={{
              fontSize: "1em",
              fontWeight: "300",
              fontFamily: "spacy",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            By |
            <SliderAuthorName>{`@${data.author.username}`}</SliderAuthorName>
          </span>
          {/* <SliderElementP>
          {data.porps.content}
        </SliderElementP> */}
        </TextContentWrapper>
      </BlogArticleWrapper>
    </NavLink>
  );
}

export default BlogAricleElement;
