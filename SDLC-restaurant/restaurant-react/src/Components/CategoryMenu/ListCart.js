import Modal from "react-bootstrap/Modal";
import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount, selectMenu } from "../../Redux/counterSlice";
import Table from "react-bootstrap/Table";
import { decrement } from "../../Redux/counterSlice";
import axios from "axios";
function ListCart(props) {
  const [show, setShow] = useState(false);
  let [totalPrice, setTotalPrice] = useState(0);
  const [listMenu, setListMenu] = useState([]);
  const count = useSelector(selectCount);
  const selectedMenus = useSelector(selectMenu);
  const dispatch = useDispatch();
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };
  const saveToDb = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("currentUser"));
    let resvData = JSON.parse(localStorage.getItem("resvData"));
    axios
      .post("http://localhost:8080/orderlist/add", {
        menu: selectedMenus,
        user: users,
      })
      .then((response) => {
        let orderData = {
          id: response.data.id,
          menu: response.data.menu,
          user: response.data.user,
        };
        axios
          .post("http://localhost:8080/resvpublic/", {
            name: resvData.name,
            guestAmount: resvData.guestAmount,
            date: resvData.date,
            time: resvData.time,
            status: resvData.status,
            timeInterval: resvData.timeInterval,
            orderList: orderData,
            notes: resvData.notes,
            seat: resvData.seat,
            user: resvData.user,
          })
          .then(
            (window.location.href = "/history"),
            localStorage.removeItem("listResv")
          );
      });
    alert("Your order have been successfully added to reservation");
  };
  return (
    <>
      <div>
        <a
          style={{ marginLeft: "10px" }}
          class="navbar-brand"
          onClick={showModal}
        >
          <img
            width="30px"
            height="30px"
            src=" /assets/images/cart.png"
            alt="test"
          />
          <span style={{ marginLeft: "10px" }}>{count}</span>
        </a>
      </div>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Cart Items : {count}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedMenus.map((data, index) => {
                {
                  totalPrice = totalPrice + data.price;
                }
                return (
                  <tr>
                    <td>{data.name}</td>
                    <td>
                      {data.valuta} {data.price}
                    </td>
                    <td width="30px">
                      <button
                        onClick={() => dispatch(decrement(index))}
                        class="btn btn-common"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>Total Price :</td>
                <td>USD {totalPrice}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <button class="btn btn-common" onClick={hideModal}>
            Cancel
          </button>
          <button class="btn btn-common" onClick={saveToDb}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export { ListCart };
