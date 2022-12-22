let marks = [",", ".", " ", "?"]

let arr = [
    {word: ",", value:2},
    {word: "a", value:2},
    {word: "b", value:2},
    {word: "r", value:2},
    {word: "e", value:2},
    {word: "q", value:2},
    {word: "amp", value:2},
    {word: "s", value:2},
    {word: "）", value:2},    
    {word: "?", value:2},
    {word: " ", value:2},
    {word: "！", value:2},    
    {word: "da", value:2},
]

let b = arr.filter((item)=>{
    return !(/[,.!;@#$%!！，。? ^&&*＞>？）(（)\u9999]/).test(item.word) && item.word !== "amp"
})

console.log(b);