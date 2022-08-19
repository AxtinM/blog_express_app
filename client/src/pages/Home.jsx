import { useEffect, useState } from "react";
import "../styles/home.css";
import Button from "@mui/material/Button";
import Typewriter from "typewriter-effect";
import Loading from "../components/Loading";
import DownloadIcon from "@mui/icons-material/Download";
import EnterComponent from "../components/EnterComponent";
import SiteBranding from "../components/SiteBranding";
import ProfileImage from "../static/images/me_pic3.jpg";
import configData from "../config";
import { PAUSE } from "redux-persist";

const MyResume = `${configData.BASE_URL}/resumes/mohamed_attig_cv.pdf`;

export default function Home() {
  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `download.pdf`;
    link.href = MyResume;
    link.click();
  };

  const getTime = (date) => {
    return `${
      date.getHours().toString().length === 1
        ? `0${date.getHours().toString()}`
        : date.getHours().toString()
    }:${
      date.getMinutes().toString().length === 1
        ? `0${date.getMinutes().toString()}`
        : date.getMinutes().toString()
    }`;
  };
  // Math.floor(Math.random()*100)
  const date = new Date();

  const [time, setTime] = useState(getTime(date));
  // const [quote, setQuote] = useState();
  // const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onLanding, setOnLanding] = useState(true);
  const getQuotes = async () => {
    // const data = await fetch("https://type.fit/api/quotes")
    //   .then((res) => {
    //     const data = res.json();
    //     return data;
    //   })
    //   .catch((err) => console.log(err));
    // // const random = Math.floor(Math.random() * 100);
    // setQuote(data[6]);
    setTimeout(() => {
      console.log("timeout done");
      setIsLoading(true);
    }, 500);
  };
  useEffect(() => {
    getQuotes();
    // const data = await quoteClient.get("quotes");
    setTimeout(() => {
      setTime(getTime(new Date()));
    }, 10000);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        onLanding === true ? (
          <div className="landing">
            <div id="bg-img"></div>
            <Button
              variant="outlined"
              onClick={() => {
                setOnLanding(false);
              }}
              sx={{ position: "absolute", top: 30, right: 30, color: "#fff" }}
            >
              enter
            </Button>
            <span id="landing-element">
              <h1 id="landing-time">{time.toString()}</h1>
              <span id="landing-quote">
                <blockquote>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay(50)
                        .typeString(
                          "That which does not kill us makes us stronger."
                        )
                        .start();
                    }}
                  />
                </blockquote>
              </span>
            </span>
          </div>
        ) : (
          <div className="main">
            <SiteBranding />
            <div className="switch">
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  onDownload();
                }}
                sx={{
                  fontSize: 17,
                  marginTop: 10,
                  marginLeft: 5,
                  color: "#fff",
                }}
                endIcon={<DownloadIcon />}
              >
                Download CV
              </Button>
            </div>
            <main className="site-main">
              <div className="about">
                <div className="about-content content-information">
                  <h1 className="content-title">About</h1>
                  <p className="content-text">
                    <h4 className="first-letter">T</h4>his blog site is written
                    by me, Mohamed Attig | Ax, based in Sousse, Tunisia. I am a
                    devoted and ambitious individual who likes learning and
                    growing. I have life goals that I want to attain, such as
                    pushing technology to its best extent in my life as well as
                    assisting humanity in ensuring consistency, rather than
                    spinning out and missing out on new advancements. I'm
                    interested in a variety of amazing technologies, from
                    augmented reality to blockchain to robotics, and I strive
                    effectively every day to enhance my abilities so that one
                    day I could be the one who, with the assistance of other
                    individuals, guides our humankind.
                  </p>
                </div>
                <div className="image-content">
                  <img
                    id="about-image"
                    className="content-image"
                    src={ProfileImage}
                    alt="Mohamed"
                  />
                  <figcaption>
                    IT Event, where i was invited as a python coach.
                  </figcaption>
                </div>
              </div>
              <EnterComponent />
            </main>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
