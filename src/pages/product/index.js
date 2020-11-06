import React, {
  Component
} from 'react';

import api from '../../services/api'

import './styles.css'

export default class Product extends Component {

  state = {
    product: {},

  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await api.get(`products/${id}`);

    this.setState({ product: response.data })
  }

  render() {
    const product = this.state.product;

    return (
      <div className="product-info" >
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <a href={product.url} target="_blank" rel="noopener noreferrer">Acessar repositório</a>
        <a id="backHome" href="http://localhost:3000" >Voltar para home</a>
      </div>
    )
  }
}