import newsStyle from '../News.module.css';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { articleList } from "../articleList";

function NewsBody(props) {
    const currentPath = props.path;
    const [path, setPath] = useState(currentPath);
    const [list, setList] = useState([]);
    // const filterList = articleList.filter((a)=>{return a.path === path});
    useEffect(()=>{
        fetchData();
    },[path])
    
    const fetchData = ()=>{
        fetch(`/api/article/category/${currentPath}`).then((resData)=>{return resData.json()}).then((data)=>{
            if(data.success){
                setList(data.data);
            }
        })
    }

    if(currentPath!==path){
        setPath(currentPath);
    }
    if(list.length === 0){
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className='lock' style={{height: "100%", width:"90%"}}>
                {list.map((a) => {
                    return (
                        <Link to={`/article/${a.id}`} key={a.id}>
                            <div key={a.title} className={newsStyle["article-container"]}>
                                <h3>{a.title}</h3>
                                <div>{a.date}</div>
                                <div>{a.abstract}</div>
                            </div>
                        </Link>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default NewsBody;