import React from "react";

export default class AboutFooter extends React.Component {
  render() {
    return (
      <div class="contact-imfo-box">
        <div class="container">
          <div class="row">
            <div class="col-md-4 arrow-right">
              <i class="fa fa-volume-control-phone"></i>
              <div class="overflow-hidden">
                <h4>Phone</h4>
                <p class="lead">+1 234-567-890</p>
              </div>
            </div>
            <div class="col-md-4 arrow-right">
              <i class="fa fa-envelope"></i>
              <div class="overflow-hidden">
                <h4>Email</h4>
                <p class="lead">teamcbatch5@gmail.com</p>
              </div>
            </div>
            <div class="col-md-4">
              <i class="fa fa-map-marker"></i>
              <div class="overflow-hidden">
                <h4>Location</h4>
                <p class="lead">
                  Home Living Park Tower 2 Lt 2, Tangerang, 15810 Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
