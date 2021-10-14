import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AddProduct } from './AddProduct';
import axios from 'axios';
import "./App.css";
import moment, { now } from 'moment';

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [rowToBeEdit, setRowToBeEdit] = useState({});
  const [checkedMessage, setCheckedMessage] = useState("");

  useEffect(async () => {

    fetchData();

  }, []);

  async function fetchData() {
    const response = await axios.get('http://localhost:3001/products/get');
    setProductsList(response.data.data);
  }

  const setCheckedStatus = async (e, item) => {

  const todayDate = new Date();
  const getHours = todayDate.getHours();
  const startTime = 9;
  const endTime = 17;

  if(!(getHours >= startTime && getHours <= endTime)) {
    setCheckedMessage(`Check in/out can only perfomed between ${startTime} to ${endTime} hours.`);
    return false;
  }

    const response = await axios.put(`http://localhost:3001/products/changeStatus/${item.id}`);
    fetchData();
    // setProductsList(response.data.data);
  }

  const onDelete = async (e, item) => {
    const res = await axios.delete(`http://localhost:3001/products/delete-product/${item.id}`);

    fetchData();
  }

  const onEdit = async (e, item) => {
    setIsEdit(true);
    setRowToBeEdit(item);
    setModalShow(true);
  }

  if (checkedMessage !== "") {
    setTimeout(() => {
      setCheckedMessage("");
    }, 3000);
  }
  

  return (
    <div className="App">
	<Button variant="success" onClick={() => setModalShow(true)}>Add Item</Button>
  <AddProduct
          show={modalShow}
          onHide={() => setModalShow(false)}
          rowToBeEdit={ isEdit ? rowToBeEdit : null}
        />
        {checkedMessage !== "" &&
          <Alert variant="warning">
            {checkedMessage}
          </Alert>
        }
      <Table striped bordered hover size="sm" responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Device</th>
            <th>OS</th>
            <th>Manufacturer</th>
            <th>Last CheckedOut Date</th>
            <th>Last CheckOut By</th>
            <th>Is Checked Out</th>
          </tr>
        </thead>
        <tbody>
        {productsList.map((product, index) => (
        <tr key={index}>
          <td>{product.id || "--"}</td>
          <td>{product.product_name || "--"}</td>
          <td>{product.os || "--"}</td>
          <td>{product.manufacturer || "--"}</td>
          <td>{product.lastCheckedOutDate || "--"}</td>
          <td>{product.lastCheckOutBy || "--"}</td>
          <td>{product.isCheckedOut === 0 ? "No" : "Yes" || "--"}</td>
          <td>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${index}`}>
                  <strong>{`Checkout ${moment(new Date()).diff(moment(product['lastCheckedOutDate']), 'days')} days ago.`}</strong>
                </Tooltip>
              }
            >
              <Button variant={product.isCheckedOut === 0 ? "info" : "secondary"} onClick={(e) => setCheckedStatus(e, product)}>{product.isCheckedOut === 0 ? "Check In" : "Check Out"}</Button>
            </OverlayTrigger>
          </td>
          <td><Button variant="primary" onClick={(e) => onEdit(e, product)}>Edit</Button></td>
          <td><Button variant="danger" onClick={(e) => onDelete(e, product)}>Delete</Button></td>
        </tr>
        ))}
          
        </tbody>
      </Table>
    </div>
  );
}

export default App;
