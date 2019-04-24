import Component from '../Component.js';

export default class PhonesCatalog extends Component {
  constructor(element, props) {
    super(element, props);

    this.render();

    this.on('click', 'PhoneLink', (event) => {
      const { phoneId } = event.delegateTarget.dataset;
      this.props.onPhoneSelected(phoneId);
    });

    this.on('click', 'AddButton', (event) => {
      const { phoneId } = event.delegateTarget.dataset;
      this.props.onAdd(phoneId);
    });
  }

  render() {
    this.optimization = true;
    this.element.innerHTML = `
      <div>
        <ul class="phones">
          ${this.props.phones.map(phone => `
            
            <li class="thumbnail">
              <a
                data-element="PhoneLink"
                data-phone-id="${phone.id}"
                href="#!/phones/${phone.id}"
                class="thumb"
              >
                <img alt="${phone.name}" src="${phone.imageUrl}">
              </a>
  
              <div class="phones__btn-buy-wrapper">
                <a
                  data-element="AddButton"
                  data-phone-id="${phone.id}"
                  class="btn btn-success"
                >
                  Add
                </a>
              </div>
  
              <a
                data-element="PhoneLink"
                data-phone-id="${phone.id}"
                href="#!/phones/${phone.id}"
              >
              
                ${phone.name}
              </a>
              
              <p>${phone.snippet}</p>
            </li>
          
          `).join('')}
        </ul>
      </div>
    `;
  }
}
