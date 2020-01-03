const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 300,
    offset: 100,
    updateURL: true,
    popstate: true,
    emitEvents: true
});

let BeforeEvent;
document.addEventListener("scrollStart", event => {
    console.log(event)
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

    if(!window.scrollY){
        headerBase.classList.remove("header-shadow");
        chapterHeader.innerHTML = "学生会規約改正案";
        articleHeader.innerHTML = "TOP";
    }else{
        headerBase.classList.add("header-shadow");
    }
}
onScroll();
window.onscroll = onScroll;

function topScroll(){
    scrollTo(0,0);
    if (BeforeEvent !== undefined) {
        BeforeEvent.detail.anchor.classList.remove("link-target");
        BeforeEvent = undefined;
    }
}

document.getElementById("menu").onclick = function(){
    document.getElementsByClassName("menu-nav")[0].classList.toggle("active");
    document.getElementsByClassName("term")[0].classList.toggle("stop-scroll");
};

document.getElementById("term").onclick = function(){
    document.getElementsByClassName("menu-nav")[0].classList.remove("active");
    document.getElementsByClassName("term")[0].classList.remove("stop-scroll");
};

const menuBox = document.getElementById("menu_box");
let text, href;
let article = 1;
for(let i = 0; i < termBase.length; i++){
    href = (i+1 == termBase.length)?"#sp":"#c"+(i+1);
    text = '<div><a data-scroll class="menu-link" href='+href+'>'+termBase[i].getElementsByTagName("h2")[0].innerHTML+'</a></div>';
    menuBox.insertAdjacentHTML('beforeend',text);

    for(let l = 0; l < termBase[i].getElementsByTagName("h4").length; l++){
        href = "#a"+article;
        text = '<div><a data-scroll class="menu-link indent-1" href='+href+'>'+termBase[i].getElementsByTagName("h4")[l].innerHTML+'</a></div>';
        menuBox.insertAdjacentHTML('beforeend',text);
        article++;
    }
}