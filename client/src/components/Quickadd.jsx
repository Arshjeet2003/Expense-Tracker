import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Quickadd.css";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import themeContext from "../context/theme/themeContext";
import transactionContext from "../context/transactions/transactionContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase";

import EWallet from "../images/E-Wallet.svg";
const Quickadd = () => {
  const context = useContext(transactionContext);
  const context1 = useContext(themeContext);
  const { addTransactions } = context;
  const { theme } = context1;

  // const imagesListRef1 = ref(storage, "profilePic/");
  // const imagesListRef2 = ref(storage, "bills/");

  // State to manage the selected option
  const [selectedValue, setSelectedValue] = useState("");
  const [category, setCategory] = useState("");
  const [Recurring, setRecurring] = useState("No");
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState({});
  const [recurring1, setRecurring1] = useState("");
  const [transaction, setTransaction] = useState({
    name: "",
    type: "",
    category: "",
    recurring: "",
    repeat: "",
    price: "",
    dueDate: new Date(),
  });

  const handleClick = (e) => {
    e.preventDefault(); //So that page does not reload

    //Add loading

    if (files[0] == null) return;
    const imageRef = ref(storage, `images/${v4()}`);
    uploadBytes(imageRef, files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addTransactions(
          transaction.name,
          selectedValue,
          category,
          Recurring,
          transaction.repeat,
          Number(transaction.price),
          url,
          transaction.dueDate
        );
        setTransaction({
          name: "",
          type: "",
          category: "",
          recurring: "",
          repeat: "",
          price: "",
          dueDate: "",
        });
        setCategory("");
        setSelectedValue("");
        setRecurring("No");
        setFileNames([]);
        //Loading complete
        alert("Transaction added");
      });
    });
  };
  const onChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };
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

  const setDate = (e) => {
    const newDate = new Date(e.target.value);
    transaction.dueDate = newDate;
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

    const selectElement = document.getElementById("mySelect1");
    if (category === "") {
      selectElement.style.color = "#aaa"; // Default color
    } else {
      selectElement.style.color = "black"; // Active color
    }
  }, [category, selectedValue]); // Dependence on category,selectedValue to update when it changes

  const handleSelectChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    const fileAttached = event.target.files;
    const fileNamesArray = [];

    for (let i = 0; i < fileAttached.length; i++) {
      fileNamesArray.push(fileAttached[i].name);
    }

    setFileNames(fileNamesArray);
    setFiles(fileAttached);
  };

  return (
    <div id={`${theme === "light" ? "quickAddBodyl" : "quickAddBodyd"}`}>
      <Navbar />
      <Sidebar />
      <div
        className="container co container1"
        id={`${theme === "light" ? "quickAddBodyl" : "quickAddBodyd"}`}
      >
        <div className="row">
          <div className="col-12 col-md-6 d-none d-md-block">
            <div className="p-3">
              <img src={EWallet} style={{ height: 600 }} alt="gif" />
            </div>
          </div>

          <div
            className="col-12 col-md-6 forms-container"
            style={{ paddingTop: "4.5%" }}
          >
            <div className="p-3 formed">
              <form
                action="#"
                className="inner-formed"
                method="post"
                style={{ marginTop: 600 }}
              >
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={onChange}
                    value={transaction.name}
                  />
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
                    onChange={(e) => {
                      setSelectedValue(e.target.value);
                    }}
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
                  <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={transaction.price}
                    onChange={onChange}
                  />
                </div>
                <div className=" checkBox container-fluid col-md-12 ">
                  <label
                    className="mr-1"
                    style={{
                      color: `${theme === "light" ? "black" : "#fff"}`,
                    }}
                  >
                    Recurring:{" "}
                  </label>
                  <input
                    type="radio"
                    className="btn-check button"
                    name="rec_yes"
                    id="yes"
                    checked={recurring1 === "Yes"} // Change this to reflect the state for 'Yes'
                    autoComplete="off"
                    onClick={handleYes}
                  />
                  <label
                    className={`btn btn-sm btn-outline-secondary check ${
                      recurring1 === "Yes" ? "selected-color" : ""
                    }`}
                    htmlFor="yes"
                    style={{
                      color: `${theme === "light" ? "black" : "white"}`,
                    }}
                  >
                    Yes
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="rec_no"
                    id="no"
                    checked={recurring1 === "No"} // Change this to reflect the state for 'No'
                    autoComplete="off"
                    onClick={handleNo}
                  />
                  <label
                    className={`btn btn-sm btn-outline-secondary check ${
                      recurring1 === "No" ? "selected-color" : ""
                    }`}
                    htmlFor="no"
                    style={{
                      color: `${theme === "light" ? "black" : "white"}`,
                    }}
                  >
                    No
                  </label>

                  <div
                    className={`input-field special mx-2 ${
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
                <div className="input-field">
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: 24 }}
                  >
                    calendar_month
                  </i>
                  <input
                    type="date"
                    placeholder="DueDate"
                    name="DueDate"
                    onChange={setDate}
                  />
                </div>
                <div
                  className="container container1 co file-upload-outer-container"
                  style={{
                    backgroundColor: `${
                      theme === "light" ? "#fff" : "#25273f"
                    }`,
                  }}
                >
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
                      style={{
                        display: "flex",
                      }}
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
                      <span
                        key={index}
                        className={`${
                          theme === "light"
                            ? "small text-muted"
                            : "small text-white"
                        }`}
                      >
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
                    className={`${
                      theme === "light"
                        ? "submit-btn-for-transl"
                        : "submit-btn-for-transd"
                    }`}
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
      </div>
    </div>
  );
};

export default Quickadd;
