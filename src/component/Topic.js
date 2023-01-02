import createJieba from 'js-jieba'
import {JiebaDict, HMMModel, UserDict, IDF, StopWords} from 'jieba-zh-tw';
import { useEffect, useState } from 'react';
import loadinglogo from '../image/wait.gif';
import linkImage from '../image/link.svg';
import WordCloud from 'react-d3-cloud';
import topicStyle from '../Topic.module.css';
import infoImage from '../image/info-circle.svg';
import reloadImage from '../image/reload.svg';

const jieba = createJieba(
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
)


function Word(props){
  let list = [...props.data[0], ...props.data[1], ...props.data[2]];
  let wordList = list.map(p=>p.title);
  let str = wordList.toString();
  let result = jieba.cut(str);

  let obj = {}; 
  //change array to the object and count the times
  for(let i = 0; i < result.length; i++){
      if(!obj[result[i]]){
        obj[result[i]] = 1;
      }else{
        obj[result[i]]++;
      }
  }
  let output = Object.entries(obj).map(([word, times])=>{
    let obj = {
      text: word,
      value: times * 500
    };
    return obj;
  });
  let cloud = output.filter((word)=>{
    return !(/[,.!;@#$%!！，。? ^&&*＞>/？）(（)\u9999]/).test(word.text) && (word.text !== "amp") && (word.text !== "lt") && (word.text !== "gt") && (word.text.length!==1) && (isNaN(word.text))
  }).sort((a,b)=>{
    return b.value - a.value;
  }).slice(0,70);
  return(
    <div>
      熱門搵食字詞
      <div className={topicStyle.cloud}>
        <WordCloud width={400} height={200} data={cloud} rotate={0} />
      </div>
    </div>
  )
}

function Main(){
  const [hkdlist, sethkdlist] = useState(null);
  const [babylist, setbabylist] = useState(null);
  const [lihkglist, setlihkglist] = useState(null);
  const [cloud, setCloud] = useState(false);
  useEffect(()=>{
    fetchData('hkd');
    fetchData('baby');
    fetchData('lihkg');
  }, [])

  const fetchData =(site, isUpdate)=>{
    const method = {
        "hkd": sethkdlist,
        "baby": setbabylist,
        "lihkg": setlihkglist
    }
    if(isUpdate){

      method[site](null);
      setCloud(false);
    }
    fetch(`/scraper/${site}`).then(resData=>resData.json()).then((data)=>{
        method[site](data);
    })    
  }
  const handleClick=()=>{
    setCloud(true);
  }

  return(
    <div>
        <div className={`${topicStyle.title} lock`}>
          <div>
            <h2>🔥最新熱門話題 </h2>
            <div className={topicStyle.infoicon}>
              <img src={infoImage}></img>
              <span className={topicStyle.info}>資料取自各大討論區飲食台首頁。以下表格顯示最多留言數的5則貼文，長青貼文(即留言數&gt;500)則不計算在內。</span>
            </div>
          </div>
        </div>
        <div className={`${topicStyle["main-container"]} lock `}>

          <Forum site="hkd" list={hkdlist} update={()=>{fetchData('hkd', true)}}/>
          <Forum site="baby" list={babylist} update={()=>{fetchData('baby', true)}}/>
          <Forum site="lihkg" list={lihkglist} update={()=>{fetchData('lihkg', true)}}/>
        </div>
        <button className={topicStyle.cloudbtn} onClick={handleClick} disabled={!hkdlist||!babylist||!lihkglist}>查看熱門字雲</button>
        {cloud? <Word data={[hkdlist, babylist, lihkglist]}/>:null}
    </div>
  )
}

function Forum(props){
  const forumDict = {
    "hkd": "香港討論區",
    "baby": "親子王國",
    "lihkg": "連登討論區"
  }
  let site = props.site;
  let list = props.list;

  if (site === "lihkg" && list){
    list = list.slice(0,20);
  }

  //sorting in Forum component
  let sortList = [];
  if(list){
    sortList = list.filter((post)=>{
      return post.cmCount < 500
    }).sort((a,b)=>{
      return b.cmCount - a.cmCount;
    })
  }

  return(
    <div className={topicStyle.forum}>
      <div className={topicStyle.forumtitle}>
        {forumDict[site]}
        {list? <span className={topicStyle.reload} onClick={props.update}><img src={reloadImage}/></span> : null}
      </div>
      
      <table id={topicStyle.forumtable}>
        <thead>
          <tr>
            <th style={{width:"22rem"}}>貼文主題</th>
            <th style={{width:"6rem"}}>留言數</th>
            <th style={{width:"4rem"}}>連結</th>
          </tr>
        </thead>
        <tbody>
          {list? sortList.slice(0,5).map((p)=>{
            return (<tr key={p.title}>
              <td>{p.title}</td>
              <td>{p.cmCount}</td>
              <td><a href={p.link} target="_blank" rel="noreferrer"><img src={linkImage} alt="link"/></a> </td>
            </tr>)}) :
            <tr className={topicStyle.loading}><td colSpan="3"><img src={loadinglogo} width="80px" alt="loading"></img></td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Main;