export class ShoppingCart {
  constructor(element, props) {
    this.element = element;
    this.props = props;
    this.basketItems = props.basketItems;
    this.render();
    this.element.addEventListener('click', (event) => {
      if(!event.target.closest("[data-element='close']")) return;
      let phoneName = event.target.parentElement.querySelector("[data-phone-id]").textContent.trim();
      this.props.removeFromBasket(phoneName);
    });
  }

  render() {
    this.element.innerHTML = `
      <div class="ShoppingCart">
        <p>Shopping Cart</p>
        <ul>
          ${this.basketItems.map((phone) => {
            return `
            <li>
              <span data-phone-id="${phone.id}"> ${phone.id} </span>
              <button class="btn-remove" data-element="close">[x]</button>
            </li>`
          }).join("")
          }
        </ul>

      </div>
    `
  }
}