import React, { Component } from "react";

class HomeContent extends Component {
  render() {
    return (
      <div style={{ paddingTop: "60px" }}>
        <div class="about-section-box">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    opacity: "0.9",
                    borderRadius: "10px",
                  }}
                  class="inner-column"
                >
                  <h1>
                    Welcome To <span>Nexsoft Restaurant</span>
                  </h1>
                  <h4>Little Story</h4>
                  <p>
                    Our goal is to showcase the quality and diversity of the
                    ingredients and the wonderful people who raise, grow and
                    produce them. We choose to cook over embers in our
                    wood-burning hearth because it allows us to give a nod to
                    the historic food culture of our area while growing and
                    creating something new.
                  </p>
                  <a
                    class="btn btn-lg btn-circle btn-outline-new-white"
                    href="/reservation"
                  >
                    Reservation
                  </a>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12">
                <img
                  src="/assets/images/about-img.jpg"
                  alt=""
                  class="img-fluid"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeContent;
