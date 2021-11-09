import React, { useState } from "react";
import "./AddProduct.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
type CompanyItems = {
  company: string;
  product: string;
  price: string;
  description: string;
  image: string;
};

Modal.setAppElement("#root");
export default function AddProduct(props: {
  items: CompanyItems[];
  onChange: any;
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const toastSuccess = () => {
    toast.success("added an item!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const toastError = () => {
    toast.error("missing or invalid value", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  function addNewItem() {
    if (
      companyName &&
      productName &&
      price !== "" &&
      typeof parseInt(price) === "number"
    ) {
      let obj: CompanyItems = {
        company: companyName,
        product: productName,
        price: price,
        description: description,
        image: image,
      };
      let array = [...props.items];
      array.push(obj);
      props.onChange(array);
      closeModal();
      toastSuccess();
    } else {
      toastError();
    }
  }
  //! fix any later
  function loadImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const data: any = reader.result;
      setImage(data);
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="add-product-button-container">
      <button className="button" onClick={openModal}>
        Add Product
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Product Modal"
      >
        <div className="title"> Add Item</div>
        <div className="new-product-form">
          <input
            value={companyName}
            list="companies"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="company name *required"
            type="text"
            name="companyName"
            className="company-name-input"
          />
          <datalist id="companies">
            <option value="A Company" />
            <option value="B Inc" />
            <option value="C Inc" />
            <option value="Z Company" />
          </datalist>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="product name *required"
            type="text"
            name="productName"
            className="product-name-input"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="set the price *required number only"
            name="price"
            className="price-input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="set the description"
            name="description"
            className="description-input"
          />
          {image && <img src={image} alt="preview" className="preview-image" />}
          <input
            type="file"
            accept=".gif,.jpg,.jpeg,.png"
            onChange={loadImage}
          />
        </div>
        <button onClick={() => addNewItem()} className="submit-button">
          Submit
        </button>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
