class ProductGridButton extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click',(e)=> {
      let currentQuickview = this.closest('.product-grid__grid-image').querySelector('quick-view-template');
      currentQuickview.classList.add('active');
    })
  }
}
customElements.define('product-grid-button',ProductGridButton)
class QuickViewTemplate extends HTMLElement {
  connectedCallback() {
    this.variants = JSON.parse(this.querySelector('[data-variants]').textContent);
    this.priceEl = this.querySelector('.quick-view__price');
    this.submitBtn = this.querySelector('[data-quick-view-submit]');
    this.sizeOptionsList = this.querySelector('.select-swatches__options'); 

    this.selected = [];
    this.querySelectorAll('[data-option-index]').forEach((control) => {
      const index = Number(control.dataset.optionIndex);
      const active = control.querySelector('.is-active[data-value]');
      const select = control.querySelector('select');
      this.selected[index] = active?.dataset.value || select?.value || undefined;
    });

    this.closeButton = this.querySelector('.quick-view__close');
    this.internalPopup = this.querySelector('.quick-view__holder');

    this.closeButton.addEventListener('click', (e)=> {
      this.classList.remove('active');
    })

    this.addEventListener('click', (e) => {
      if (e.currentTarget === e.target) {
        this.classList.remove('active');
      }
      const swatch = e.target.closest('[data-value]');
      if (swatch) this.selectOption(swatch.closest('[data-option-index]'), swatch.dataset.value);
    });

    this.addEventListener('change', (e) => {
      const control = e.target.closest('[data-option-index]');
      if (control) this.selectOption(control, e.target.value);
    });

    this.submitBtn.addEventListener('click', () => this.addToCart());

    this.updateVariant();
  }

  selectOption(control, value) {
    const index = Number(control.dataset.optionIndex);
    this.selected[index] = value;

    control.querySelectorAll('[data-value]').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.value === value);
    });

    this.updateVariant();
  }

  isSizeSelected() {
    if (!this.sizeOptionsList) return true;
    return !!this.sizeOptionsList.querySelector('li.is-active');
  }

  updateVariant() {
    this.variant = this.variants.find((v) =>
      [v.option1, v.option2, v.option3].every(
        (val, i) => this.selected[i] === undefined || val === this.selected[i]
      )
    );

    if (this.variant) {
      this.priceEl.textContent = this.variant.price;
      if (this.isSizeSelected()) {
        this.submitBtn.classList.toggle('is-disabled', !this.variant.available);
      }
    }
  }

  shouldAddBundleItem() {
    const options = [this.variant.option1, this.variant.option2, this.variant.option3]
      .map((v) => v?.toLowerCase());
    return options.includes('black') && options.includes('m');
  }

  addToCart() {
  
    if (!this.variant?.available || !this.isSizeSelected() || this.submitBtn.classList.contains('is-loading')) return;
    this.submitBtn.classList.add('is-loading', 'is-disabled');
    const items = [{ id: this.variant.id, quantity: 1 }];
    
    if (this.shouldAddBundleItem()) {
      items.push({ id: 48692728692930, quantity: 1 });
    }

    console.log('items----',items);
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    })
      .then((r) => r.json())
      .then(() => {
        this.submitBtn.classList.remove('is-loading');
        window.location.href = window.Shopify?.routes?.root
          ? `${window.Shopify.routes.root}cart`
          : '/cart';
      })
      .catch((err) => {
        this.submitBtn.classList.remove('is-loading', 'is-disabled');
        console.error('Quick View: add to cart failed', err);
      }) 
  }

}

customElements.define('quick-view-template', QuickViewTemplate);

