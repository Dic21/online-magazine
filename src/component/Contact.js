import { useState, useEffect } from 'react';
import contactStyle from '../contact.module.css';

function Contact() {
    return (
        <div>
            contact
            <Form/>
        </div>
    )
}

function Form() {
    const [nameText, setNameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [msgText, setMsgText] = useState("");

    const handleTextChange=(e)=>{
        const table = {
            name: setNameText,
            email: setEmailText,
            message: setMsgText
        }
        table[e.target.name](e.target.value);
    }
    return (
        <div className={`lock ${contactStyle.container}`}>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d521.6539599607572!2d114.22339238759841!3d22.309077734600898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2shk!4v1671631175252!5m2!1sen!2shk" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            </div>

            <div className={contactStyle.form}>
                <div className={contactStyle.formhead}>請填寫資料，我們稍後會回覆您。</div>
                <form method="post">
                    <label>姓名</label>
                    <input type="text" className={contactStyle.inputbox} name="name" value={nameText} onChange={handleTextChange}/>
                    <label>電郵</label>
                    <input type="text" className={contactStyle.inputbox} name="email" value={emailText} onChange={handleTextChange} />
                    <label>訊息</label>
                    <textarea id={contactStyle.message} className={contactStyle.inputbox} name="message" value={msgText} onChange={handleTextChange}></textarea>
                    <button className={contactStyle.btn}>送出</button>
                </form>
            </div>
        </div>
    )
}











export default Contact;