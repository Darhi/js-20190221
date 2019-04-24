import Component from '../Component.js';

export default class Filter extends Component {
  constructor(element, props) {
    super(element, props);

    this.render();

    this.on('keyup', 'SearchFilter', () => {
      if (event.keyCode === 13) {
        const search = event.target.value;
        let phones;
        console.log(this.props.query);
        if (this.props.query.length) {          
          phones = this.props.query;
        }
        else phones = this.props.phones;

        const newPhones = phones.filter(phone => {
          return phone.id.indexOf(`${search}`) !== -1;
        });

        this.props.onSearch(newPhones);
      }
    });

    this.on('change', 'SelectOrder', () => {
      this.props.onSelectOrder(event.target.value);
    });
  }

  render() {
    this.element.innerHTML = `
      <div class="Filter">
        <p>
          Search:
          <input data-element="SearchFilter">
        </p>
  
        <p>
          Sort by:
          <select data-element="SelectOrder">
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </div>
    `;
  }

  
}
