import React from 'react';
import { Modal } from 'react-bootstrap';

export default class HistoryDownModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          data: [],
          id: '',
          commentTitle: '',
          commentContent: ''
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.submitModal = this.submitModal.bind(this);
      }
    
    showModal = () => { 
        this.setState({ show: true });
        this.setState({data: this.props.jsonData})
    };
    
    hideModal = () => { this.setState({ show: false }); };

    submitModal() {
        this.state.data.map(data =>
            {
                data.commentTitle = this.state.commentTitle;
                data.commentSubTitle = this.state.commentContent;
            }
        )
        fetch("http://localhost:8080/orderlist/update?"+new URLSearchParams({id: this.props.id}), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.data)
        })
        alert("Your review have been successfully saved. Thankyou for your review.");
        window.location.href="/history"
    };

    render() {
        return (
            <>
            <button class="btn btn-common" type="button" onClick={this.showModal}>Add review</button>
            <Modal show={this.state.show} onHide={this.hideModal}>
                <form onSubmit={this.submitModal}>
                    <Modal.Header>
                        <Modal.Title>Add Your Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input 
                            type="text"
                            placeholder="Review Title"
                            onChange={(e) => this.setState({ commentTitle: e.target.value })}
                            required
                        ></input>
                        <textarea
                            placeholder="Review Content"
                            rows="10"
                            style={{width: '100%', resize: 'none', padding: '20px'}}
                            onChange={(e) => this.setState({ commentContent: e.target.value })}
                            required
                        ></textarea>
                    </Modal.Body>
                    <Modal.Footer>
                    <button class="btn btn-common" onClick={this.hideModal}>Cancel</button>
                    <button class="btn btn-common" type="submit">Save</button>
                    </Modal.Footer>
                </form>
            </Modal>
            </>
        )
    }
}