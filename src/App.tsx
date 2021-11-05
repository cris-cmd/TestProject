import React, { useState } from 'react';
import './App.css';
import Searcher from './Components/search/SearchPage';
import AddProduct from './Components/addproduct/AddProductButton';
import CompanyListTable  from './Components/table/CompanyListTable';
import { companyData } from './data/companyData';
type CompanyItems={
  company: string
  product: string 
  price: string
  description: string
  image: string
}

function App() {
  const [itemsData, setItemsData] = useState(companyData)
  return (
    <div className="App">
      <AddProduct items={itemsData} onChange={(newItemData:CompanyItems[]) =>{setItemsData(newItemData)}}/>
      <Searcher items={itemsData}/>
      <CompanyListTable items={itemsData} onChange={(newItemData:CompanyItems[]) =>{setItemsData(newItemData)}}/>
     <div>RevZon.com</div>
     <div className="footer">Copyright © {new Date().getFullYear()} Tao Takahashi Projects. All Rights Reserved</div>
    </div>
  );
}

export default App;
