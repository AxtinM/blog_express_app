import "../styles/blog_section.css";
const ProfileImage = "../static/images/me_pic3.jpg";

function BlogArtical() {
  return (
    <div className="blog-section">
      <div className="blog-artical">
        <img src={require(ProfileImage)} alt="" className="blog-image" />
        <div className="blog-content">
          <h1 className="title-blog">Blog Title</h1>
          <p className="blog-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            unde rerum maiores ...
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogArtical;
