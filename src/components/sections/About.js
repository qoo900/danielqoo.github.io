import React from "react";
import TrackVisibility from "react-on-screen";
// import Counter from "../elements/Counter";
import Pagetitle from "../elements/Pagetitle";
import Skill from "../elements/Skill";

const aboutContent1 = {
  name: "윤효정",
  avatarImage: "/images/hyojung_motor_edited.png",
  content:
    [ <img alt="robot" src="/images/rocket-emji.svg" resizeMode="stretch" style={{width:'10%'}}/>,
      <p>이런 아이디어 어때요?</p>,
      "문학을 전공하고 기자로 활동하다 최근까지 기업의 언론홍보팀에서 근무함.",
      " ",
      "예술과 문화를 기반으로 한 기획과 콘텐츠가 주된 관심사이며, 호기심이 많아 새롭게 일 벌리기를 좋아함.",
      " ",
      "무언가에 한 번 빠지면 과몰입하고, 귀여운 것에 약함."]
};

const aboutContent2 = {
  name: "구본협",
  avatarImage: "/images/bonhuyb_sitting_edited.png",
  content:
    [ <img alt="robot" src="/images/person-astronaut.svg" resizeMode="stretch" style={{width:'10%'}}/>,
      <p>성공 확률은요?</p>,
      "철학과 심리학을 전공한 뒤 수년간 IT업계의 스타트업에서 경영지원 업무를 맡으며 조직의 체계적인 운영을 익히고 다양한 사업들을 관리함.",
      " ",
      "데이터와 SW 개발에 소질이 있어 웬만한 사내 서비스는 혼자서 만들었다는데... (기술지원 기다릴 바에 내가 하고 만다?)",
      " ",
      "대표가 벌린 일을 수습하는 것에 능숙함."]
};

const progressData1 = [
  {
    id: 1,
    title: "콘텐츠 기획, 작문 능력",
    percantage: 95,
    progressColor: "#FFD15C",
  },
  {
    id: 2,
    title: "커뮤니티 설계, 운영 능력",
    percantage: 85,
    progressColor: "#FF4C60",
  },
  {
    id: 3,
    title: "영업력, 정보력, 실행력",
    percantage: 80,
    progressColor: "#6C6CE5",
  },
];

const progressData2 = [
  {
    id: 1,
    title: "웹 & 앱 개발 (Python, JS, React, React Native, Flutter, AWS, GCP)",
    percantage: 80,
    progressColor: "#FFD15C",
  },
  {
    id: 2,
    title: "데이터 분석 (Pandas, Numpy, PyTorch, Tensorflow, R, SQL, SPSS, Excel)",
    percantage: 70,
    progressColor: "#6C6CE5",
  },
  {
    id: 3,
    title: "경영 관리 능력 (회계, 인사, 총무, 행정)",
    percantage: 70,
    progressColor: "#FF4C60",
  },

];

// const counterData = [
//   {
//     id: 1,
//     title: "팀 시작일",
//     count: 2022.08,
//     icon: "icon-calendar",
//   },
//   {
//     id: 2,
//     title: "Cup of coffee",
//     count: 5670,
//     icon: "icon-cup",
//   },
//   {
//     id: 3,
//     title: "Satisfied clients",
//     count: 427,
//     icon: "icon-people",
//   },
//   {
//     id: 4,
//     title: "Nominees winner",
//     count: 35,
//     icon: "icon-badge",
//   },
// ];

function About() {
  return (
    <section id="about">
      <div className="container">
        <Pagetitle title="프리폴리를 만들고 있는 사람들" />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center text-md-left">
              <img src={aboutContent1.avatarImage} alt={aboutContent1.name} resizeMode="stretch" style={{width:'70%'}}/>
              <p/>
              <p>송파 구민이자 1인 가구 청년<br/>윤효정</p>
              <div className="mt-3">
              <a href="https://www.instagram.com/oh.rora/" className="btn btn-default-insta" rel="noreferrer" target="_blank">
                Instagram
              </a>
            </div>
            </div>
            <div className="spacer d-md-none d-lg-none" data-height="30"></div>
          </div>

          <div className="col-md-9 triangle-left-md triangle-top-sm">
            <div className="rounded bg-white shadow-dark padding-30">
              <div className="row">
                <div className="col-md-6">
                  <p>{aboutContent1.content}</p>
                  <div
                    className="spacer d-md-none d-lg-none"
                    data-height="30"
                  ></div>
                </div>
                <div className="col-md-6">
                  {progressData1.map((progress) => (
                    <TrackVisibility
                      once
                      key={progress.id}
                      className="progress-wrapper"
                    >
                      <Skill progress={progress} />
                    </TrackVisibility>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <br/>
        <br/>

        <div className="row">
          <div className="col-md-3">
            <div className="text-center text-md-left">
              <img src={aboutContent2.avatarImage} alt={aboutContent2.name} resizeMode="stretch" style={{width:'70%'}}/>
              <p/>
              <p>강남 구민이자 1인 가구 청년<br/>구본협</p>
            <div className="mt-3">
              <a href="https://qoo900.com/" className="btn btn-default-homepage" rel="noreferrer" target="_blank">
                Homepage
              </a>
            </div>
            </div>
            <div className="spacer d-md-none d-lg-none" data-height="30"></div>
          </div>

          <div className="col-md-9 triangle-left-md triangle-top-sm">
            <div className="rounded bg-white shadow-dark padding-30">
              <div className="row">
                <div className="col-md-6">
                  <p>{aboutContent2.content}</p>
                  <div
                    className="spacer d-md-none d-lg-none"
                    data-height="30"
                  ></div>
                </div>
                <div className="col-md-6">
                  {progressData2.map((progress) => (
                    <TrackVisibility
                      once
                      key={progress.id}
                      className="progress-wrapper"
                    >
                      <Skill progress={progress} />
                    </TrackVisibility>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="spacer" data-height="70"></div>
          <div className="row fix-spacing">
            {counterData.map((counter) => (
              <div key={counter.id} className="col-md-3 col-sm-6">
                <TrackVisibility once>
                  <Counter counterItem={counter} />
                </TrackVisibility>
              </div>
            ))}
          </div> */}
      </div>
    </section>
    
  );
}

export default About;
