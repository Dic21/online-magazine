import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import createStyle from '../Create.module.css';

function AdminLogin(props){
    const [username, setNameText] = useState("");
    const [pw, setPw] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const handleNameInput=(e)=>{
        setNameText(e.target.value)
    }
    const handlePwInput=(e)=>{
        setPw(e.target.value)
    }

    const handleLoginStatus = props.handleLogin;
    const handleClickLogin = () =>{
        const dataToServer = {
            username,
            password: pw
        }
        fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToServer)
        }).then((resData)=>resData.json()).then((data)=>{
            console.log(data); 
            if(data.success){
                handleLoginStatus();
                localStorage.setItem("token", data.token);
                navigate('/admin/main');
                setErrorMsg("");
            }else{
                setErrorMsg(data.message);
            }
        })
    }
    return (
        <div className={createStyle.login}>
            登入系統
            <label>帳號</label>
            <input type="text" value={username} onChange={handleNameInput}/>
            <label>密碼</label>
            <input type="password" value={pw} onChange={handlePwInput} />
            {errorMsg? errorMsg: null}
            <button onClick={handleClickLogin}>登入</button>
        </div>
    )
}


export default AdminLogin;