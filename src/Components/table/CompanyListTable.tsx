import React, { useState } from "react";
import "./CompanyListTable.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CompanyItems = {
  company: string;
  product: string;
  price: string;
  description: string;
  image: string;
};
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
Modal.setAppElement("#root");

export default function CompanyListTable(props: {
  items: CompanyItems[];
  onChange: any;
  searchResult: any;
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState({
    item: { company: "", product: "", price: "", description: "", image: "" },
    index: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const items = props.items || [];
  function showDetails(item: CompanyItems, index: number) {
    setIsOpen(true);
    let obj = { item, index };
    setSelectedItemDetail(obj);
  }
  function closeModal() {
    setIsOpen(false);
    setIsEditing(false);
  }
  function deleteItem() {
    let array = [...props.items];
    let index = selectedItemDetail.index;
    array.splice(index, 1);
    props.onChange(array);
    setIsOpen(false);
    toastSuccess("delete successful!!");
  }
  function editItem() {
    setIsEditing(true);
  }
  const toastSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  function toDefault() {
    setCompanyName("");
    setProductName("");
    setPrice("");
    setDescription("");
    setImage("");
  }
  function saveItem() {
    if (!productName && !price && !description && !image && !companyName) {
      setIsEditing(false);
    } else {
      const newObj: CompanyItems = {
        company: companyName || selectedItemDetail.item.company,
        product: productName || selectedItemDetail.item.product,
        price: price || selectedItemDetail.item.price,
        description: description || selectedItemDetail.item.description,
        image: image || selectedItemDetail.item.image,
      };
      let array = [...props.items];
      array[selectedItemDetail.index] = newObj;
      props.onChange(array);
      setSelectedItemDetail({ item: newObj, index: selectedItemDetail.index });
      setIsEditing(false);
      toastSuccess("edit successful!!");
      toDefault();
    }
  }
  function loadImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const data: any = reader.result;
      setImage(data);
    };
    reader.readAsDataURL(file);
  }
  function showResult() {
    if (props.searchResult.length !== 0) {
      return props.searchResult;
    } else {
      return props.items;
    }
  }
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            showResult().map((item: CompanyItems, index: number) => (
              <tr key={index}>
                <td>{item.company}</td>
                <td>{item.product}</td>
                <td>¥{item.price}</td>
                <td className="action">
                  <button
                    className="detail-button"
                    onClick={() => showDetails(item, index)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Product Modal"
      >
        {!isEditing && (
          <div className="item-detail-container">
            <div className="item-detail-header">
              <div className="item-detail-name-price">
                <h2 className="item-detail-product-name">
                  {selectedItemDetail.item.product}
                </h2>
                <div className="item-detail-company-name">
                  company: {selectedItemDetail.item.company}
                </div>
                <div className="item-detail-price">
                  price: ¥{selectedItemDetail.item.price}
                </div>
              </div>
              <img
                src={selectedItemDetail.item.image}
                alt="product"
                className="item-detail-product-image"
              />
            </div>
            description:
            <div className="item-detail-description">
              {selectedItemDetail.item.description}
            </div>
            <div className="button-container">
              <button
                className="delete-button"
                onClick={() => {
                  deleteItem();
                }}
              >
                Delete
              </button>
              <button
                className="edit-save-button"
                onClick={() => {
                  editItem();
                }}
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {isEditing && (
          <div className="item-detail-container">
            <div className="item-detail-header">
              <div className="item-detail-name-price">
                <input
                  className="item-detail-product-name"
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  defaultValue={selectedItemDetail.item.product}
                />
                <input
                  className="item-detail-company-name"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  defaultValue={selectedItemDetail.item.company}
                />
                <input
                  className="item-detail-price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  defaultValue={selectedItemDetail.item.price}
                />
              </div>
              <input
                type="file"
                className="item-detail-product-image"
                onChange={loadImage}
              />
            </div>
            <textarea
              className="item-detail-description"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={selectedItemDetail.item.description}
            />
            <div className="button-container">
              <button
                className="delete-button"
                onClick={() => {
                  deleteItem();
                }}
              >
                Delete
              </button>
              <button
                className="edit-save-button"
                onClick={() => {
                  saveItem();
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
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
