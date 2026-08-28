// Mobile Menu Click 
document.addEventListener('DOMContentLoaded', ()=> {
  let menu_click = document.querySelector('.banner-hero__mobile-menu-icon');
  menu_click.addEventListener('click', (e)=> {

    let currentElement = e.currentTarget;
    currentElement.classList.toggle('active');
  })
})