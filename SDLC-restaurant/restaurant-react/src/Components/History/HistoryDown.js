import React from "react";
import { Table, Alert } from "react-bootstrap";
import HistoryDownModal from "./HistoryDownModal";

export default class HistoryDown extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch(
      "http://localhost:8080/orderlist/get?" +
        new URLSearchParams({
          id: JSON.parse(localStorage.getItem("currentUser")).id,
        })
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) =>
        this.setState({
          data: data,
        })
      )
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  render() {
    if (this.state.data.length === 0) {
      return <Alert variant="danger">There is nothing to review.</Alert>;
    } else {
      return (
        <>
          <Table striped bordered hover variant="light" responsive="xl">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Ordered Menu</th>
                <th>Review Title</th>
                <th>Review Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            {this.state.data.map((comments, index) => {
              if (
                comments.commentTitle === null ||
                comments.commentSubTitle === null
              ) {
                return (
                  <>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{comments.user.name}</td>
                        <td>
                          {comments.menu.map((menu) => {
                            return <p>{menu.name}</p>;
                          })}
                        </td>
                        <td>{comments.commentTitle}</td>
                        <td>{comments.commentSubTitle}</td>
                        <td>
                          <HistoryDownModal
                            id={comments.id}
                            jsonData={this.state.data}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              } else {
                return (
                  <>
                    <tbody>
                      <tr style={{ height: "100px" }}>
                        <td>{index + 1}</td>
                        <td>{comments.user.name}</td>
                        <td>
                          {comments.menu.map((menu) => {
                            return menu.name + "; ";
                          })}
                        </td>
                        <td>{comments.commentTitle}</td>
                        <td>{comments.commentSubTitle}</td>
                        <td>Thanks For Your Review</td>
                      </tr>
                    </tbody>
                  </>
                );
              }
            })}
          </Table>
        </>
      );
    }
  }
}
