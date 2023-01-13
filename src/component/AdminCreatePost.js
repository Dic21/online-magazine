import { useState } from "react";
import createStyle from '../Create.module.css';

function Create(){
    const [titleText, setTitleText] = useState("");
    const [absText, setAbsText] = useState("");
    const [msgText, setMsgText] = useState("");
    const [cate, setCate] = useState("western");
    const [imgLink, setImgLink] = useState("");
    const [validcode, setCode] = useState("");
    const handleTitle=(e)=>{
        setTitleText(e.target.value)
    }
    const handleAbstract=(e)=>{
        setAbsText(e.target.value)
    }
    const handleContent=(e)=>{
        setMsgText(e.target.value)
    }
    const handleImageLink=(e)=>{
        setImgLink(e.target.value)
    }
    const handleValid=(e)=>{
        setCode(e.target.value)
    }


    const handleSubmit=()=>{
        if(!titleText || !msgText || !absText){
            alert("Please fill in title, abstract and content");
            return;
        }

        let dataToServer = {
            createDate: new Date().toISOString().slice(0, 10),
            title: titleText,
            abstract: absText,
            content: msgText,
            id: "n" + Math.random().toString(16).slice(2),
            image: imgLink,
            cate: cate,
            code: validcode
        }

        fetch('/api/admin/post', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToServer)
        }).then((resData)=>{return resData.json()}).then((data)=>{
            console.log(data);
            if(data.success){
                alert("Article created successfully")
            }else{
                alert(data.message);
            }
        })
    }

    return(
        <div className={createStyle.container}>
            <h2>建立文章</h2>
            <label>標題</label>
            <input type="text" value={titleText} name="title" placeHolder="標題" onChange={handleTitle}/>
            <label for="category">選擇分類</label>
            <select name="category" onChange={(e)=>{setCate(e.target.value)}}>
                <option value="western">西餐</option>
                <option value="interview">專訪</option>
                <option value="travel">搵食</option>
            </select>
            <label>擇要</label>
            <textarea name="abstract" id={createStyle.abs} value={absText} onChange={handleAbstract}></textarea>
            <label>文章內容</label>
            <textarea name="message" id={createStyle.con} value={msgText} onChange={handleContent}></textarea>
            <label>圖片連結</label>
            <input type="text" value={imgLink} name="imagelink" placeHolder="圖片連結" onChange={handleImageLink}/>
            <label>管理員驗證碼</label>
            <input type="text" value={validcode} name="validcode" placeHolder="驗證碼" onChange={handleValid}/>
            <button onClick={handleSubmit}>提交</button>
        </div>
    )
}




export default Create;