import './App.css';
import { useState, useRef, useEffect } from 'react';
import Main from './component/Topic';
import Front from './component/Front';
import News from './component/News';
import NewsBody from './component/NewsBody';
import NewsArticle from './component/NewsArticle';
import Contact from './component/Contact';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import React from 'react';
import AdminLogin from './component/AdminLogin';
import AdminMain from './component/AdminMainPage';
import AdminCreatePost from './component/AdminCreatePost';


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

function Protected(props) {
  return props.loggedIn ? props.children : <Navigate to="/admin/login" replace={true} />;
}
function LoggedIn(props) {
  return props.loggedIn ? <Navigate to="/admin/main" replace={true} />: props.children;
}

function Error(){
  return (
    <div>你要找的頁面不存在</div>
  )
}

function App() {
  const [loggedIn, setLogin] = useState(false);
  const handleAdminLogin=()=>{
    setLogin(true);
  }
  const handleAdminLogout=()=>{
    setLogin(false);
  }

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
          <Route path="admin/login" element={<LoggedIn loggedIn={loggedIn}>
              <AdminLogin handleLogin={handleAdminLogin}/>
            </LoggedIn>}>
          </Route>
          <Route path="admin/main" element={<Protected loggedIn={loggedIn}> <AdminMain logout={handleAdminLogout}/> </Protected>} ></Route>
          <Route path="admin/create" element={<Protected loggedIn={loggedIn}> <AdminCreatePost /> </Protected>} ></Route>
          <Route path="*" status={404} element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
