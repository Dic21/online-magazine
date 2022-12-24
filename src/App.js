import './App.css';
import { useState, useRef, useEffect } from 'react';
import Main from './component/Topic';
import Front from './component/Front';
import News from './component/News';
import NewsBody from './component/NewsBody';
import NewsArticle from './component/NewsArticle';
import Contact from './component/Contact';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import React from 'react';


function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const navbar = useRef(null);

  const handleDisplayBar = () => {
    // bar.classList.toggle('show');
    setOpen(!open);
  }
  useEffect(() => {
    if (open) {
      const bar = navbar.current;
      bar.classList.add('show');
    } else {
      const bar = navbar.current;
      if (bar.classList.contains('show')) {
        bar.classList.remove('show');
      }
    }
  }, [open])

  const handleClick = () => {
    setOpen(false)
  }
  const activeStyle = {
    backgroundColor: "#fcb426",
    borderRadius: "20px",
    fontWeight: "600"
  }
  return (

    <div className="topbar">
      <div className='lock'>
        <Link to="/" className='maintitle'><span>🍚食物研究所</span></Link>
        <nav className='navbar' ref={navbar}>
          <ul style={{ marginLeft: "5px" }}>
            <li ><Link to="topic" style={path === 'topic' ? activeStyle : null} onClick={handleClick}>網民熱話</Link></li>
            <li ><Link to="article" style={path === 'article' ? activeStyle : null} onClick={handleClick}>文章</Link></li>
            <li ><Link to="contact-us" style={path === 'contact-us' ? activeStyle : null} onClick={handleClick}>聯絡我們</Link></li>
          </ul>
        </nav>
        <div className='hamburger' onClick={handleDisplayBar}>{open ? "X" : "三"}</div>
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
            {['western', 'interview', 'travel'].map(path => <Route key={path} path={path} element={<NewsBody path={path} />} />)}
            <Route path=":articleId" element={<NewsArticle />} />
          </Route>
          <Route path="contact-us" element={<Contact />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
