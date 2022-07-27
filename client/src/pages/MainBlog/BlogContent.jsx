import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import SliderElement from "../../components/SliderElement";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import BlogAricleElement from "../../components/BlogAricleElement";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SideElements from "../../components/side_page_components/SideElements";
import ArticlePaginationBtnLeft from "../../components/ArticleButton/ArticlePaginationBtnLeft";
import { useWindowSize } from "../../components/RightMenu/profileMenu/Profile";
import { getArticle } from "../Blog";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { articleClient } from "../../client";

const getFeaturedArticles = async () => {
  const res = await articleClient.get("/featured");
  const data = await res.data;
  console.log("data \n ", data);
  return data;
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 3em;
  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;

const SliderContainer = styled.div`
  width: 55%;
  height: 350px;
  margin: 0 auto;
  margin-top: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 100px 0;
  box-size: border-box;
  position: relative;
  overflow: hidden;
  @media (max-width: 1750px) {
    width: 45rem;
  }
  @media (max-width: 1270px) {
    width: 90%;
  }
  @media (max-width: 1080px) {
    width: 98%;
  }
`;

const BlogHeaderWrapper = styled.div`
  width: 70%;
  height: fit-content;
  @media (max-width: 1400px) {
    width: 80%;
  }
  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const BlogHeader = styled.h1`
  font-weight: 700;
  font-family: spacy;
  color: #fff;
  margin-bottom: 3px;
  margin-top: 20px;
`;
const BlogHeaderDevider = styled.span((props) => ({
  width: "100%",
  height: "4px",
  backgroundColor: "#fff",
  display: "block",
  marginTop: "0",
  marginBottom: props.box ? "20px" : "2em",
}));
const Articles = styled.div`
  margin: 5em 0;
  flex-grow: 1;
`;

const SideWrapper = styled.div((props) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: props.grow,
  marginTop: "14em",
  "@media (max-width: 1000px)": {
    margin: "0 auto",
    width: "70%",
    marginBottom: "2em",
  },
}));

function MainBlog() {
  const [data, setData] = useState(null);
  const [featuredData, setFeaturedData] = useState(null);
  const forwardRef = useRef(null);
  // eslint-disable-next-line
  const [width, height] = useWindowSize();
  const [isThousand, setIsThousand] = useState(false);
  useEffect(() => {
    getFeaturedArticles()
      .then((res) => {
        setFeaturedData(res.articles);
      })
      .catch((err) => {
        console.log(err);
      });
    getArticle(1)
      .then((res) => {
        setData(res.articles);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line no-use-before-define
  }, []);

  useEffect(() => {
    if (width < 1000) {
      setIsThousand(true);
    } else {
      setIsThousand(false);
    }
    // eslint-disable-next-line no-use-before-define
  }, [width]);

  return (
    <>
      <SliderContainer>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={200}
          slidesPerView={1}
          rewind={true}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          navigation={isThousand ? false : true}
          centeredSlides={true}
          pagination={{ clickable: true }}
        >
          {featuredData !== null ? (
            featuredData.map((e, i) => (
              <SwiperSlide>
                <SliderElement data={data} key={i} />
              </SwiperSlide>
            ))
          ) : (
            <center
              style={{
                marginTop: "7em",
              }}
            >
              <h1
                style={{
                  fontFamily: "spacy",
                  fontWeight: "700",
                  fontSize: "2.5em",
                }}
              >
                no featured articles yet
              </h1>
            </center>
          )}
        </Swiper>
      </SliderContainer>
      <MainWrapper>
        <SideWrapper grow="1"></SideWrapper>
        <Articles>
          <BlogHeaderWrapper>
            <BlogHeader>Recent Articles</BlogHeader>
          </BlogHeaderWrapper>
          <BlogHeaderDevider />
          {data !== null ? (
            data.map((data, i) => <BlogAricleElement data={data} key={i} />)
          ) : (
            <Loading />
          )}
          <Link to="/blog/2" style={{ display: "none" }} ref={forwardRef} />
          <ArticlePaginationBtnLeft
            style={{
              marginTop: "2em",
            }}
            onClick={() => {
              forwardRef.current.click();
            }}
          />
        </Articles>
        <SideElements isThousand={isThousand} />
      </MainWrapper>
    </>
  );
}

export {
  MainWrapper,
  SideWrapper,
  BlogHeaderWrapper,
  BlogHeader,
  BlogHeaderDevider,
};
export default MainBlog;
