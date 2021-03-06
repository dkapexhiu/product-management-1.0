import React from 'react';

const RESET_VALUES = {id: '', category: '', price: '', stocked: false, name: ''};

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      product: Object.assign({}, RESET_VALUES),
      errors: {},
      showingAddForm: false
    };
    this.add = this.add.bind(this);
  }
  
  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => {
      prevState.product[name] = value;
      return { product: prevState.product };
    });
  }
  
  handleSave(e) {
    var form = e.target.closest( 'form' );
    if( form.checkValidity() ) {
      e.preventDefault();
      this.props.onSave(this.state.product);
      this.setState({
        product: Object.assign({}, RESET_VALUES),
        errors: {}
      });
    }
  }
  
  toggleAddForm = () => {
    this.setState((pstate) => ({
      showingAddForm: !pstate.showingAddForm
    }))
  }
  
  add(){
     return (<form>
        <h3>Enter a new product</h3>
        <p>
          <label>
            Name
            <br />
            <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name} required />
          </label>
        </p>
        <p>
          <label>
            Category
            <br />
            <input type="text" name="category" onChange={this.handleChange} value={this.state.product.category} required/>
          </label>
        </p>
        <p>
          <label>
            Price
            <br />
            <input type="text" name="price" onChange={this.handleChange} value={this.state.product.price} required/>
          </label>
        </p>
        <p>
          <label>
            Date
            <br />
            <input type="date" name="date" onChange={this.handleChange} value={this.state.product.date} />
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="stocked" onChange={this.handleChange} checked={this.state.product.stocked}/>
            &nbsp;In stock?
          </label>
        </p>
        <input type="submit" value="Save" onClick={this.handleSave}/>
      </form>);
  }
  
  render() {
    return (
      <div>
        <button onClick={this.toggleAddForm}>Add</button>
        { this.state.showingAddForm && this.add() }
      </div>
    );
  }
}

export default ProductForm;