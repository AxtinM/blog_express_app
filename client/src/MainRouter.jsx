import React from "react";
import "./index.css";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainBlogIndex from "./pages/MainBlog/MainBlogIndex";
import BlogContent from "./pages/MainBlog/BlogContent";
import Blog from "./pages/Blog";
import WriteArticle from "./pages/WritePage/WriteArticle";
import ArticlePage from "./pages/MainBlog/ArticlePage";
import { useSelector } from "react-redux";
import { selectUser } from "./features/useSlices";

function WriteConfimation({ user, children }) {
  if (!user || !user.user.isAuthor) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function MainRouter() {
  const user = useSelector(selectUser);

  return (
    <Router>
      {/* <React.StrictMode> */}
      <Routes>
        <Route path="/" element={<MainBlogIndex />}>
          <Route exact path="/" element={<BlogContent />} />
          <Route exact path="/write" element={<WriteArticle />} />
          <Route
            path="/write/confirmation"
            element={
              <WriteConfimation user={user}>
                <p>404!</p>
              </WriteConfimation>
            }
          />
          <Route path="/blog/:num" element={<Blog />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
        <Route exact path="/attigmohamed" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      {/* </React.StrictMode> */}
    </Router>
  );
}

export default MainRouter;
