import React, { useState } from "react";
import "./SearchPage.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//!fix any later
export default function Searcher(props: any) {
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const toastError= () =>{
    toast.error('please enter value', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
  }
  function searchCompany() {
    if (!companyName && !productName && !price) {
        toastError()
    } else {
      if (companyName) {
        let companyResult = props.items
          .filter((o: any) =>
            o.company.toLowerCase().includes(companyName.toLowerCase())
          )
          .sort(
            (a: any, b: any) =>
              a.company.toLowerCase().indexOf(companyName.toLowerCase()) -
              b.company.toLowerCase().indexOf(companyName.toLowerCase())
          );
        if (productName) {
          let productResult = companyResult
            .filter((o: any) =>
              o.product.toLowerCase().includes(productName.toLowerCase())
            )
            .sort(
              (a: any, b: any) =>
                a.product.toLowerCase().indexOf(productName.toLowerCase()) -
                b.company.toLowerCase().indexOf(productName.toLowerCase())
            );
          if (price) {
            let priceResult = props.items.filter(
              (o: any) =>
                parseInt(o.price) > parseInt(price) - 1000 &&
                parseInt(o.price) <= parseInt(price)
            );
            console.log("price", priceResult);
          } else {
            console.log(productResult);
          }
        } else {
          console.log(companyResult);
        }
      } else if (productName) {
        let productResult = props.items
          .filter((o: any) =>
            o.product.toLowerCase().includes(productName.toLowerCase())
          )
          .sort(
            (a: any, b: any) =>
              a.product.toLowerCase().indexOf(productName.toLowerCase()) -
              b.company.toLowerCase().indexOf(productName.toLowerCase())
          );
        if (price) {
          let priceResult = props.items.filter(
            (o: any) =>
              parseInt(o.price) > parseInt(price) - 1000 &&
              parseInt(o.price) <= parseInt(price)
          );
          console.log("price", priceResult);
        } else {
          console.log(productResult);
        }
      } else if (price) {
        let priceResult = props.items.filter(
          (o: any) =>
            parseInt(o.price) > parseInt(price) - 1000 &&
            parseInt(o.price) <= parseInt(price)
        );
        console.log("price", priceResult);
      }
    }
  }

  return (
    <div className="search-container">
      <input
        className="company-input"
        placeholder="company name"
        onChange={(e) => {
          setCompanyName(e.target.value);
        }}
      />
      <input
        className="product-input"
        placeholder="product name"
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        list="prices"
        placeholder="prices"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <datalist id="prices">
        <option value="1000" />
        <option value="2000" />
        <option value="3000" />
        <option value="4000" />
        <option value="5000" />
      </datalist>
      <button className="search-button" onClick={searchCompany}>
        Search
      </button>
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
