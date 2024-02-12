import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Pagetitle from "../elements/Pagetitle";
import Portfolio from "../elements/Portfolio";
import { Link } from "react-scroll";
import Iframe from 'react-iframe'

const filters = [
  {
    id: 1,
    text: "모두 보기",
  },
  {
    id: 2,
    text: "문서",
  },
  {
    id: 3,
    text: "사진",
  },
  {
    id: 4,
    text: "영상",
  },
  {
    id: 5,
    text: "관련 사이트",
  },
];

const allData = [
  {
    id: 1,
    title: "청년 토론 모임 SRT (Songpa Revolition in Table)",
    category: "관련 사이트",
    image: "images/works/srt_logo_default.svg",
    link: "https://srt.seoul.kr/",
  },
  {
    id: 2,
    title: "청년 정치 키트",
    category: "사진",
    image: "images/works/Whatever Kit_full package_resized-min.jpeg",
    popupLink: [
      "images/works/Whatever Kit_full package_resized-min.jpeg",
      "images/works/Whatever Kit_workbook_resized-min.jpeg",
      "images/works/Whatever Kit_pamphlet_resized-min.jpeg",
      "images/works/Whatever Kit_postcard_resized-min.jpeg",
      "images/works/Whatever Kit_question card_resized-min.jpeg",
      "images/works/Whatever Kit_sticker_resized-min.jpeg",
    ],
  },
  {
    id: 3,
    title: "단짠단짠 정치살롱",
    category: "사진",
    image: "images/works/단짠단짠정치살롱_목업-min_2.png",
    popupLink: [
      "images/works/단짠단짠정치살롱_목업-min.png",
      "images/works/jpeg-optimizer-KakaoTalk_20220622_224858603-min.jpg"
    ],
  },
  {
    id: 4,
    title: "2022 왓에버 프로젝트 SRT",
    category: "영상",
    image: "images/works/srt_youtube.png",
    popupLink: [
      "https://www.youtube.com/embed/okJx6Vz4QKs",
    ],
  },
  // {
  //   id: 5,
  //   title: "iMac Mockup Design",
  //   category: "문서",
  //   image: "images/works/5.svg",
  //   popupLink: ["images/works/5.svg"],
  // },
];

function Works() {
  const [getAllItems] = useState(allData);
  const [dataVisibleCount, setDataVisibleCount] = useState(6);
  const [dataIncrement] = useState(3);
  const [activeFilter, setActiveFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState([]);
  const [noMorePost, setNoMorePost] = useState(false);

  useEffect(() => {
    setActiveFilter(filters[0].text.toLowerCase());
    setVisibleItems(getAllItems.filter((item) => item.id <= 6));
  }, [getAllItems]);

  const handleChange = (e) => {
    e.preventDefault();
    setActiveFilter(e.target.textContent.toLowerCase());
    let tempData;
    if (e.target.textContent.toLowerCase() === filters[0].text.toLowerCase()) {
      tempData = getAllItems.filter((data) => data.id <= dataVisibleCount);
    } else {
      tempData = getAllItems.filter(
        (data) =>
          data.category === e.target.textContent.toLowerCase() &&
          data.id <= dataVisibleCount
      );
    }
    setVisibleItems(tempData);
  };

  const handleLoadmore = (e) => {
    e.preventDefault();
    let tempCount = dataVisibleCount + dataIncrement;
    if (dataVisibleCount > getAllItems.length) {
      setNoMorePost(true);
    } else {
      setDataVisibleCount(tempCount);
      if (activeFilter === filters[0].text.toLowerCase()) {
        console.log("they are same");
        setVisibleItems(getAllItems.filter((data) => data.id <= tempCount));
      } else {
        setVisibleItems(
          getAllItems.filter(
            (data) => data.category === activeFilter && data.id <= tempCount
          )
        );
      }
    }
  };

  return (
    <section id="works">
      <div className="container">
        <Pagetitle title="프로젝트 성과물" />
        {/* Start Portfolio Filters */}
        <ScrollAnimation
          animateIn="fadeInUp"
          animateOut="fadeInOut"
          animateOnce={true}
        >
          <ul className="portfolio-filter list-inline">
            {filters.map((filter) => (
              <li className="list-inline-item" key={filter.id}>
                <button
                  onClick={handleChange}
                  className={
                    filter.text.toLowerCase() === activeFilter
                      ? "text-capitalize current"
                      : "text-capitalize"
                  }
                >
                  {filter.text}
                </button>
              </li>
            ))}
          </ul>
        </ScrollAnimation>
        {/* End Portfolio Filters */}

        {/* Start Portfolio Items */}
        <div className="row portfolio-wrapper">
          {visibleItems.map((item) => (
            <div className="col-md-4 col-sm-6 grid-item" key={item.id}>
              <Portfolio portfolio={item} />
            </div>
          ))}
        </div>
        {/* End Portfolio Items */}

        <div className="load-more text-center mt-4">
          <button
            className="btn btn-default"
            onClick={handleLoadmore}
            disabled={noMorePost ? "disabled" : null}
          >
            {noMorePost ? (
              "더 이상 항목이 없습니다"
            ) : (
              <span>
                <i className="fas fa-spinner"></i> 더 보기
              </span>
            )}
          </button>
        </div>

        <div className="mt-5 text-center">
          <p className="mb-0">
            더 상세한 정보를 원하시면{" "}
            <Link
              className="colorpink pointer"
              to="section-contact"
              spy={true}
              smooth={true}
              duration={500}
            >
              email
            </Link>{"로 "}
            언제든지 연락주세요! <img alt="robot" src="/images/waving-hand-emoji.svg" resizeMode="stretch" style={{width:'3.2%'}}/>
          </p>
        </div>
        <div className="mt-5 text-center">
          <p className="mb-0">
            <Iframe url="https://padlet.com/embed/343ona3ekdru9lon"
              width="100%"
              height="400px"
              position="relative"
            />
          </p>
        </div>
      </div>
    </section>
  );
}

export default Works;
