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
  const [searchResult, setSearchResult] = useState([]) 
  return (
    <div className="App">
      <AddProduct items={itemsData} onChange={(newItemData:CompanyItems[]) =>{setItemsData(newItemData)}}/>
      <Searcher items={itemsData} onChange={(newItemData:CompanyItems[]) =>{setItemsData(newItemData)}} setSearch={((searchData:any) => {setSearchResult(searchData)})}/>
      <CompanyListTable items={itemsData} onChange={(newItemData:CompanyItems[]) =>{setItemsData(newItemData)}} searchResult={searchResult}/>
    </div>
  );
}

export default App;
