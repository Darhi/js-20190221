import {Filter} from "./Filter.js";
import {ShoppingCart} from "./ShoppingCart.js";
import {PhonesCatalog} from "./PhonesCatalog.js";
import {PhoneViewer} from "./PhoneViewer.js";
import {getAll, getPhoneById} from "../api/phones.js";

export class PhonesPage{  

  constructor(element){
    this.element = element;
    this.state = {
      phones: getAll(),
      selectedPhone: null,
      basketItems: [],
    };

    this.init();
    this.element.addEventListener('click', (event) => {
      if(!event.target.closest("[data-event='addBasketItem']")) return;
      event.preventDefault();
    });
  }

  init(){
    this.render();
    this.initComponent(PhoneViewer, {
      phone: this.state.selectedPhone,
      addToBasket: this.addToBasket.bind(this),
      setState: this.setState.bind(this),
    });
    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: (phoneId) => {
        this.setState({
          selectedPhone: getPhoneById(phoneId)
        })
      },
      addToBasket: this.addToBasket.bind(this),
    });
    this.initComponent(Filter);
    this.initComponent(ShoppingCart, {
      basketItems: this.state.basketItems,
      removeFromBasket: this.removeFromBasket.bind(this),
    });
  }

  addToBasket(phone) {
    this.state.basketItems.push({
      id: `${phone}`
    })

    this.init();
  }

  removeFromBasket(phoneName) {
    let index = this.state.basketItems.findIndex(phone => phone.id === phoneName);
    this.state.basketItems.splice(index, 1);

    this.init();
  }

  setState(newState){
    this.state = {
    ...this.state,
    ...newState
    };

    this.init();
  }

  showPhone(event) {
    if (event.target.closest('a')) {
      this.state.selectedPhone = getPhoneById();
      this.init();
    }

    if (event.target.closest('[data-go="PhonesPage"]')) {
      this.state.selectedPhone = null;
      this.init();
    }
  }

  initComponent(Constructor, props = {}){
    const element = this.element.querySelector(`[data-component=${Constructor.name}]`);
      if (element) new Constructor(element, props);
  }


  render(){
    this.element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section data-component="Filter">

          </section>

          <section data-component="ShoppingCart">

          </section>

        </div>

        <!--Main content-->
        <div class="col-md-10">
        ${ this.state.selectedPhone ? `
          <section data-component="PhoneViewer">
          </section>`
          : `<section data-component="PhonesCatalog">
          </section>`}
        </div>
      </div>`;
  }
}