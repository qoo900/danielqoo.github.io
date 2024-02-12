import React from "react";
// import { Link } from "react-router-dom";
import Blog from "../elements/Blog";
import Pagetitle from "../elements/Pagetitle";

const allBlogs = [
  {
    id: 1,
    title: "함께할 동료를 구합니다",
    image: "images/blog/we_need_a_designer.svg",
    filesource: "../../blogs/we_need_a_designer.md",
    date: "2022.12.12",
    author: "프리폴리(FreePoli)",
    category: "공지",
  },
];

function Blogs() {
  return (
    <section id="blog">
      <div className="container">
        <Pagetitle title="프로폴리 팀 소식" />
        <div className="row blog-wrapper">
          {allBlogs.map((blogItem) => (
            <div className="col-md-4" key={blogItem.id}>
              <Blog blogData={blogItem} />
            </div>
          ))}
        </div>
        {/* <div className="text-center">
          <div className="spacer" data-height="30"></div>
          <Link to="/blogs" className="btn btn-default">
            더 보기
          </Link>
        </div> */}
      </div>
    </section>
  );
}

export default Blogs;
