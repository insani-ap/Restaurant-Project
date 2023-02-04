import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

export default class HomeCustomerReview extends Component {
  constructor() {
    super();
    this.state = {
      commentMenu: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/orderlist")
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw res;
      })
      .then((dataComment) =>
        this.setState({
          commentMenu: dataComment,
        })

      ).catch(error => {
        console.error("Error fetching data: ", error);
      });
  }

  render() {
    return (
      <Carousel indicators={false} controls={false} interval={5000}>
        {
          this.state.commentMenu.map(comment =>
            {
              return(
              <Carousel.Item>
                <img src="/assets/images/bg-carousel.jpg" style={{ border: 'dashed 2px #d75001' }}></img>
                <Carousel.Caption>
                  <div style={{ color: 'black', marginTop: '-55%' }}>
                    <div class="heading-title text-center">
                      <h2>Customer Reviews</h2>
                      <p>
                        {
                          comment.menu.map(menu =>
                            {
                              return menu.name+"; "
                            }
                          )
                        }
                      </p>
                      <img src="/assets/images/quotations-button.png" style={{ width: '15%', marginTop: '5%', marginBottom: '1%' }}></img>
                    </div>
                    <h5 class="mt-4 mb-0"><strong class="text-warning text-uppercase">{comment.user.name}</strong></h5>
                    <h5>Customer</h5>
                    <p class="m-0 pt-3">{comment.commentTitle}</p>
                    <p class="m-0 pt-3"><i>{comment.commentSubTitle}</i>
                    </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              )
            }
          )
        }
      </Carousel>
    );
  }
}