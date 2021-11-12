import React, { useState } from "react";
import "./App.css";
import Searcher from "./components/search/SearchPage";
import AddProduct from "./components/addproduct/AddProductButton";
import CompanyListTable from "./components/table/CompanyListTable";
import { companyData } from "./data/companyData";
type CompanyItems = {
  company: string;
  product: string;
  price: string;
  description: string;
  image: any;
};

function App() {
  const [itemsData, setItemsData] = useState(companyData);
  const [searchResult, setSearchResult] = useState([]);
  return (
    <div className="App">
      <AddProduct
        items={itemsData}
        onChange={(newItemData: CompanyItems[]) => {
          setItemsData(newItemData);
        }}
      />
      <Searcher
        items={itemsData}
        setSearch={(searchData: any) => {
          setSearchResult(searchData);
        }}
      />
      <CompanyListTable
        items={itemsData}
        onChange={(newItemData: CompanyItems[]) => {
          setItemsData(newItemData);
        }}
        searchResult={searchResult}
      />
    </div>
  );
}

export default App;
