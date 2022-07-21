import ArrowLeftTwoToneIcon from "@mui/icons-material/ArrowLeftTwoTone";
import { ArticleButtonDiv } from "./ArticlePaginationBtnElements";

function ArticlePaginationBtnLeft({ onClick }) {
  return (
    <ArticleButtonDiv onClick={onClick}>
      <ArrowLeftTwoToneIcon />
      older posts
    </ArticleButtonDiv>
  );
}

export default ArticlePaginationBtnLeft;
