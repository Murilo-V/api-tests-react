import React , { Component } from 'react';
import api from '../../services/api'
import './styles.css';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    state = {
        products: [],
        apiPages: {},
        page: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {

        const response = await api.get(`/products?page=${page}`)

        const { docs, ...apiPages } = response.data;

        this.setState({
            products: docs, 
            apiPages,
            page
        })
    }

    prevPage = () => {
        const { page } = this.state;
        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        const { page, apiPages } = this.state;

        if (page === apiPages.pages) return;
        
        const pageNumber = page + 1;

        this.loadProducts(pageNumber)
    }

    render() {

        const { products, page, apiPages } = this.state;

    return (
            <div className="products-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                       <Link to={`/products/${product._id}`}>Ver detalhes</Link>
                    </article>
                ))}

                <div className="actions" >
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === apiPages.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}