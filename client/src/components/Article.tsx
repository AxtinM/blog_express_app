import styled from "styled-components";
import parse from "html-react-parser";
import "../styles/article.css";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import configData from "../config";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

const ArticleLocalWrapper = styled.div`
  height: fit-content;
  width: 45rem;
  margin: 1em auto;
  @media (max-width: 750px) {
    width: 95%;
  }
`;

const ArticleImg = styled.img`
  height: 300px;
  width: inherit;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  margin: 0 0;
  @media (max-width: 750px) {
    width: 99%;
  }
`;

const ArticleContentWrapper = styled.div`
  height: fit-content;
  width: 100%;
  background-color: #000;
  padding: 1em 1em;
  box-sizing: border-box;
  margin: 0 auto;
`;

const ArticleHeader = styled.h1`
  font-size: calc(1vw + 0.9em);
  font-weight: 700;
  font-family: spacy;
  color: #fff;
  margin-bottom: 1rem;
`;

const ArticleUnderHeaderDiv = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: spacy;
`;

const ArticleUnderHeaderP = styled.p`
  font-size: calc(0.4vw + 0.6em);
  font-family: spacy;
  color: #ff2e63;
`;

const ArticleMainContentDiv = styled.div`
  height: fit-content;
  max-height: 590px;
  width: 97%;
  margin: 1em 0;
  padding: 0 1em;
  overflow: hidden;
  text-overflow: " [..]";
  box-sizing: border-box;
`;

function Article(props: {
  data: {
    imageHeadline: { path: string };
    title:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal;
    author: {
      username:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | ReactPortal;
    };
    comments: string | any[];
    content: string;
    _id: any;
  };
}) {
  const path: any = props.data.imageHeadline.path.split("/");
  // console.log(props.data);
  const _len: number = path.length - 1;
  return (
    <ArticleLocalWrapper>
      <ArticleImg src={`${configData.BASE_URL}/images/${path[_len]}`} />
      <ArticleContentWrapper>
        <ArticleHeader>{props.data.title}</ArticleHeader>
        <ArticleUnderHeaderDiv>
          <ArticleUnderHeaderP>
            May 17, 2022 by {props.data.author.username}{" "}
          </ArticleUnderHeaderP>
          <ArticleUnderHeaderP>
            {props.data.comments.length === 0
              ? "No comments"
              : props.data.comments.length}
          </ArticleUnderHeaderP>
        </ArticleUnderHeaderDiv>
        <ArticleMainContentDiv>
          {parse(props.data.content)}
        </ArticleMainContentDiv>
        <span
          style={{
            display: "inline-block",
            fontSize: 20,
            marginLeft: "2em",
            fontWeight: "bold",
          }}
        >
          {"------->"}
        </span>
        <NavLink
          to={`/article/${props.data._id}`}
          style={{
            color: "#ff2e63",
            margin: "0 1em",
            fontSize: "calc(0.4vw + 0.6em)",
            fontFamily: "spacy",
          }}
        >
          Continue..
        </NavLink>
      </ArticleContentWrapper>
    </ArticleLocalWrapper>
  );
}

export default Article;
