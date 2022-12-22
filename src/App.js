import './App.css';
import {useState, useRef } from 'react';
import Main from './component/Topic';
import Front from './component/Front';
import News from './component/News';
import NewsBody from './component/NewsBody';
import NewsArticle from './component/NewsArticle';
import Contact from './component/Contact';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import React from 'react';


function Navbar() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const activeStyle = {
    backgroundColor: "#fcb426",
    borderRadius: "20px",
    fontWeight:"600"
  }
  return (
    <div className="topbar">
      <div className='lock'>
        <Link to="/"><span>食物研究所</span></Link>
        <nav>
          <ul style={{ marginLeft: "5px"}}>
            <li ><Link to="topic" style={path === 'topic' ? activeStyle : null}>網民熱話</Link></li>
            <li ><Link to="article" style={path === 'article' ? activeStyle : null}>文章</Link></li>
            <li ><Link to="contact-us" style={path === 'contact-us' ? activeStyle : null}>聯絡我們</Link></li>
          </ul>
        </nav>
      </div>
    </div>

  )
}


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<Front />} />
            <Route path="topic" element={<Main />} />
            <Route path="article" element={<News />} >
              {['western', 'interview', 'travel'].map(path => <Route key={path} path={path} element={<NewsBody path={path}/>} />)}
              <Route path=":articleId" element={<NewsArticle/>}/>
            </Route>
            <Route path="contact-us" element={<Contact />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
