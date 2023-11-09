import React, { useState,useEffect,useContext } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Quickadd.css";
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import transactionContext from '../context/transactions/transactionContext';

import EWallet from "../images/E-Wallet.svg";
const Quickadd = () => {

  const context = useContext(transactionContext);
    const {addTransactions} = context;

    // State to manage the selected option
    const [selectedValue, setSelectedValue] = useState("");
    const [category, setCategory] = useState("");
    const [Recurring,setRecurring] = useState("No");

    const [transaction,setTransaction] = useState({name: "", type: "",category: "",recurring: "",
    repeat: "",price:""})

    const handleClick = (e)=>{
        e.preventDefault(); //So that page does not reload
        addTransactions(transaction.name,selectedValue,category,Recurring,transaction.repeat,Number(transaction.price));
        setTransaction({name: "", type: "",category:"",recurring:"",repeat:"",price:""})
        setCategory("");
        setSelectedValue("");
        setRecurring("No");
    }
    const onChange = (e)=>{
        setTransaction({...transaction,[e.target.name]: e.target.value})
    }
  const [showRepeat, setShowRepeat] = useState(false);

  const handleYes = (e) => {
    e.preventDefault();
    setShowRepeat(true);
    setRecurring("Yes");
  };
  const handleNo = (e) => {
    e.preventDefault();
    setShowRepeat(false);
    setRecurring("No");
  };

  // Effect to change the color based on the selected option
  useEffect(() => {
    // Function to update the color
    const updateColor = () => {
      const selectElement = document.getElementById("mySelect");
      if (selectElement) {
        selectElement.style.color = selectedValue === "" ? "#aaa" : "black";
      }
    };

    // Call the updateColor function
    updateColor();

    const selectElement = document.getElementById('mySelect1');
    if (category === '') {
      selectElement.style.color = '#aaa'; // Default color
    } else {
      selectElement.style.color = 'black'; // Active color
    }
  }, [category,selectedValue]); // Dependence on category,selectedValue to update when it changes  

  const handleSelectChange = (event) => {
    setCategory(event.target.value);
  };
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileNamesArray = [];

    for (let i = 0; i < files.length; i++) {
      fileNamesArray.push(files[i].name);
    }

    setFileNames(fileNamesArray);
  };


  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="container co">
        <div>
          <img src={EWallet} style={{ height: 600 }} alt="gif" />
        </div>
        <div className="forms-container">
          <div className="formed">
            <form
              action="#"
              className="inner-formed"
              method="post"
              style={{ marginTop: 600 }}
            >
              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" placeholder="Name" name="name" onChange={onChange} value={transaction.name}/>
              </div>
              {/* <div class="input-field">
          <i class="material-symbols-outlined" style="font-size: 24px;">
              tune
          </i>
          <input type="text" placeholder="Category" name="Category" />
      </div> */}
              <div className="input-field options">
                <i
                  className="material-symbols-outlined altRoute"
                  style={{ fontSize: 24 }}
                >
                  tune
                </i>

                <select
                  className="form-select"
                  id="mySelect1"
                  value={category}
                  onChange={handleSelectChange}
                  style={{ color: category === "" ? "#aaa" : "black" }}
                >
                  <option disabled value="">
                    Category
                  </option>
                  <option
                    style={{ color: "black" }}
                    className="input-field dropDownSelectedText"
                  >
                    Food
                  </option>
                  <option
                    style={{ color: "black" }}
                    className="input-field dropDownSelectedText"
                  >
                    Groceries
                  </option>
                  <option
                    style={{ color: "black" }}
                    className="input-field dropDownSelectedText"
                  >
                    Medal
                  </option>
                  <option
                    style={{ color: "black" }}
                    className="input-field dropDownSelectedText"
                  >
                    Education
                  </option>
                  <option
                    style={{ color: "black" }}
                    className="input-field dropDownSelectedText"
                  >
                    Travel
                  </option>
                  <option
                    style={{ color: "black" }}
                    className="input-field dropDownSelectedText"
                  >
                    Bills
                  </option>
                  <option
                    style={{ color: "black" }}
                    className="input-field dropDownSelectedText"
                  >
                    Shopping
                  </option>
                  <option
                    style={{ color: "black" }}
                    className="input-field dropDownSelectedText"
                  >
                    Others
                  </option>
                </select>
              </div>
              <div className="input-field options">
                <i
                  className="material-symbols-outlined altRoute"
                  style={{ fontSize: 24 }}
                >
                  alt_route
                </i>
                <select
                  className="form-select"
                  id="mySelect"
                  value={selectedValue}
                  onChange={(e) => {setSelectedValue(e.target.value)}}
                  style={{ color: selectedValue === "" ? "#aaa" : "black" }} // Inline style for dynamic color
                >
                  <option disabled value="">
                    Type
                  </option>
                  <option value="Expense" style={{ color: "red" }}>
                    Expense
                  </option>
                  <option value="Income" style={{ color: "green" }}>
                    Income
                  </option>
                </select>
              </div>
              <div className="input-field">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: 24 }}
                >
                  attach_money
                </i>
                <input type="number" placeholder="Price" name="price" value={transaction.price} onChange={onChange} />
              </div>
              <div className=" checkBox container-fluid col-md-12 ">
                <label className="mr-1" htmlFor="gender">
                  Recurring:{" "}
                </label>
                <input
                  type="radio"
                  className="btn-check button"
                  name="rec_yes"
                  id="yes"
                  autoComplete="off"
                  onClick={handleYes}
                />
                <label
                  className="btn btn-sm btn-outline-secondary check"
                  htmlFor="yes"
                >
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="rec_no"
                  id="no"
                  autoComplete="off"
                  onClick={handleNo}
                />
                <label
                  className="btn btn-sm btn-outline-secondary check"
                  htmlFor="no"
                >
                  No
                </label>
                <div
                  className={`input-field special ${
                    showRepeat === false ? "d-none" : ""
                  }`}
                  id="content"
                >
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: 24 }}
                  >
                    calendar_month
                  </i>
                  <input
                    className="repeat"
                    type="text"
                    placeholder="Repeat"
                    name="repeat"
                    onChange={onChange}
                    value={transaction.repeat}
                  />
                </div>
              </div>
              <div className="container co file-upload-outer-container">
                <div className="upload-btn-wrapper">
                  <span className="icon-bg">
                    <i
                      className="material-symbols-outlined"
                      style={{ fontSize: 12, color: "#4D4DFF" }}
                    >
                      upload_file
                    </i>
                  </span>
                  <button
                    className="btn btn-upload"
                    style={{ display: "flex" }}
                  >
                    Attach a File
                    <p style={{ fontSize: 12, color: "#b79e9e" }}>
                      &nbsp;(PDF, DOC, Image files with max file size: 5Mb)
                    </p>
                  </button>
                  <input
                    type="file"
                    name="myfile"
                    id="fileInput"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                {/* Container for displaying uploaded file names */}
                <div id="fileList">
                  {fileNames.map((name, index) => (
                    <span key={index} className="small text-muted">
                      {name}
                    </span>
                  ))}
                </div>

                {/* Container for displaying uploaded file names */}
                <div id="fileList">
                  {/* Uploaded file names will appear here */}
                </div>
              </div>
              <div>
                <button
                  id="submit"
                  type="submit"
                  className="submit-btn-for-trans"
                  onClick={handleClick}
                >
                  Add Transaction
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quickadd
