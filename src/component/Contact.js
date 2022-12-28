import { useState, useEffect } from 'react';
import contactStyle from '../contact.module.css';

function Contact() {
    return (
        <div>
            <Form/>
        </div>
    )
}

function Form() {
    const [nameText, setNameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [msgText, setMsgText] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);

    const handleTextChange=(e)=>{
        const table = {
            name: setNameText,
            email: setEmailText,
            message: setMsgText
        }
        table[e.target.name](e.target.value);
    }

    const validation=()=>{
        let valid = true;
        if(!nameText || !emailText || !msgText){
            valid = false;
        return valid;
        }
    }
    const handleValidation =(e)=>{
        let v = validation();
        if (v === false){
            setErrorMsg(true);
            e.preventDefault(); 
        }
    }
    return (
        <div className={`lock ${contactStyle.container}`}>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d536.9400583332932!2d114.22333362317413!3d22.308951504310418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040145ac23ef27%3A0x72c63f3d4fbb24b1!2z54Cd5rSL5bel5qWt5aSn5buI!5e0!3m2!1szh-TW!2shk!4v1671870833665!5m2!1szh-TW!2shk" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className={contactStyle.form}>
                <div className={contactStyle.formhead}>請填寫資料，我們稍後會回覆您。</div>
                <form method="post" onSubmit={handleValidation}>
                    <label>姓名</label>
                    <input type="text" className={contactStyle.inputbox} name="name" value={nameText} onChange={handleTextChange}/>
                    <label>電郵</label>
                    <input type="text" className={contactStyle.inputbox} name="email" value={emailText} onChange={handleTextChange} />
                    <label>訊息</label>
                    <textarea id={contactStyle.message} className={contactStyle.inputbox} name="message" value={msgText} onChange={handleTextChange}></textarea>
                    {errorMsg? <span className={contactStyle.errormsg}>請填寫以上所有欄位。</span>: null}
                    <button className={contactStyle.btn}>送出</button>
                </form>
            </div>
        </div>
    )
}











export default Contact;