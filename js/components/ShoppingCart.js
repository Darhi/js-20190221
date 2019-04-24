import Component from '../Component.js';

export default class ShoppingCart extends Component {
  constructor(element, props) {
    super(element, props);

    this.render();

    this.on('click', 'RemoveButton', (event) => {
      const { item } = event.delegateTarget.dataset;
      this.props.onRemove(item);
    });
  }

  render() {
    this.element.innerHTML = `
      <div>
        <h4>Shopping Cart</h4>
        <ul>
          ${Object.keys(this.props.items).map(item => `
          
            <li>
              ${item} - ${this.props.items[item]}
              <button
                data-element="RemoveButton"
                data-item="${item}"
              >X</button>
            </li> 
          
          `).join('')}
        </ul>
      </div>
    `;
  }
}
