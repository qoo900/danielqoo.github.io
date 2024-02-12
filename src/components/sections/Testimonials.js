import React from "react";
import Slider from "react-slick";
import Pagetitle from "../elements/Pagetitle";
import Testimonial from "../elements/Testimonial";

const sliderData = [
  {
    id: 1,
    avatar: "images/watch_google_noto_emoji.png",
    userName: "모두가 맹신하는 약 ‘시간’",
    subtitle: "1 / 3",
    review:
      ["오늘날의 애도는 대부분 개인의 영역입니다. 슬픔, 분노, 무력함, 자책감 등을 두려워하며 '시간이 약'이라는 말로 회피할 때도 있습니다. 모든 죽음과 상실은 개인의 역사이자 공동체의 아픔이기에 충분히 울고, 함께 슬퍼할 시간이 필요합니다.",
      ]
  },
  {
    id: 2,
    avatar: "images/candle-emoji_hires.png",
    userName: "그 많던 죽음은 어디로 갔을까?",
    subtitle: "2 / 3",
    review:
      ["최근 통계청 발표에 따르면 국내에서는 매년 30만 명이 죽음을 맞이합니다. 더욱이 코로나 사망자 수는 3만 명에 이르며, 대다수가 장례를 치르지 못했습니다. 누군가의 삶은 숫자로 처리되었고, 만날 수 없는 가운데, 죽음은 외로웠습니다.",
      ]
  },
  {
    id: 3,
    avatar: "images/gloves_hires.png",
    userName: "너와 나의 연결 고리",
    subtitle: "3 / 3",
    review:
      ["친밀한 관계에서의 죽음을 넘어 낯선 타인의 죽음까지 함께 슬퍼한다면, 그 죽음이 나의 삶과 어떤 연결 고리를 갖고 있는지 고민한다면, 보다 긴밀한 연대를 향해",
      <br/>,
      "나아갈 수 있으리라 믿습니다.",
      ]
  },
];

function Testimonials() {
  const slidetSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="testimonials">
      <div className="container">
        <Pagetitle title="AEDO(애도) 제작 동기" />
        <Slider {...slidetSettings} className="testimonials-wrapper">
          {sliderData.map((slider) => (
            <Testimonial key={slider.id} slider={slider} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonials;
