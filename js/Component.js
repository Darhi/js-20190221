/* global _ */

export default class Component {
  constructor(element, props = {}) {
    this.element = element;
    this.props = props;
    this.optimization = true;

    this.components = {};
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
  }

  on(eventName, elementName, callback) {
    this.element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(
        `[data-element="${elementName}"]`,
      );

      if (!delegateTarget) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      event.delegateTarget = delegateTarget;
      callback(event);
    });
  }

  initComponent(Constructor, props = {}) {
    const componentName = Constructor.name;
    const element = this.element.querySelector(`[data-component="${componentName}"]`);

    if (!element) {
      return;
    }

    const current = this.components[componentName];

    if (!current || !_.isEqual(current.props, props) || !this.optimization) {
      console.log('optimizaion: ' + this.optimization);
      this.components[componentName] = new Constructor(element, props);
      this.optimization = true;
    } else {
      element.parentNode.replaceChild(current.element, element);
    }
  }
}
