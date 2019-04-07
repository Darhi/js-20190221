export class PhonesCatalog {
  constructor(element, props) {
    this.element = element;
    this.props = props;
    this.render();
    this.element.addEventListener('click', (event) => {
      let phone = event.target.closest("[data-element='phoneLink']");
      if (!phone) return;
      this.props.onPhoneSelected(phone.dataset.phoneId);
    })
    this.element.addEventListener('click', (event) => {
      if(!event.target.closest("[data-event='addBasketItem']")) return;
      let phone = event.target.closest('li').querySelector('img');
      this.props.addToBasket(phone.alt);
    })
  }

  render() {
    let phonesHTML = this.props.phones.map((phone)=>{
      return `
        <li class="thumbnail">
          <a href="#!/phones/${phone.id}" class="thumb" data-element="phoneLink" data-phone-id="${phone.id}">
            <img alt="${phone.name}" src="${phone.imageUrl}">
          </a>

          <div class="phones__btn-buy-wrapper">
            <a class="btn btn-ocean" data-event="addBasketItem">
              Add
            </a>
          </div>

          <a href="#!/phones/${phone.id}" data-element="phoneLink" data-phone-id="${phone.id}">
            ${phone.name}
          </a>
          ${phone.snippet}
        </li>`
    });

    this.element.innerHTML = `
      <div class="PhonesCatalog">
        <ul class="phones"> 
          ${phonesHTML.join(" ")}
        </ul>
      </div>`
  }

}