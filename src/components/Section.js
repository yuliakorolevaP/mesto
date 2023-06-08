export default class Section{
  constructor({items, renderer}, containerSelector){
    this._items=items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(res) {
    res.forEach(item => this._renderer(item));
  }
  
  addItem(element) {
    this._container.prepend(element);
  }
}