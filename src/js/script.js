import info from "../mocks/data.json";

const d = document;
const $fragment = d.createDocumentFragment();
const linksNames = ["Home", "New", "Popular", "Trending", "Categories"];
const $nav = d.querySelector(".nav");
const $list_links = $nav.lastElementChild;
const $html = d.documentElement;

/*---*/
const $aside = d.querySelector(".aside");
const $section_notices = $aside.parentElement.nextElementSibling;
// Toggle-Bar
const $btn_bar = $nav.parentElement.children[1];
const $img_home = d.querySelector(".img-home");

document.addEventListener("DOMContentLoaded", () => {
  // header
  createNav();
  detectSize();
  navigation();
  //main - aside
  mainAndFooter();
});

// cambia la imagen segun el tamaño del screenX
function detectSize() {
  $img_home.src = "./assets/images/image-web-3-mobile.jpg";
  if (window.screenX < 600) {
    $img_home.src = "./assets/images/image-web-3-desktop.jpg";
  }
}

// inserccion del navegador con algunos estilos CSS
function createNav() {
  linksNames.forEach((links) => {
    const $li = d.createElement("LI");
    const $a = d.createElement("A");

    $a.setAttribute("href", `#${links.toLocaleLowerCase()}`);
    /*Styles CSS*/
    $list_links.style.listStyle = "none";
    $list_links.style.padding = "30px 0px 0px 15px";

    /*--*/
    $a.textContent = links;

    $li.appendChild($a);
    $fragment.appendChild($li);
  });

  $list_links.appendChild($fragment);
}

// mostrar navigation
function navigation() {
  function showNavigation(e) {
    e.target.setAttribute("src", "./assets/images/icon-menu.svg");

    if ($nav.classList.toggle("active")) {
      $nav.style.backgroundColor = "hsl(36, 100%, 99%);";
      e.target.setAttribute("src", "./assets/images/icon-menu-close.svg");
    }
  }
  $btn_bar.addEventListener("click", showNavigation);
}

// Main - Aside
function mainAndFooter() {
  info.forEach((e) => {
    let aside = e["aside"];
    let notice = e["notice"];
    getNotice(notice);
    getArticle(aside);
  });
}

function getNotice(notice) {
  for (const e in notice) {
    const $img = d.createElement("img");
    const $div = d.createElement("div");
    const $article_notices = d.createElement("article");
    const $h4 = d.createElement("h4");
    const $a = d.createElement("a");
    const $p = d.createElement("p");
    // const $link = d.createElement("")

    $article_notices.classList.add("notices-art");
    $div.classList.add("notices-description");

    $img.setAttribute("src", notice[e].url, "alt", notice[e].title);
    $h4.textContent = notice[e].id;
    $a.textContent = notice[e].title;
    $p.textContent = notice[e].description;
    $a.setAttribute("href", "#home");

    $div.appendChild($h4);
    $div.appendChild($a);
    $div.appendChild($p);

    $article_notices.appendChild($img);
    $article_notices.appendChild($div);

    $fragment.appendChild($article_notices);
  }
  $section_notices.appendChild($fragment);
}

function getArticle(aside) {
  for (const i in aside) {
    const $a = d.createElement("a");
    const $p = d.createElement("P");
    const $article = d.createElement("article");
    const colorLine = getComputedStyle($html).getPropertyValue(
      "--color-neutral-dark-grayish-blue"
    );

    $article.classList.add("article-news");
    $article.style.borderBottom = `1px solid ${colorLine}`;
    $a.setAttribute("href", "#home");

    $a.textContent = aside[i].title;
    $p.textContent = aside[i].description;

    $article.appendChild($a);
    $article.appendChild($p);

    $fragment.appendChild($article);
  }
  $aside.appendChild($fragment);
}
// events
document.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    $nav.classList.remove("active");
    $btn_bar.src = "./assets/images/icon-menu.svg";
  }
});

window.addEventListener("scroll", () => {
  if (scrollY > 0) {
    $nav.classList.remove("active");
    $btn_bar.src = "./assets/images/icon-menu.svg";
  }
});

window.addEventListener("resize", detectSize);
