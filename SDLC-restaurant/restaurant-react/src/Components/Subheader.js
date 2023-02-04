import React, { Component } from 'react'

class Subheader extends Component {
    render() {
        return (
            <div class="all-page-title page-breadcrumb">
                <div class="container text-center">
                    <div class="row">
                        <div class="col-lg-12">
                            <h1>{this.props.title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Subheader