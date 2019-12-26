const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 300,
    offset: 100,
    updateURL: true,
    popstate: true,
    emitEvents: true
});

let BeforeEvent;
document.addEventListener("scrollStart", event => {
    if (BeforeEvent !== undefined) {
        BeforeEvent.detail.anchor.classList.remove("link-target");
    }
    event.detail.anchor.classList.add("link-target");
    BeforeEvent = event;
}, false);

const termBase = document.getElementsByClassName("term")[0].children;
const headerBase = document.getElementById("header");
const chapterHeader = document.getElementById("chapter_header");
const articleHeader = document.getElementById("article_header");
let chapterNum = 0;
function onScroll() {
    let headerText, articleText;

    for(let i = 0; i < termBase.length; i++){
        let b = termBase[i].getBoundingClientRect().top - headerBase.offsetHeight - 100;
        if(b <= 0){
            headerText = termBase[i].getElementsByTagName("h2")[0].innerHTML;
            chapterNum = i;
        }
    }
    if(headerText == undefined) headerText = termBase[0].getElementsByTagName("h2")[0].innerHTML;
    chapterHeader.innerHTML = headerText;

    for(let i = 0; i < termBase[chapterNum].getElementsByTagName("h4").length; i++){
        let b = termBase[chapterNum].getElementsByTagName("h4")[i].getBoundingClientRect().top - headerBase.offsetHeight - 100;
        if(b <= 0)articleText = termBase[chapterNum].getElementsByTagName("h4")[i].innerHTML;
    }
    if(articleText == undefined) articleText = termBase[chapterNum].getElementsByTagName("h4")[0].innerHTML;
    articleHeader.innerHTML = articleText;
}
onScroll();
window.onscroll = onScroll;

function topScroll(){
    scrollTo(0,0);
}