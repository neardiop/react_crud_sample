import React, { Component } from 'react';
import './App.css';



import ListItem from './ListItem';

class App extends Component {
  constructor() {
    super();

    this.state =
    {
      newProductName: '',
      newProductPrice: 0,
      newProductDescription: '',
      newProductQuantity: 0,

      editing: false,

      editingIndex: null,

      notification: null,

      products: [
        {
          id: 1, name: 'Portable', price: 435, description: "description", quantity: 12
        }
      ],
      loading: true

    };

    this.alert = this.alert.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.generateID = this.generateID.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
  };

  handleChangeName(event) {
    this.setState(
      {
        newProductName: event.target.value
      }
    )
  }

  handleChangeDescription(event) {
    this.setState(
      {
        newProductDescription: event.target.value
      }
    )
  }

  handleChangePrice(event) {
    this.setState(
      {
        newProductPrice: event.target.value
      }
    )
  }

  handleChangeQuantity(event) {
    this.setState(
      {
        newProductQuantity: event.target.value
      }
    )
  }

  generateID() {
    const lastProduct = this.state.products[this.state.products.length - 1];
    if (lastProduct) {
      return lastProduct.id + 1;
    }
    return 1;
  }

  async addProduct() {
    const newProduct = {

      name: this.state.newProductName,
      price: this.state.newProductPrice,
      description: this.state.newProductDescription,
      quantity: this.state.newProductQuantity,

      id: this.generateID()
    };

    const products = this.state.products;
    products.push(newProduct);

    this.setState(
      {
        products: products,
        newProductName: '',
        newProductPrice: 0,
        newProductDescription: '',
        newProductQuantity: 0
      }
    );

    this.alert('Product Added Succesfully');

  }

  alert(notification) {

    this.setState(
      {
        notification
      }
    );
    setTimeout(() => {
      this.setState(
        {
          notification: null
        }
      );
    }, 2000)
  }

  async deleteProduct(index) {
    const products = this.state.products;

    delete products[index];

    this.setState({ products });
    this.alert('Product Deleted Succesfully');
  }


  editProduct(index) {

    const product = this.state.products[index];
    this.setState(
      {
        editing: true,
        newProductName: product.name,
        newProductPrice: product.price,
        newProductQuantity: product.quantity,
        newProductDescription: product.description,
        editingIndex: index
      }
    )

  }

  async updateProduct() {
    const product = this.state.products[this.state.editingIndex]

    product.name = this.state.newProductName;
    product.description = this.state.newProductDescription;
    product.price = this.state.newProductPrice;
    product.quantity = this.state.newProductQuantity;

    const products = this.state.products;
    this.setState({
      products, editing: false,
      editingIndex: null,
      newProductName: '',
      newProductDescription: '',
      newProductPrice: '',
      newProductQuantity: ''
    });

    this.alert('Product Updated Succesfully');
  }


  render() {
    return (

      <div className="App">

        <header className="App-header">
          Welcome to product gestion
        </header>
        <div className="container" >
          {
            this.state.notification &&
            <div className="alert mt-3 alert-success">
              <p className="text-center">
                {this.state.notification}
              </p>
            </div>
          }
          <div>
            <div class="form-group">
              <label for="productName">Name
            <input type="text"
                  name="productName"
                  className="my-4 form-control"
                  placeholder="Name"
                  onChange={this.handleChangeName}
                  value={this.state.newProductName}
                />
              </label>
            </div>
            <div class="form-group">
              <label for="price">Price
            <input type="number"
                  name="price"
                  className="my-4 form-control"
                  onChange={this.handleChangePrice}
                  value={this.state.newProductPrice}
                />
              </label>
            </div>
            <div class="form-group">
              <label for="description">Description
            <input type="text"
                  name="description"
                  className="my-4 form-control"
                  placeholder="Description"
                  onChange={this.handleChangeDescription}
                  value={this.state.newProductDescription}
                />
              </label>
            </div>
            <div class="form-group">
              <label for="quantity">Quantity
            <input type="number"
                  name="quantity"
                  className="my-4 form-control"
                  onChange={this.handleChangeQuantity}
                  value={this.state.newProductQuantity}
                />
              </label>
            </div>
            <button class="btn btn-primary"
              onClick={this.state.editing ? this.updateProduct : this.addProduct}>
              {this.state.editing ? 'Update product' : 'Add product'}
            </button>
          </div>
          {
            !this.state.editing &&

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((item, index) => {
                  return <ListItem
                    key={item.id}
                    item={item}
                    editProduct={() => { this.editProduct(index); }}
                    deleteProduct={() => { this.deleteProduct(index); }}
                  />
                }
                )}
              </tbody>
            </table>
          }

        </div>

      </div>
    );
  }
}

export default App;
