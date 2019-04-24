import Component from '../Component.js';

export default class PhoneViewer extends Component {
  constructor(element, props) {
    super(element, props);

    this.state = {
      selectedImage: this.props.phone.images[0],
    };

    this.render();

    this.on('click', 'BackButton', () => {
      this.props.onBack();
    });

    this.on('click', 'AddButton', () => {
      this.props.onAdd(this.props.phone.id);
    });

    this.on('click', 'SmallImage', (event) => {
      const { imageUrl } = event.delegateTarget.dataset;

      this.setState({
        selectedImage: imageUrl,
      });
    });
  }

  render() {
    const { phone } = this.props;

    this.element.innerHTML = `
      <div>
        <img class="phone" src="${this.state.selectedImage}">
    
        <button data-element="BackButton">Back</button>
        <button data-element="AddButton">Add to basket</button>
    
        <h1>${phone.name}</h1>
    
        <p>${phone.description}</p>
    
        <ul class="phone-thumbs">
          ${phone.images.map(imageUrl => `
            <li data-element="SmallImage" data-image-url="${imageUrl}">
              <img src="${imageUrl}">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}
