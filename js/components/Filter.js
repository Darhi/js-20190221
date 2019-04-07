export class Filter {
  constructor(element, props) {
    this.element = element;
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="Filter">
        <p>
          Search:
          <input>
        </p>

        <p>
          Sort by:
          <select>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </div>
    `
  }
}