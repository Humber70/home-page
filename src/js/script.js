const btnBar = document.querySelector(".btn-bar")
const btnBarClose = document.querySelector(".btn-bar-close")
const nav = document.querySelector("#navigator")

btnBar.addEventListener('click', () => {
  nav.classList.toggle("hidden")
})

btnBarClose.addEventListener('click', () => {
  nav.classList.add("hidden")
})