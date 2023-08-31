const API_KEY="072289cd45d84f69bbd44e6505adada9"
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`)
    const data=await res.json()
    console.log(data)
    bindData(data.articles)

}
function bindData(articles){
    const cards_container=document.querySelector(".card-container")
    const newscard=document.getElementById('template-news');
    
    cards_container.innerHTML=''
    articles.forEach(article => {
        if(!article.urlToImage) return
        const cardclone=newscard.content.cloneNode(true)
        filldataincard(cardclone,article)
        cards_container.appendChild(cardclone)
        
    });
}

function filldataincard(cardclone,article){
    const newsimage=cardclone.querySelector("#newsimage")
    const newstitle=cardclone.querySelector("#news-title")
    const newssource=cardclone.querySelector(".News-source")
    const newsdescription=cardclone.querySelector(".news-desc")
    newsimage.src=article.urlToImage
    newstitle.innerHTML=article.newstitle
    newsdescription.innerHTML=article.description

    const date=new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta"
    })

    newssource.innerHTML=`${article.source.name} . ${date}`
    cardclone.firstElementChild.addEventListener('click',function(){
        window.open(article.url,"_blank")
    })
}
let currentSelectnav=null;
function onNavItemClick(id){
    fetchNews(id)
    const navitem=document.getElementById(id)
    currentSelectnav?.classList.remove('active')
    currentSelectnav=navitem
    currentSelectnav.classList.add('active')
}


