const btnBar = document.querySelector(".btn-bar")
const btnBarClose = document.querySelector(".btn-bar-close")
const nav = document.querySelector("#navigator")
const contentNavigator = document.querySelector("#navigator")

btnBar.addEventListener('click', () => {
  nav.classList.toggle("hidden")
  contentNavigator.classList.toggle("shadow")
})

btnBarClose.addEventListener('click', () => {
  nav.classList.toggle("hidden")
  contentNavigator.classList.toggle("shadow")
})