import React from "react";
import Pagetitle from "../elements/Pagetitle";
import Timeline from "../elements/Timeline";

const educationData = [
  {
    id: 1,
    title: "청년 독서토론 모임",
    years: "2021.11 - 현재",
    content:
      "송파구 지역 청년들과 시사잡지를 읽고 토론하는 모임 'SRT(Songpa Revolution in Table)' 기획 및 운영",
  },
  {
    id: 2,
    title: "청년 시사토론 키트",
    years: "2022.05 - 2022.08",
    content:
      "서울청년공간 무중력지대 대방의 커뮤니티 지원사업 '왓에버 프로젝트'에 선정(지원금 200만원)",
  },
  {
    id: 3,
    title: "단짠단짠 정치살롱",
    years: "2022.04 - 2022.08",
    content:
      "서울청년센터 광진오랑의 커뮤니티 지원사업 '오만사'에 선정(지원금 250만원)",
  },
];

const experienceData = [
  {
    id: 1,
    title: "프리폴리 팀 활동",
    years: "2022.09 - 현재",
    content: [
      "기획자와 개발자가 만나 구성한 팀으로 국내 최초 '애도'를 주제로 한 서비스 및 플랫폼 준비 중",]
  },
  {
    id: 2,
    title: "쓰면서 즐기는 마음체조",
    years: "2022.10 - 2022.11",
    content:
      "서울청년센터 관악오랑의 청년강사 지원사업 '클래쓰랑'에 선정(지원금 200만원)",
  },
  {
    id: 3,
    title: "신개념 커뮤니티 플랫폼 AEDO(애도)",
    years: "2022.12 - 현재",
    content:
      "개발•설계 과정 중이며 모바일을 기반으로 한 글쓰기 플랫폼, 온라인 자조모임, 다이어리 키트 등을 선보일 예정 ",
  },
];

function Experiences() {
  return (
    <section id="experience">
      <div className="container">
        <Pagetitle title="팀 빌딩 과정" />
        <div className="row">
          <div className="col-md-6">
            <div className="timeline edu bg-white rounded shadow-dark padding-30 overflow-hidden">
              {educationData.map((education) => (
                <Timeline key={education.id} education={education} />
              ))}
              <span className="line"></span>
            </div>
          </div>

          <div className="col-md-6">
            <div className="spacer d-md-none d-lg-none" data-height="30"></div>
            <div className="timeline exp bg-white rounded shadow-dark padding-30 overflow-hidden">
              {experienceData.map((experience) => (
                <Timeline key={experience.id} education={experience} />
              ))}
              <span className="line"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
