import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import createStyle from '../Create.module.css';

function AdminMain(props) {
    const [list, setList] = useState([]);
    const [checked, setChecked] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('/api/article').then((resData) => { return resData.json() }).then((data) => {
            setList(data);
        })
    }

    const handleChecked=(e)=>{
        if(e.target.checked){
            setChecked([...checked, e.target.value])
        }else{
            let list = checked.filter((id)=>{return id !== e.target.value})
            setChecked(list);
        }
    }

    const handleDelete=()=>{
        if(checked.length===0){
            alert("Please check the box");
        }else{
            fetch('/api/admin/article', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({toBeRemovedList: checked})
            }).then(resData=>resData.json()).then((data)=>{
                console.log(data);
            })
        }
        fetchData();
    }
    
    const handleLogout=()=>{
        localStorage.removeItem("token");
        props.logout();
    }
    return (
        <div className="lock">
            <div style={{textAlign: "left"}}>
                <button onClick={()=>{navigate('/admin/create')}}>建立文章</button>
                <button onClick={handleLogout}>登出</button>
            </div>
            <table className={createStyle["table-container"]}>
                <thead>
                    <tr>
                        <th>選擇</th>
                        <th>文章標題</th>
                        <th>文章日期</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map((article) => {
                        return (
                            <tr key={article.title}> 
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name={article.title} 
                                        value={article.id}
                                        onChange={handleChecked}
                                    /> 
                                </td>
                                <td>{article.title}</td>
                                <td>{article.date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={handleDelete}>移除</button>
        </div>
    )
}



export default AdminMain;