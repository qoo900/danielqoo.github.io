import React, { useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Pagetitle from "../elements/Pagetitle";
import emailjs from '@emailjs/browser';

function Contact() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formdata.name) {
      setError(true);
      setMessage("이름 혹은 닉네임을 적어주세요.");
    } else if (!formdata.email) {
      setError(true);
      setMessage("이메일 주소를 적어주세요.");
    } else if (!formdata.subject) {
      setError(true);
      setMessage("제목을 적어주세요.");
    } else if (!formdata.message) {
      setError(true);
      setMessage("내용을 적어주세요.");
    } else {
      setError(false);
      setMessage("📧 메일이 정상적으로 전송되었습니다.");
    }

    console.log(formdata)

    emailjs.send('service_n7mctmh', 'template_err733v', formdata, '8mttHzFeLTQjuoAZI');

  };

  const handleChange = (event) => {
    setFormdata({
      ...formdata,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleAlerts = () => {
    if (error && message) {
      return <div className="alert alert-danger mt-4">{message}</div>;
    } else if (!error && message) {
      return <div className="alert alert-success mt-4">{message}</div>;
    } else {
      return null;
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <Pagetitle title="함께 만드는 선한 영향력" />

        <div className="row">
          <div className="col-md-4">
            <div className="contact-info">
              <ScrollAnimation
                animateIn="fadeInUp"
                animateOut="fadeInOut"
                animateOnce={true}
              >
                <h3>프리폴리 팀으로의 합류 여행 <img alt="robot" src="/images/airplane-emoji.svg" resizeMode="stretch" style={{width:'10%'}}/></h3>
              </ScrollAnimation>
              <ScrollAnimation
                animateIn="fadeInUp"
                animateOut="fadeInOut"
                animateOnce={true}
              >
                <p>
                  여러분들의 소중한 의견을 기다립니다. {" "}
                  <br/>
                  <a href="mailto:biz@freepoli.com" target={{target:"_blank"}}>biz@freepoli.com</a><img alt="robot" src="/images/waving-hand-emoji.svg" resizeMode="stretch" style={{width:'10%'}}/>
                </p>
              </ScrollAnimation>
            </div>
          </div>

          <div className="col-md-8">
            <form
              id="contact-form"
              className="contact-form mt-6"
              onSubmit={submitHandler}
            >
              <div className="row">
                <div className="column col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="InputName"
                      placeholder="이름 혹은 닉네임"
                      onChange={handleChange}
                      value={formdata.name}
                    />
                  </div>
                </div>

                <div className="column col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="InputEmail"
                      name="email"
                      placeholder="이메일 주소"
                      onChange={handleChange}
                      value={formdata.email}
                    />
                  </div>
                </div>

                <div className="column col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="InputSubject"
                      name="subject"
                      placeholder="제목"
                      onChange={handleChange}
                      value={formdata.subject}
                    />
                  </div>
                </div>

                <div className="column col-md-12">
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="InputMessage"
                      className="form-control"
                      rows="5"
                      placeholder="내용"
                      onChange={handleChange}
                      value={formdata.message}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                name="submit"
                id="submit"
                value="Submit"
                className="btn btn-default"
              >
                보내기
              </button>
            </form>
            {handleAlerts()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
