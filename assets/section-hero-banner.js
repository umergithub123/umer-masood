// Mobile Menu Click 
class MobileMenuIcon extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (e)=> {
      this.classList.toggle('active');
    })
  }
}

customElements.define('mobile-menu-icon',MobileMenuIcon)