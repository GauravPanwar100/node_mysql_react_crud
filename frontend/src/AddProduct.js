import { Modal, Button, Toast, Alert } from "react-bootstrap"
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


export function AddProduct(props) {
    const [productName, setproductName] = useState("");
  const [os, setos] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [lastCheckedOutDate, setlastCheckedOutDate] = useState("2021-09-30");
  const [lastCheckOutBy, setlastCheckOutBy] = useState("Gaurav Panwar");
  const [isCheckedOut, setisCheckedOut] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [message, setMessage] = useState("");

//   const [isEdit, setIsEdit] = useState(false);
//   const [rowToBeEdit, setRowToBeEdit] = useState({});

    useEffect(() => {
        if (props.rowToBeEdit) {
            setproductName(props.rowToBeEdit.product_name);
            setos(props.rowToBeEdit.os);
            setmanufacturer(props.rowToBeEdit.manufacturer);
            setlastCheckedOutDate(props.rowToBeEdit.lastCheckedOutDate);
            setlastCheckOutBy(props.rowToBeEdit.lastCheckOutBy);
        }
    }, [props]);

  const onSubmit = async (e) => {
    if (props.rowToBeEdit !== null) {
      const res = await axios.put(`http://localhost:3001/products/edit-product/${props.rowToBeEdit.id}`, { productName: productName, os: os, manufacturer: manufacturer, lastCheckedOutDate: lastCheckedOutDate, lastCheckOutBy: lastCheckOutBy });
      props.onHide();
      return;
    }
    const response = await axios.post('http://localhost:3001/products/add-products', { product_name: productName, os: os, manufacturer: manufacturer, lastCheckedOutDate: lastCheckedOutDate, lastCheckOutBy: lastCheckOutBy, isCheckedOut: isCheckedOut });
    if (response && response.data.success === false) {
      let msg = response.data.message;
      setMessage(msg);
    }
    // fetchData();
  }

    return (
      <>
      

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="App">
      <label>Product Name:</label>
      <input type="text" name="productName" onChange={(e) => setproductName(e.target.value)} value={productName}/>
      <label>OS:</label>
      <input type="text" name="os" onChange={(e) => setos(e.target.value)} value={os}/>
      <label>Manufacturer:</label>
      <input type="text" name="manufacturer" onChange={(e) => setmanufacturer(e.target.value)} value={manufacturer}/>
      <label>LastCheckedOutDate:</label>
      <input type="text" name="lastCheckedOutDate" onChange={(e) => setlastCheckedOutDate(e.target.value)} value={lastCheckedOutDate}/>
      <label>LastCheckOutBy:</label>
      <input type="text" name="lastCheckOutBy" onChange={(e) => setlastCheckOutBy(e.target.value)} value={lastCheckOutBy}/>
      
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={(e) => onSubmit(e)}>Save</Button>
        </Modal.Footer>
        {message !== "" &&
        <Alert variant="danger">
        <Alert.Heading>{message}</Alert.Heading>
        
      </Alert>
      }
      </Modal>
      </>
    );
  }
  
 