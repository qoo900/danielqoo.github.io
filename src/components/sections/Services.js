import React from "react";
//import { Link } from "react-scroll";
import Pagetitle from "../elements/Pagetitle";
import Service from "../elements/Service";

const servicesData = [
  {
    id: 1,
    icon: "images/thought-balloon.svg",
    title: "공감대",
    content:
      ["공감의 담론을 찾아 연대하고,",
       <br/>,
       "낯선질문을 던지며",
       <br/>,
       "더 나은 삶을 모색합니다.",
      ],
    color: "#6C6CE5",
    contentColor: "light",
  },
  {
    id: 2,
    icon: "images/speech-balloon.svg",
    title: "공론장",
    content:
      ["경쟁이 아닌 협력을 기반으로",
       <br/>,
       "시장에서의 개인이 아닌 공동체의",
       <br/>,
       "구성원으로 소통합니다.",
      ],
    color: "#F97B8B",
    contentColor: "light",
  },
  {
    id: 3,
    icon: "images/right-anger-bubble.svg",
    title: "공동체",
    content:
      ["생활 속 의제를 탐구하며",
      <br/>,
       "앱 서비스, 자조모임, 워크숍, 출판물 등 새로운 경험을 기획합니다.",
      ],
    color: "#F9D74C",
    contentColor: "dark",
  },
];

function Services() {
  return (
    <section id="services">
      <div className="container">
        <Pagetitle title="팀 소개" />
        <div className="row fix-spacing">
          {servicesData.map((service) => (
            <div className="col-md-4" key={service.id}>
              <Service service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
