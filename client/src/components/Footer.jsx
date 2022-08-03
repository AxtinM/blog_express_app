import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "../styles/footer.css";

const FooterWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 1em;
  background-color: #222831;
  box-sizing: border-box;
`;

const FooterDivisionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 50px 0;
`;

const FooterAndromeda = styled.h3`
  font-size: calc(2.4rem + 1.3vw);
  color: #00adb5;
  text-align: center;
  font-family: "spacy";
  flex-grow: 2;
`;

const FooterLinksDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 2;
`;

const EmptyDiv = styled.div`
  flex-grow: 2;
`;

const FooterCopyWriteText = styled.p`
  font-size: calc(0.6rem + 0.5vw);
  font-weight: light;
  font-family: "spacy";
  color: #fff;
  text-align: center;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterDivisionWrapper>
        <FooterAndromeda>(Ax)Blog</FooterAndromeda>
        <FooterLinksDiv>
          <NavLink to="/blog/1" className="footer-element">
            Blog
          </NavLink>
          <NavLink to="/attigmohamed" className="footer-element">
            About
          </NavLink>
          <NavLink to="#" className="footer-element">
            Donate
          </NavLink>
        </FooterLinksDiv>
        <EmptyDiv />
      </FooterDivisionWrapper>
      <FooterCopyWriteText>
        Copyright © 2022 | Mohamed Attig | Axton (Ax) .
      </FooterCopyWriteText>
    </FooterWrapper>
  );
}

export default Footer;
