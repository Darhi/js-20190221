export class PhoneViewer {
  constructor(element, props) {
    this.element = element;
    this.props = props;
    this.render();
    this.element.addEventListener('click', this.showPic.bind(this));
    this.element.addEventListener('click', () => {
      if(!event.target.closest("[data-go='PhonesPage']")) return;
      this.props.setState({
          selectedPhone: null
      })
    });
    this.element.addEventListener('click', (event) => {
      if(!event.target.closest("[data-event='addBasketItem']")) return;
      let phoneName = this.element.querySelector('h1').textContent;
      this.props.addToBasket(phoneName);
    })
  }

  render(){
    const {phone} = this.props;
    let thumbs = phone.images.map((image) => {
      return `
        <li>
          <img src="${image}">
        </li>`
    })

    this.element.innerHTML = `
      <div>
        <img class="phone" src="${phone.images[0]}">

        <button class="btn btn-ocean" data-go="PhonesPage">Back</button>
        <button class="btn btn-ocean" data-event="addBasketItem">Add to basket</button>

        <h1>${phone.name}</h1>

        <p>${phone.description}</p>

        <ul class="phone-thumbs">
          ${thumbs}
        </ul>
      </div>
    `
  }

  showPic(event){
    let thumb = event.target.closest('.phone-thumbs img'),
    bigPic = this.element.querySelector('.phone');
    if (thumb) {
      bigPic.src = thumb.src;
    }

  }
 }
