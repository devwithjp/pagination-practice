import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paginate from './Paginate';
import './App.css';

function App() {
  const [pageObj, setPageObj] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // const indexOfLastPost = currentPage * pageObj?.["per_page"];
  // const indexOfFirstPost = indexOfLastPost - pageObj?.["per_page"];
  // const currentPosts = pageObj?.data?.slice(indexOfFirstPost, indexOfLastPost);
   const currentPosts = pageObj?.data;

  const paginate = (pageNumber) => {
    // console.log(pageNumber)
    setCurrentPage(pageNumber)
  }

  const getData = async (page=1, pp=6)=>{
    const data =  await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${pp}`)
    return data?.data;
  }

  useEffect(()=>{
    getData(currentPage,3)
    .then((resp) => setPageObj(resp));
  },[currentPage])


  const previousPage = () => {
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
    }
 };


 const nextPage = () => {
    if (currentPage !== Math.ceil(pageObj?.data?.length /pageObj?.total)) {
       setCurrentPage(currentPage + 1);
    }
 }; 
  return (
    <div className="App">
      <header className="App-header">
       <h1>Pagination Example</h1>
       {currentPosts ? (
          <div className="content-section">
            <ul className='content'>
              {currentPosts.map(data => <li key={data.id}>{`${data.first_name} || ${data.last_name} || ${data.email}`}</li>
              )}
            </ul>
            <Paginate 
              postsPerPage={pageObj?.["per_page"]}
              totalPosts={pageObj?.["total"]}
              paginate={paginate}
              />
          </div>
          ) : (
            <div className="loading">Loading...</div>
          )
       }
      </header>
    </div>
  );
}

export default App;
