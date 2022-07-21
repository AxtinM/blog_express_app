import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Article from "../components/Article";
import { MainWrapper, SideWrapper } from "./MainBlog/BlogContent";
import SideElements from "../components/side_page_components/SideElements";
import ArticlePaginationBtn from "../components/ArticleButton/ArticlePaginationBtnLeft";
import ArticlePaginationBtnRight from "../components/ArticleButton/ArticlePaginationBtnRight";
import { articleClient } from "../client";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

export const getArticle = async (num) => {
  try {
    const res = await articleClient.get(`/${num}`);
    const data = await res.data;
    return data;
  } catch (err) {
    console.log("There is an Error getting articles");
  }
};

const ArticleWrapper = styled.div`
  flex-grow: 1;
  @media (max-width: 1000px) {
    flex-grow: 4;
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 2.5em 0 0 0;
  padding-right: 10px;
  box-sizing: border-box;
`;

function Blog() {
  const { num } = useParams();
  const [data, setData] = useState(null);

  const forwardRef = useRef(null);
  const prevRef = useRef(null);

  useEffect(() => {
    getArticle(num)
      .then((res) => {
        setData(res.articles);
      })
      .catch((err) => {
        console.log("ERR : ", err);
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("data changed");
    if (data) {
      console.log("data is ", data);
    }
  }, [data]);

  return data === null || num === undefined ? (
    <Loading />
  ) : (
    <MainWrapper style={{ padding: "3em 0" }}>
      <SideWrapper grow="2" />
      <ArticleWrapper>
        {data.map((_article, i) => (
          <Article key={i} data={_article} />
        ))}
        <ButtonsWrapper>
          <Link
            to={`/blog/${parseInt(num) + 1}`}
            ref={forwardRef}
            style={{ display: "none" }}
          />
          {data.length === 5 ? (
            <ArticlePaginationBtn
              onClick={async () => {
                forwardRef.current.click();
                console.log(parseInt(num) + 1);
                getArticle(parseInt(num) + 1)
                  .then((res) => {
                    setData(res.articles);
                  })
                  .catch((err) => {
                    console.log("ERR : ", err);
                  });
              }}
            />
          ) : (
            <></>
          )}

          {num !== 1 ? (
            <>
              <Link
                to={`/blog/${parseInt(num) - 1}`}
                style={{ display: "none" }}
                ref={prevRef}
              />
              <ArticlePaginationBtnRight
                onClick={() => {
                  prevRef.current.click();
                  console.log(parseInt(num) - 1);
                  getArticle(parseInt(num) - 1)
                    .then((res) => {
                      setData(res.articles);
                    })
                    .catch((err) => {
                      console.log("ERR : ", err);
                    });
                }}
              />
            </>
          ) : (
            <></>
          )}
        </ButtonsWrapper>
      </ArticleWrapper>
      <SideElements isThousand={undefined} />
    </MainWrapper>
  );
}

export default Blog;
