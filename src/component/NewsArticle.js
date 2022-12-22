import newsStyle from '../News.module.css';
import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import  {articleList}  from "../articleList";

function NewsArticle(){
    const [fontSize, setFontSize] = useState("medium");
    const { articleId } = useParams();
    const article = articleList.filter((a)=>{return articleId === a.id})[0];
    const [art, setArt] = useState(null);
    useEffect(()=>{
        setArt(article);
        let size = initSize();
        setFontSize(size);
    },[])

    const initSize =()=>{
        let size = localStorage.getItem('size')
        return size;
    }

    const handleSizeChange=(size)=>{
        setFontSize(size);
        localStorage.setItem('size', size);
    }

    const defaultStyle = {
        fontWeight:"600",
        backgroundColor: "rgb(211, 211, 211)"
    }


    if(!art){
        return (<div>Loading...</div>)
    }
    return(
        <div className={`${newsStyle["body-container"]} lock`}>
            😋<Link to={`/article/${art.path}`}>{art.cate}</Link>
            <div>
                <h1>{art.title}</h1>
                <div className={newsStyle.topdesc}>
                    <div>
                        <span>日期: {art.date}  </span> 
                        <span id={newsStyle.readingtime}>閱讀時間: {art.readTime}</span>
                    </div>
                    <div className={newsStyle.font}>字體  &nbsp;
                        <span style={fontSize === 'larger'?defaultStyle:null} onClick={()=>{handleSizeChange('larger')}}>大</span>
                        <span style={fontSize === 'medium'?defaultStyle:null} onClick={()=>{handleSizeChange('medium')}}>中</span>
                        <span style={fontSize === 'small'?defaultStyle:null} onClick={()=>{handleSizeChange('small')}}>小</span>
                    </div>
                </div>
                <div style={{ height:"300px", marginTop:"20px",backgroundImage: `url(${art.image})` , backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat:"no-repeat"}}></div>
                <p style={{fontSize:fontSize, whiteSpace: "pre-line"}}>{art.content.split("<br/>").join("\n")}</p>
            </div>
        </div>
    )
}

export default NewsArticle;