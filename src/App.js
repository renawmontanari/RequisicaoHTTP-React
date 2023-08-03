
import './App.css';

import { useState, useEffect } from "react";

// Custom hook 
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  // Custom hook
  const { data: items, httpConfig, loading } = useFetch(url);

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");

  // Resgatando dados
  // useEffect(() => { 
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }

  //   fetchData();
  // }, []);

  // Add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      color,
      price,
    };

    // const res = await fetch(url, {
    //   method: "Post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // // Carregamento dinâmico
    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // Refatorando post
    httpConfig(product, "POST");
    
    setName("");
    setColor("");
    setPrice("");
  };

  return (
    <div className="App">
     <h2>Lista de Produtos</h2>
     {/* Loading */}
     {loading && <p>Carregando dados...</p>}
     {!loading && (
        <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - Cor: {product.color} - R$: {product.price}
          </li>
        ))}
       </ul>
     )}
     <div className="add__product">
        <form onSubmit={handleSubmit}>

          <label>
            Nome:
            <input 
              type="text" 
              value={name} 
              name="name" 
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Cor:
            <input 
              type="text" 
              value={color} 
              name="color" 
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input 
              type="number" 
              value={price} 
              name="price" 
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar" />
        </form>
     </div>
    </div> 
  );    
}

export default App;
