import newsStyle from '../News.module.css';
import {useState, useEffect} from 'react';
import {Outlet, useOutlet, useLocation, Link} from 'react-router-dom';
import  {articleList}  from "../articleList";

function News(){
    const [list, setList] = useState([]);
    const isOutlet = useOutlet();
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const activeStyle = {
        borderBottom: "2px solid grey"
    }
    useEffect(()=>{
        setList(articleList);
    },[])
    return(
        <div className={newsStyle["cate-nav"]}>
            <div className='lock' style={{height: "100%"}}>
                <ul>
                    <li style={!path ? activeStyle : null} > <Link to="/article">全部</Link></li>
                    <span> | </span>
                    <li style={path === 'western' ? activeStyle : null} ><Link to="western">西餐</Link></li>
                    <span> | </span>
                    <li style={path === 'interview' ? activeStyle : null} ><Link to="interview">專訪</Link></li>
                    <span> | </span>
                    <li style={path === 'travel' ? activeStyle : null} ><Link to="travel">搵食</Link></li>
                </ul>
            </div>
            {isOutlet? <Outlet/>:
                (<div className='lock' style={{width: "90%"}}>
                    {list.map((a)=>{
                        return (
                            <Link to={`${a.id}`}>
                                <div key={a.title} className={newsStyle["article-container"]}> 
                                    <h3>{a.title}</h3>
                                    <div>{a.date}</div>
                                    <div>{a.abstract}</div>
                                </div>
                            </Link>
                        )}
                    )}
                </div>)
            }
        </div>
    )
}







export default News;