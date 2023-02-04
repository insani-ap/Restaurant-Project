import React, { Component } from 'react'

class HomeGallery extends Component {
    render() {
        return (
            <div class="gallery-box">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="heading-title text-center">
                                <h2>Gallery</h2>
                                <p>We are complying with all federal, state, and local guidelines to ensure the health and safety of our guests and employees. We remain flexible to the changing requirements and appreciate your patience.
We have modified floor plans based on government social-distancing guidelines.
The timing of reservations are managed to allow for dining spaces to be properly sanitized after each guest leaves and before another party is seated.</p>
                            </div>
                        </div>
                    </div>
                    <div class="tz-gallery">
                        <div class="row">
                            <div class="col-sm-12 col-md-4 col-lg-4">
                                <a class="lightbox" href="/assets/images/gallery-img-01.jpg">
                                    <img class="img-fluid" src="/assets/images/gallery-img-01.jpg" alt="Gallery Images"></img>
                                </a>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <a class="lightbox" href="/assets/images/gallery-img-02.jpg">
                                    <img class="img-fluid" src="/assets/images/gallery-img-02.jpg" alt="Gallery Images"></img>
                                </a>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <a class="lightbox" href="/assets/images/gallery-img-03.jpg">
                                    <img class="img-fluid" src="/assets/images/gallery-img-03.jpg" alt="Gallery Images"></img>
                                </a>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-4">
                                <a class="lightbox" href="/assets/images/gallery-img-04.jpg">
                                    <img class="img-fluid" src="/assets/images/gallery-img-04.jpg" alt="Gallery Images"></img>
                                </a>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <a class="lightbox" href="/assets/images/gallery-img-05.jpg">
                                    <img class="img-fluid" src="/assets/images/gallery-img-05.jpg" alt="Gallery Images"></img>
                                </a>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <a class="lightbox" href="/assets/images/gallery-img-06.jpg">
                                    <img class="img-fluid" src="/assets/images/gallery-img-06.jpg" alt="Gallery Images"></img>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeGallery