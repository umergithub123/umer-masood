document.addEventListener('DOMContentLoaded', ()=> {
  // quick view trigger open 
  let quick_view_trigger = document.querySelectorAll('.product-grid__button');
  quick_view_trigger.forEach((button)=>{
    button.addEventListener('click', (e)=> {
      let currentElement = e.currentTarget;
      let currentQuickview = currentElement.closest('.product-grid__grid-image').querySelector('quick-view-template');
      currentQuickview.classList.add('active');
    })
  })

  // close event 
  let quick_view_close = document.querySelectorAll('.quick-view__close');
  quick_view_close.forEach((close_button)=> {
    close_button.addEventListener('click',(e)=> {
      let currentElement = e.currentTarget;
      let currentQuickview = currentElement.closest('.product-grid__grid-image').querySelector('quick-view-template');
      currentQuickview.classList.remove('active');
    })
  })

  let quick_view_template = document.querySelectorAll('quick-view-template');
  quick_view_template.forEach((template)=>{
    template.addEventListener('click',(e)=> {
      if (e.currentTarget.closest == 'quick-view__holder' && e.currentTarget != '')
    })
  })
})

