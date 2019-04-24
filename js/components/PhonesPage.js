import Component from '../Component.js';
import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import ShoppingCart from './ShoppingCart.js';
import Filter from './Filter.js';
import { getAll, getById } from '../api/phones.js';

export default class PhonesPage extends Component {
  constructor(element, props) {
    super(element, props);

    this.state = {
      phones: [],
      query: [],
      phonesSelection: false,
      order: 'name',
      selectedPhone: null,
      items: {
        qweqwe: 2,
        dfsdfgdfg: 1,
      },
    };

    this.onPhoneSelected = (phoneId) => this.selectedPhone(phoneId);
    this.onAdd = (phoneId) => this.addItem(phoneId);
    this.onBack = () => this.unselectedPhone();
    this.onRemove = (itemToRemove) => this.removeItem(itemToRemove);
    this.onSearch = (phones) => this.searchPhones(phones);
    this.onSelectOrder = (order) => this.sortPhones(this.state.phones, order);

    this.render();

    this.loadPhones();
  }

  async loadPhones() {
    const phones = await getAll();
    this.sortPhones(phones, this.state.order);

    this.setState({ phones });
  }

  addItem(item) {
    const oldItems = this.state.items;
    const items = {
      ...oldItems,
      [item]: oldItems[item] ? oldItems[item] + 1 : 1,
    };

    this.setState({ items });
  }

  removeItem(itemToRemove) {
    const newItems = { ...this.state.items };
    delete newItems[itemToRemove];

    this.setState({
      items: newItems,
    });
  }

  sortPhones (arr, order) {
    const newPhonesOrder = this.sort(arr, order);
    this.optimization = false;

    this.setState({
      phones: newPhonesOrder,
    })

  }

  sort(arr, order) {
    if (order === "name") {
      arr.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
      });
    }

    if (order === "age") {
      arr.sort((a, b) => {
        return a.age - b.age
      })
    }

    return arr;
  }

  selectedPhone(phoneId) {
    getById(phoneId)
      .then(phone => {
        this.setState({ selectedPhone: phone });
      });
  }

  unselectedPhone() {
    this.setState({ selectedPhone: null });
  }

  searchPhones(phones) {
    if (this.state.query.length === 0) {
     this.state.query = [...this.state.phones];
    }
    
    this.setState({ phones });
  }

  init() {
    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: this.onPhoneSelected,
      onAdd: this.onAdd,
    });

    this.initComponent(PhoneViewer, {
      phone: this.state.selectedPhone,
      onBack: this.onBack,
      onAdd: this.onAdd,
    });

    this.initComponent(ShoppingCart, {
      items: this.state.items,
      onRemove: this.onRemove,
    });

    this.initComponent(Filter, {
      phones: this.state.phones,
      query: this.state.query,
      onPhoneSelected: this.onPhoneSelected,
      onSearch: this.onSearch,
      onSelectOrder: this.onSelectOrder,
    });
  }

  render() {
    this.element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <div data-component="Filter"></div>
          </section>
  
          <section>
            <div data-component="ShoppingCart"></div>
          </section>
        </div>
  
        <!--Main content-->
        <div class="col-md-10">
          ${this.state.selectedPhone ? `
            <div data-component="PhoneViewer"></div>
          ` : `
            <div data-component="PhonesCatalog"></div>
          `}
        </div>
      </div>
    `;

    this.init();
  }
}
