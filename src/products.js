import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCollection from '../components/sitecomp/cardsection';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    axios.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="products-page">
        <h2>Products</h2>
        <CardCollection />
    </div>
  );
};

export default Products;