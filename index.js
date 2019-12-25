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

let termBase = document.getElementsByClassName("term")[0].children;

let headerBase = document.getElementById("header");
let chapterHeader = document.getElementById("chapterHeader");
let articleHeader = document.getElementById("articleHeader");

let HeaderText, ArticleText;
let chapterNum = 0;
function onScroll() {
    for(let i = 0; i < termBase.length; i++){
        let b = termBase[i].getBoundingClientRect().top - headerBase.offsetHeight;
        if(b <= 0){
            HeaderText = termBase[i].getElementsByTagName("h2")[0].innerHTML;
            chapterNum = i;
        }
    }
    if(HeaderText == undefined) HeaderText = termBase[0].getElementsByTagName("h2")[0].innerHTML;
    chapterHeader.innerHTML = HeaderText;

    for(let i = 0; i < termBase[chapterNum].getElementsByTagName("h4").length; i++){
        let b = termBase[chapterNum].getElementsByTagName("h4")[i].getBoundingClientRect().top - headerBase.offsetHeight;
        if(b <= 0)ArticleText = termBase[chapterNum].getElementsByTagName("h4")[i].innerHTML;
    }
    if(ArticleText == undefined) ArticleText = termBase[0].getElementsByTagName("h4")[0].innerHTML;
    articleHeader.innerHTML = ArticleText;
}
onScroll();
window.onscroll = onScroll;
console.log(termBase[1]);