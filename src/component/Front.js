import { useEffect, useState } from "react";
import frontStyle from '../Front.module.css';
import { Link} from 'react-router-dom';
import bunImage from '../image/bun.png';
import sandwichesImage from '../image/sandwiches.png';
import chipsImage from '../image/chips.jpeg';

function Front(){
    const [list, setList] = useState([]);
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = ()=>{
        fetch('/api/article').then((resData)=>{return resData.json()}).then((data)=>{
            setList(data);
        })
    }
    if(list.length===0){
        return <div>Loading...</div>
    }
    return (
    <div className={`${frontStyle["grid-container"]} lock`}>
        {/* banner */}
        <div id={frontStyle.banner}></div>
        <Sight/>
        <Headline head="2022年十大點心排行榜" para="點心放題成為流行指標，皆因不少港人喜歡飲茶，根據2022最新調查，最受歡迎的點心竟然是...！" id="n01"/>
        <SmallBox cate="西餐" article={list[1]}/>
        <SmallBox cate="專訪" article={list[2]}/>
        <SmallBox cate="搵食" article={list[3]}/> 
    </div>)
}

function Headline(props){
    return (
    <>
        <div className={frontStyle["headline-title"]}>
            <h1>{props.head}</h1>
        </div>  
        <div className={frontStyle["big-desc"]}>
            <p>
                {props.para}
            </p>
            <Link to={`/article/${props.id}`}>
                <span className={frontStyle.morebtn}>看更多...</span>
            </Link>
        </div>
    </>
    )
}

function Sight(){
    const goods = [{title: "饅頭", subtitle:"Little bun", price:"$10", image:bunImage}, {title: "飛碟三文治", subtitle:"Sandwhiches", price:"$15", image:sandwichesImage},{title: "黑松露薯片", subtitle:"Tasty potato chips", price:"$8", image:chipsImage}]
    return (
    <div id={frontStyle.sight}>
        <h2>熱賣商品</h2> 
        <SightItem item={goods[0]}/>
        <hr/>
        <SightItem item={goods[1]}/>
        <hr/>
        <SightItem item={goods[2]}/>
    </div>)
}

function SightItem(props){
    return (
        <div className={frontStyle["sight-item"]}>
            <div className={frontStyle["sight-headline"]}>{props.item.title}</div>
            <div className={frontStyle["iteminfo"]}>
                <img src={props.item.image} />
                <div className={frontStyle.itemdesc}>
                    <p>{props.item.subtitle}</p>
                    <div>價錢: {props.item.price}<span>馬上選購</span></div>
                    
                </div>
            </div>
        </div>
    )
}

function SmallBox(props){
    return (
    <div className={frontStyle.small}>
        <Link to={`/article/${props.article.id}`}>
            <div className={frontStyle["small-img"]}></div>
            <div className={frontStyle["small-content"]}>
            <div className={frontStyle.smallbody}>
                <div>
                    <h2>{props.cate}</h2>
                    <div style={{fontSize:"24px"}}>{props.article.title}</div>
                    <div className={frontStyle.abs}>{props.article.abstract}</div>
                </div>
                <div className={frontStyle.smallpic}><img src={props.article.image} width="100px" height="100%"/></div>
            </div>

            </div>
        </Link>
    </div>
    )
}

export default Front;