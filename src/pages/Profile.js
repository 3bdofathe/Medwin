/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ph1 from "../images/about-img.png";
import ph2 from "../images/img-1.png";
import ph3 from "../images/img-2.png";
import ph4 from "../images/img-3.png";
import ph5 from "../images/quick-icon.png";
import ph6 from "../images/img-4.png";
import ph7 from "../images/img-5.png";

import "./styleOfProfile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        // console.log("User is not logged in");
        toast.success("User is not logged in", {
          position: "top-center",
        });
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      // console.log("User logged out successfully!");
      toast.success("User logged out Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  const treatment = [
    {
      id: 1,
      num: "01",
      head: "Nephrologist Care",
      btn: (
        <button
          style={{
            border: "1px solid var(--bluecolor)",
            color: "var(--bluecolor)",
          }}
        >
          READ MORE
        </button>
      ),
    },
    {
      id: 2,
      num: "01",
      head: "Eye Care",
      btn: <button>READ MORE</button>,
    },
    {
      id: 3,
      num: "03",
      head: "Pediatrician Clinic",
      btn: <button>READ MORE</button>,
    },
    {
      id: 4,
      num: "04",
      head: "Prenatal Care",
      btn: <button>READ MORE</button>,
    },
  ];

  // الكود بتاع اني بحجز بيه داتا booking
  function handelSubmit() {
    fetch("http://localhost:3100/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book }),
    }).then(() => {
      navigate("/");
    });
  }

  const [book, setBook] = useState({
    name: "",
    phone: "",
    email: "",
    docName: "",
    depart: "",
    date: "",
  });

  // الكود الي بتواصل مع الصفحه contact

  function sendContact(){
    fetch("http://localhost:3100/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact }),
    }).then(() => {
      navigate("/");
    });
  }

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });


  return (
    <div>
      {userDetails ? (
        <>
          {/* start a header section */}
          <header className="head">
            <div className="info">
              <div>
                <i className="fa-solid fa-phone"></i>
                <a href="#"> call: 01144152172</a>
              </div>
              <div>
                <i className="fa-solid fa-envelope"></i>
                <a href="#"> demo@gmail.com</a>
              </div>
              <div>
                <i className="fa-solid fa-location-dot"></i>
                <a href="#"> Egypt, Banha</a>
              </div>
            </div>

            <Navbar expand="lg" className="nav">
              <Container className="contain">
                <Navbar.Brand className="mid" href="#">
                  MIDWIN
                </Navbar.Brand>
                <Navbar.Toggle
                  style={{ background: "white" }}
                  aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link className="alink" href="#">
                      {userDetails.email}
                    </Nav.Link>
                    <Nav.Link className="alink" href="#" onClick={handleLogout}>
                      Log out <i className="fa-solid fa-user"></i>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div className="txt">
              <h1>We care Of You</h1>
              <p>
                When looking at its layout. The point of using Lorem Ipsum is
                that it has a more-or-less normal distribution of letters, as
                opposed to
              </p>
              <button>READ MORE</button>
            </div>
          </header>
          {/* end a header section */}
          {/* start a booking section */}
          <section className="booking">
            <div className="book">
              <h1>
                Book <span style={{ color: "#0cb7d6" }}>Appointment</span>
              </h1>
              <form onSubmit={handelSubmit}>
                <div className="book1">
                  <div className="col1">
                    <label>Patient Name</label>
                    <input
                      value={book.name}
                      onChange={(e) => {
                        setBook({ ...book, name: e.target.value });
                      }}
                      style={{ marginBottom: "20px" }}
                      name="name"
                      type="text"
                      required
                    />
                    <label>Phone Number</label>
                    <input
                      required
                      name="phone"
                      type="text"
                      value={book.phone}
                      onChange={(e) => {
                        setBook({ ...book, phone: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col1">
                    <label>Email</label>
                    <input
                      required
                      value={book.email}
                      onChange={(e) => {
                        setBook({ ...book, email: e.target.value });
                      }}
                      style={{ marginBottom: "20px" }}
                      name="mail"
                      type="email"
                    />
                    <label>Doctor's Name</label>
                    <select
                      required
                      name="doctor"
                      value={book.docName}
                      onChange={(e) => {
                        setBook({ ...book, docName: e.target.value });
                      }}
                    >
                      <option disabled>Choose...</option>
                      <option>Ali hassan</option>
                      <option>Mohamed ahmed</option>
                      <option>Mohamed ali</option>
                    </select>
                  </div>
                  <div className="col1">
                    <label>Department</label>
                    <select
                      required
                      name="depart"
                      style={{ marginBottom: "20px" }}
                      value={book.depart}
                      onChange={(e) => {
                        setBook({ ...book, depart: e.target.value });
                      }}
                    >
                      <option disabled>Choose...</option>
                      <option>Surgery</option>
                      <option>Eyes</option>
                      <option>Stomach</option>
                    </select>

                    <label>Choose Date</label>
                    <input
                      required
                      type="date"
                      name="date"
                      value={book.date}
                      onChange={(e) => {
                        setBook({ ...book, date: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="book2">
                  <button
                    type="submit"
                    // onClick={(params) => {

                    // }}
                  >
                    Book
                  </button>
                </div>
              </form>
            </div>
          </section>
          {/* end a booking section */}

          {/* start a about section  */}
          <section className="about">
            <div className="col2">
              <h1>About Hospital</h1>
              <p>
                has a more-or-less normal distribution of letters, as opposed to
                using 'Content here, content here', making it look like readable
                English. Many desktop publishing packages and web page editors
                has a more-or-less normal distribution of letters, as o
              </p>
              <button>Read More</button>
            </div>
            <div className="col2 bot2">
              <img src={ph1} width="100%" height="outo" draggable="false" />
            </div>
          </section>
          {/* end a about section  */}
          {/* start a section treatment */}
          <section className="treat">
            <h1 className="h1">Hospital Treatment</h1>
            <div className="part">
              {treatment.map((item) => {
                return (
                  <div className="col3">
                    <h1>{item.num}</h1>
                    <h2>{item.head}</h2>
                    <p>
                      alteration in some form, by injected humour, or randomised
                      words which don't look even slightly e sure there isn't
                      anything
                    </p>
                    {item.btn}
                  </div>
                );
              })}
            </div>
          </section>
          {/* end a section treatment */}
          {/* start a section doctors */}
          <section className="doctor">
            <h1>OUR DOCTORS</h1>
            <div className="doc">
              <div className="col4">
                <img src={ph2} alt="photo" width="100%" height="outo" />
                <h2>Humour</h2>
                <h3>MBBS</h3>
                <div className="doc-icon">
                  <i className="fa-brands fa-facebook-f"></i>
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-linkedin"></i>
                </div>
              </div>
              <div className="col4">
                <img src={ph3} alt="photo" width="100%" height="outo" />
                <h2>Jenni</h2>
                <h3>MBBS</h3>
                <div className="doc-icon">
                  <i className="fa-brands fa-facebook-f"></i>
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-linkedin"></i>
                </div>
              </div>
              <div className="col4">
                <img src={ph4} alt="photo" width="100%" height="outo" />
                <h2>Morco</h2>
                <h3>MBBS</h3>
                <div className="doc-icon">
                  <i className="fa-brands fa-facebook-f"></i>
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-linkedin"></i>
                </div>
              </div>
            </div>
          </section>
          {/* end a section doctor */}
          {/* start a section Testimonial */}
          <section className="test">
            <h1>Our Testimonial</h1>
            <div className="test1">
              <div className="tee">
                <h5>Morijorch</h5>
                <img src={ph5} alt="wef" width="15px" height="15px" />
              </div>
              <p>
                editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in
                their infancy. Variouseditors now use Lorem Ipsum as their
                default model text, and a search for 'lorem ipsum' will uncover
                many web sites still in their infancy. Variouseditors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various
              </p>
            </div>
          </section>
          {/* end a section Testimonial */}
          {/* start a section contact */}
          <section className="contact">
            <h1>Contact US</h1>
            <div className="con">
              <form onSubmit={sendContact} className="col5 text">
                <input
                  value={contact.name}
                  onChange={(e) => {
                    setContact({ ...contact, name: e.target.value });
                  }}
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                <input
                value={contact.phone}
                onChange={(e) => {
                  setContact({ ...contact, phone: e.target.value });
                }}
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                />
                <input value={contact.email}
                  onChange={(e) => {
                    setContact({ ...contact, email: e.target.value });
                  }} type="email" name="email" placeholder="Email" required />
                <textarea value={contact.message}
                  onChange={(e) => {
                    setContact({ ...contact, message: e.target.value });
                  }} placeholder="Message" required></textarea>

                <button type="submit">Send</button>
              </form>
              <div className="col5">
                <iframe
                  width="100%"
                  height="600px"
                  loading="lazy"
                  allowFullScreen
                  style={{ border: "none" }}
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=new%20york&zoom=11&maptype=satellite"
                ></iframe>
                <a href="https://www.fluxaiimagegenerator.net"></a>
              </div>
            </div>
          </section>
          {/* end a section contact */}

          {/* start a section footer */}
          <section className="footer">
            <div className="foot">
              <div className="col6 add">
                <div
                  className="aaa"
                  style={{ display: "flex", marginBottom: "35px" }}
                >
                  <i className="fa-solid fa-circle"></i>
                  <h1>ADDRESS</h1>
                </div>
                <a href="#">
                  <i className="fa-solid fa-location-dot"></i>
                  <h6>Location</h6>
                </a>
                <a href="#">
                  <i className="fa-solid fa-phone"></i>
                  <h6>Call: 01144152172</h6>
                </a>
                <a href="#" style={{ marginBottom: "40px" }}>
                  <i className="fa-solid fa-envelope"></i>
                  <h6>demo@gmail.com</h6>
                </a>
                <div className="icon2">
                  <i className="fa-brands fa-facebook-f"></i>
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-linkedin"></i>
                </div>
              </div>
              <div className="col6 use">
                <div
                  className="aaa"
                  style={{ display: "flex", marginBottom: "35px" }}
                >
                  <i className="fa-solid fa-circle"></i>
                  <h1>USEFUL LINK</h1>
                </div>
                <div className="links">
                  <a href="#" style={{ color: "#0cb7d6" }}>
                    Home
                  </a>
                  <a href="#">About</a>
                  <a href="#">Doctors</a>
                  <a href="#">News</a>
                  <a href="#">Treatment</a>
                  <a href="#">Contact US</a>
                </div>
              </div>
              <div className="col6 help">
                <div
                  className="aaa"
                  style={{ display: "flex", marginBottom: "35px" }}
                >
                  <i className="fa-solid fa-circle"></i>
                  <h1>HELP&SUPPORT</h1>
                </div>
                <p>
                  Opposed to using 'Content here, content here', making it look
                  like readable English. Many desktop publishing packages and
                  web page
                </p>
              </div>
              <div className="col6">
                <div
                  className="aaa"
                  style={{ display: "flex", marginBottom: "35px" }}
                >
                  <i className="fa-solid fa-circle"></i>
                  <h1>NEWS</h1>
                </div>
                <div className="new1">
                  <img src={ph6} alt="qwd" />
                  <p>
                    Normal
                    <br /> distribution
                  </p>
                </div>
                <div className="new1">
                  <img src={ph7} alt="qwd" />
                  <p>
                    Normal
                    <br /> distribution
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* end a section footer */}
          <div className="end">
            <p>
              2024 All Rights Reserved. Design by{" "}
              <a href="">Eng / Abdelrahim Fathy</a>
            </p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
