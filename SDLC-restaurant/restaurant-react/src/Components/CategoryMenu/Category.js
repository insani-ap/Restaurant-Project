import React, { Component } from "react";
import { ListCat2 } from "./ListCat2";

class Category extends Component {
  render() {
    return (
      <div class="menu-box">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="heading-title text-center">
                <h2>The Comfort You Crave</h2>
                <p>
                  Nexsoft offers a 4-Course Prix Fixe. The menu includes all
                  snacks and one selection from the 1st Course, Main Course, &
                  Dessert. We are unable to accommodate most allergies or dietary
                  restrictions. Please contact us with specific questions.
                </p>
              </div>
            </div>
          </div>
          <ListCat2 />
        </div>
      </div>
    );
  }
}
export default Category;
