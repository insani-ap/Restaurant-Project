import Modal from "react-bootstrap/Modal";
import React from "react";
import "../../assets/css/table.css";

export default class ReservationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: [],
      seat: new Map(),
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
    fetch(
      "http://localhost:8080/seatresv?" +
        new URLSearchParams({
          date: this.props.date,
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
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange(e) {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      seat: prevState.seat.set(item, isChecked),
    }));
  }

  check = () => {
    localStorage.removeItem("seatUser");

    this.setState({ show: false });
    let seatUser = [];
    let i = 0;
    this.state.seat.forEach(function (value, key) {
      if (value === true) {
        seatUser[i] = { id: key };
      } else {
        i--;
      }
      i++;
    });
    localStorage.setItem("seatUser", JSON.stringify(seatUser));
    alert("Seat have been successfully saved.");
    this.setState({ seat: new Map() });
  };

  render() {
    return (
      <>
        <div class="submit-button text-center">
          <button class="btn btn-common" type="button" onClick={this.showModal}>
            Show Seat
          </button>
        </div>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>Select Your Seat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ paddingLeft: "40px" }}>
              {this.state.data.map((seat) => {
                if (seat.classSeat === "TableFull") {
                  return (
                    <>
                      <input type="checkbox" id={seat.id} disabled></input>
                      <label for={seat.id}>
                        <div class="tableFull">
                          <p class="tableTengah">{seat.name}</p>
                          <p class="tableBawah">{seat.capacity}</p>
                        </div>
                      </label>
                    </>
                  );
                } else if (seat.classSeat === "TablePart") {
                  return (
                    <>
                      <input
                        type="checkbox"
                        id={seat.id}
                        value={seat.id}
                        onChange={this.handleChange}
                      ></input>
                      <label for={seat.id}>
                        <div class="tablePart">
                          <p class="tableTengah">{seat.name}</p>
                          <p class="tableBawah">{seat.capacity}</p>
                        </div>
                      </label>
                    </>
                  );
                } else {
                  return (
                    <>
                      <input
                        type="checkbox"
                        id={seat.id}
                        value={seat.id}
                        onChange={this.handleChange}
                      ></input>
                      <label for={seat.id}>
                        <div class="tableFree">
                          <p class="tableTengah">{seat.name}</p>
                          <p class="tableBawah">{seat.capacity}</p>
                        </div>
                      </label>
                    </>
                  );
                }
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-common" onClick={this.hideModal}>
              Cancel
            </button>
            <button class="btn btn-common" onClick={this.check}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
