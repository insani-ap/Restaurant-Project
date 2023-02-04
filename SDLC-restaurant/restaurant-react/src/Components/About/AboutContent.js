import React from "react";

export default class AboutContent extends React.Component {
  render() {
    return (
      <div class="about-section-box">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 text-center">
              <div
                class="inner-column"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  opacity: "0.9",
                  borderRadius: "10px",
                }}
              >
                <h1>
                  Welcome To <span>Nexsoft Restaurant</span>
                </h1>
                <p>
                  At Nexsoft Restaurant, we source our food from the Mid-Atlantic’s
                  finest farms and purveyors. The centerpiece of our open
                  kitchen is a wood-burning hearth that allows us to showcase
                  the region’s versatility while staying true to its classic
                  cooking methods. In our dining room, guests will find bare
                  tables and exposed historic brick walls, service that’s
                  refined but relaxed, and a dining experience that’s
                  unpretentious, delicious, and fun.
                </p>
                <a
                  class="btn btn-lg btn-circle btn-outline-new-white"
                  href="/reservation"
                >
                  Reservation
                </a>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <img
                src="/assets/images/about-img.jpg"
                alt=""
                class="img-fluid"
              ></img>
            </div>
            <div class="col-md-12">
              <div
                class="inner-pt"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  opacity: "0.9",
                  borderRadius: "10px",
                }}
              >
                <p>
                  Nexsoft Restaurant is a restaurant on Tangerang, Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
