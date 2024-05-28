import React, { useState } from "react";
import "../App.css";

const CoverPage = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const linkStyles = {
    textDecoration: "none",
    color: "inherit",
    position: "relative",
    cursor: "pointer",
  };

  const underlineStyles = {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "2px", // Thickness of the underline
    backgroundColor: "lightgray",
    bottom: "-3px", // Offset of the underline
    left: "0",
    transform: "scaleX(0)",
    transformOrigin: "bottom right",
    transition: "transform 0.3s ease",
  };

  const activeUnderlineStyles = {
    ...underlineStyles,
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
    backgroundColor: "darkgray", // Active underline color
  };

  // const sectionStyles = {
  //   flex: '1',
  //   margin: '10px', // Adjust the margin to control spacing between sections
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'column',
  //   padding: '20px',
  //   borderRadius: '15px',
  //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  //   position: 'relative',
  //   overflow: 'hidden',
  //   color: 'white',
  //   textAlign: 'center',
  // };

  // const sectionBackgroundStyles = {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   filter: 'blur(3px)',
  //   zIndex: 0,
  // };

  // const contentStyles = {
  //   position: 'relative',
  //   zIndex: 1,
  //   padding: '20px',
  //   borderRadius: '15px',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight dark background to make text readable
  //   width: '80%',
  //   fontWeight: 'bold', // Make text bold
  // };

  return (
    <div>
      <div className="text-white text-2xl w-screen px-3">
        <div className="flex justify-between items-center h-10 md:w-1/2 mx-auto mt-3.5 flex-col md:flex-row">
          <h1 className="text-2xl md:text-4xl">
            Chat<span className="text-3xl md:text-6xl text-blue-500">App</span>
          </h1>{" "}
          <nav className="flex flex-col md:flex-row space-between items-center text-lg md:text-2xl">
            {[
              { label: "Home", link: "/" },
              { label: "Features", link: "#features" },
              { label: "Register", link: "/auth" },
            ].map(({ label, link }) => (
              <a
                className="md:m-5 m-1.5"
                key={label}
                onClick={() => handleClick(link)}
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
                href={link} // Changed to href to make it clickable
                style={linkStyles}
              >
                {label}
                <span
                  style={
                    activeLink === link || hoveredLink === link
                      ? activeUnderlineStyles
                      : underlineStyles
                  }
                />
              </a>
            ))}
          </nav>
        </div>

        <main className="flex flex-col justify-center align-center my-40 md:my-60 md:w-1/2 mx-auto">
          <h1 className="md:text-6xl text-4xl mb-4 text-center">
            Welcome to Chat<span style={{ color: "#3182CE" }}>App</span>
          </h1>
          <p
            className="text-center md:text-2xl text-lg"
            style={{ color: "#6C757D" }}
          >
            ChatApp is your all-in-one solution for real-time messaging, video
            chatting, and staying connected with your loved ones. Enjoy seamless
            and secure communication with our feature-rich platform.
          </p>
          <button className="p-3 md:p-4 bg-white text-black mt-5 rounded-xl md:text-2xl text-xl md:w-1/4 w-1/2 mx-auto">
            <a href="/auth" style={linkStyles}>
              Get Started
            </a>
          </button>
        </main>
      </div>

      <hr className="w-4/5 mx-auto h-1 text-white md:mb-20 mb-20" />

      {/* <!-- Service 7 - Bootstrap Brain Component --> */}
      <section
        className="bsb-service-7 py-5 py-xl-8 md:my-60 my-40 px-3"
        id="features"
      >
        <div className="container" marginBottom="30px">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7">
              <h3 className="fs-5 mb-2 text-secondary text-center text-uppercase">
                Features
              </h3>
              <h2
                className="display-5 mb-5 mb-xl-9 text-center md:text-3xl text-2xl"
              >
                Explore these features and more to elevate your online
                communication experience with our web chat app.
              </h2>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="container-fluid bg-light border shadow">
                <div className="row">
                  <div
                    className="col-12 col-md-4 p-0"
                    style={{ backgroundColor: "#212529" }}
                  >
                    <div className="card border-0 bg-transparent">
                      <div
                        className="card-body text-center p-5"
                        style={{
                          color: "white",
                          backgroundColor: "#212529",
                          border: "0.5px solid white",
                          margin: "10px",
                          paddingTop: "70px",
                          paddingBottom: "70px",
                        }}
                      >
                        <svg
                          fill="#3182CE"
                          width="90px"
                          height="90px"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#3182CE"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path d="M54.6863976,71.3486058 C65.2800542,67.4402893 71.5149714,60.8593692 73.3911492,51.6058455 C77.9258951,53.8818602 81,58.3470894 81,63.5 C81,65.7019157 80.4364124,67.7429352 79.4563153,69.5863185 L81.1449195,74.9556236 C81.5465589,76.2413379 80.3416409,77.3663379 79.056395,76.9645522 L73.8372229,75.1253102 C71.6757637,76.3323361 69.1649118,77 66.4758735,77 C61.6071311,77 57.3088733,74.7733287 54.6863976,71.3486058 L54.6863976,71.3486058 Z M44.0983607,22 C57.4327869,22 68.1967213,32.0446429 68.2770492,44.5 C68.2770492,56.9553571 57.5131148,67 44.1786885,67 C39.5196721,67 35.1819672,65.7946429 31.4868852,63.625 C31.0852459,63.3839286 30.6032787,63.3035714 30.1213115,63.4642857 L23.052459,65.9553571 C21.7672131,66.3571429 20.5622951,65.2321429 20.9639344,63.9464286 L23.2131148,56.7946429 C23.3737705,56.3928571 23.2934426,55.9107143 23.052459,55.5089286 C21.1245902,52.2142857 20,48.5178571 20,44.5 C20,32.0446429 30.7639344,22 44.0983607,22 L44.0983607,22 Z M32,37 C30.8954305,37 30,37.8954305 30,39 L30,41 C30,42.1045695 30.8954305,43 32,43 L58,43 C59.1045695,43 60,42.1045695 60,41 L60,39 C60,37.8954305 59.1045695,37 58,37 L32,37 Z M32,48 C30.8954305,48 30,48.8954305 30,50 L30,52 C30,53.1045695 30.8954305,54 32,54 L46,54 C47.1045695,54 48,53.1045695 48,52 L48,50 C48,48.8954305 47.1045695,48 46,48 L32,48 Z"></path>{" "}
                          </g>
                        </svg>
                        <h4
                          class="fw-bold text-uppercase mb-4"
                          style={{ fontSize: "1.6em", marginTop: "10px" }}
                        >
                          Real-Time Messaging
                        </h4>
                        <p
                          className="mb-4 text-secondary"
                          style={{ fontSize: "1.2em" }}
                        >
                          Experience the power of instant communication with our
                          real-time messaging feature. Whether it's a quick
                          update or a lengthy conversation, stay connected with
                          lightning-fast messaging that keeps you in sync with
                          your friends, family, and colleagues.
                        </p>
                        <a
                          href="#!"
                          className="fw-bold text-decoration-none link-primary"
                        >
                          Learn More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#3182CE"
                            class="bi bi-arrow-right-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-4 p-0 "
                    style={{ backgroundColor: "#212529" }}
                  >
                    <div className="card border-0 bg-transparent">
                      <div
                        className="card-body text-center p-5"
                        style={{
                          color: "white",
                          backgroundColor: "#212529",
                          border: "0.5px solid white",
                          margin: "10px",
                          paddingTop: "70px",
                          paddingBottom: "70px",
                        }}
                      >
                        <svg
                          width="90px"
                          height="90px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#3182CE"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M18 9V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V18L8 16M20 20L17.8062 18.5374C17.5065 18.3377 17.3567 18.2378 17.1946 18.167C17.0507 18.1042 16.9 18.0586 16.7454 18.031C16.5713 18 16.3912 18 16.0311 18H11.2C10.0799 18 9.51984 18 9.09202 17.782C8.71569 17.5903 8.40973 17.2843 8.21799 16.908C8 16.4802 8 15.9201 8 14.8V12.2C8 11.0799 8 10.5198 8.21799 10.092C8.40973 9.71569 8.71569 9.40973 9.09202 9.21799C9.51984 9 10.0799 9 11.2 9H16.8C17.9201 9 18.4802 9 18.908 9.21799C19.2843 9.40973 19.5903 9.71569 19.782 10.092C20 10.5198 20 11.0799 20 12.2V20Z"
                              stroke=""
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                        <h4
                          className="fw-bold text-uppercase mb-4"
                          style={{ fontSize: "1.6em", marginTop: "10px" }}
                        >
                          Text Chatting
                        </h4>
                        <p
                          className="mb-4 text-secondary"
                          style={{ fontSize: "1.2em" }}
                        >
                          Engage in clear and convenient text-based
                          conversations with our text chatting feature. From
                          sharing ideas to making plans, text chatting offers a
                          versatile way to communicate effectively. Experience
                          seamless communication within the comfort of our
                          intuitive interface.
                        </p>
                        <a
                          href="#!"
                          className="fw-bold text-decoration-none link-primary"
                          color="#3182CE"
                        >
                          Learn More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#3182CE"
                            class="bi bi-arrow-right-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-4 p-0"
                    style={{ backgroundColor: "#212529" }}
                  >
                    <div className="card border-0 bg-transparent">
                      <div
                        className="card-body text-center p-5"
                        style={{
                          color: "white",
                          backgroundColor: "#212529",
                          border: "0.5px solid white",
                          margin: "10px",
                          paddingTop: "70px",
                          paddingBottom: "70px",
                        }}
                      >
                        <svg
                          fill="#3182CE"
                          width="90px"
                          height="90px"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#3182CE"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <title>skype</title>{" "}
                            <path d="M21.75 18.406c0.406 0.844 0.656 1.75 0.656 2.75 0 3.438-2.781 6.188-6.219 6.188-1.063 0-2.031-0.25-2.906-0.719-0.625 0.125-1.281 0.188-1.969 0.188-5.906 0-10.688-4.813-10.688-10.688 0-0.75 0.094-1.469 0.25-2.156-0.531-0.938-0.875-2-0.875-3.125 0-3.438 2.781-6.219 6.219-6.219 1.188 0 2.313 0.375 3.281 0.969 0.563-0.094 1.188-0.156 1.813-0.156 5.875 0 10.719 4.781 10.719 10.688 0 0.781-0.125 1.531-0.281 2.281zM16.813 21.219c0.469-0.719 0.719-1.5 0.719-2.375 0-0.75-0.125-1.375-0.406-1.875s-0.719-0.938-1.219-1.281c-0.5-0.313-1.094-0.625-1.813-0.844s-1.5-0.438-2.375-0.625c-0.688-0.156-1.188-0.281-1.469-0.344-0.281-0.094-0.594-0.219-0.875-0.344-0.25-0.125-0.469-0.281-0.625-0.469-0.125-0.188-0.219-0.406-0.219-0.625 0-0.406 0.219-0.75 0.656-1.031 0.469-0.313 1.063-0.469 1.844-0.469 0.844 0 1.469 0.156 1.813 0.406 0.344 0.281 0.656 0.688 0.938 1.188 0.219 0.406 0.438 0.688 0.656 0.875 0.188 0.188 0.5 0.281 0.875 0.281 0.438 0 0.844-0.156 1.125-0.469 0.281-0.281 0.438-0.656 0.438-1.031s-0.125-0.813-0.344-1.219-0.563-0.813-1-1.156c-0.469-0.375-1.094-0.688-1.813-0.906-0.688-0.219-1.531-0.313-2.469-0.313-1.219 0-2.25 0.188-3.125 0.5-0.938 0.344-1.594 0.844-2.063 1.438-0.469 0.625-0.75 1.344-0.75 2.156 0 0.844 0.25 1.594 0.719 2.156 0.438 0.531 1.031 1.031 1.813 1.344 0.75 0.313 1.688 0.594 2.813 0.844 0.813 0.156 1.469 0.313 1.938 0.469 0.438 0.156 0.844 0.344 1.125 0.625 0.281 0.25 0.438 0.594 0.438 1 0 0.531-0.281 1-0.781 1.344-0.531 0.375-1.281 0.594-2.188 0.594-0.625 0-1.156-0.125-1.531-0.313s-0.688-0.406-0.875-0.688c-0.219-0.281-0.438-0.656-0.625-1.094-0.188-0.375-0.375-0.719-0.625-0.906-0.25-0.219-0.594-0.344-0.938-0.344-0.438 0-0.844 0.156-1.125 0.406-0.281 0.281-0.438 0.656-0.438 1.031 0 0.594 0.219 1.313 0.656 1.938s1.063 1.188 1.781 1.563c1.031 0.531 2.281 0.781 3.813 0.781 1.281 0 2.406-0.188 3.344-0.563 0.969-0.406 1.719-0.938 2.188-1.656z"></path>{" "}
                          </g>
                        </svg>
                        <h4
                          className="fw-bold text-uppercase mb-4"
                          style={{ fontSize: "1.6em", marginTop: "10px" }}
                        >
                          Video Chatting
                        </h4>
                        <p
                          className="mb-4 text-secondary"
                          style={{ fontSize: "1.2em" }}
                        >
                          Take your conversations to the next level with our
                          seamless video chatting feature. Connect face-to-face
                          with friends and loved ones, no matter where they are.
                          With high-quality video and crystal-clear audio, it's
                          like being in the same room, even when you're miles
                          apart.
                        </p>
                        <a
                          href="#!"
                          className="fw-bold text-decoration-none link-primary"
                          color="white"
                        >
                          Learn More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#3182CE"
                            class="bi bi-arrow-right-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uncomment the following code to add sections */}
      {/* <div style={{ width: "100vw", height: "100vh", display: "flex", fontSize: "1.5em" }}>
        <div style={{ ...sectionStyles }}>
          <div style={{ ...sectionBackgroundStyles, backgroundImage: "url(https://cdn.dribbble.com/users/1488968/screenshots/11374023/media/8e0cc1fff84afe8cbd3b86f6504ba840.jpg)" }} />
          <div style={contentStyles}>
            <h1>Real Time Messaging</h1>
            <p>Stay connected with instant, real-time messages.</p>
          </div>
        </div>
        <div style={{ ...sectionStyles }}>
          <div style={{ ...sectionBackgroundStyles, backgroundImage: "url(https://c8.alamy.com/comp/2D54GRP/imessage-interface-texting-mockup-telegram-messenger-flat-vector-message-bubbles-chat-interface-on-black-background-2D54GRP.jpg)" }} />
          <div style={contentStyles}>
            <h1>Text Chatting</h1>
            <p>Enjoy clear and convenient text-based communication.</p>
          </div>
        </div>
      </div>

      <div style={{ width: "100vw", height: "100vh", display: "flex", fontSize: "1.5em" }}>
        <div style={{ ...sectionStyles }}>
          <div style={{ ...sectionBackgroundStyles, backgroundImage: "url(https://wittysparks.com/wp-content/uploads/2020/07/online-video-chat-1024x687.jpg)" }} />
          <div style={contentStyles}>
            <h1>Video Chatting</h1>
            <p>Engage in face-to-face conversations with seamless video calls.</p>
          </div>
        </div>
        <div style={{ ...sectionStyles }}>
          <div style={{ ...sectionBackgroundStyles, backgroundImage: "url(https://thumbs.dreamstime.com/b/set-black-emoticon-vector-isolated-orange-background-emoji-vector-smile-icon-icon-web-81343069.jpg)" }} />
          <div style={contentStyles}>
            <h1>Emojis</h1>
            <p>Express yourself better with a wide range of emojis.</p>
          </div>
        </div>
      </div> */}

      {/* Bootstrap Icons */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="chevron-right" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M12.354 8.354a.5.5 0 0 0 0-.708l-5-5a.5.5 0 1 0-.708.708L11.293 8l-4.647 4.646a.5.5 0 0 0 .708.708l5-5z"
          />
        </symbol>
      </svg>
    </div>
  );
};

export default CoverPage;
