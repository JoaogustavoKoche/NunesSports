import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./product.css";
import { Link } from 'react-router-dom';

const Product = () => {

  //armazenar a lista de produtos
  const [products, setProducts] = useState([]);

  // useEffect para buscar dados dos produtos
  useEffect(() => {
    const fetchData = async () => {
      // Requisição GET para obter todos os produtos
      const response = await axios.get("http://localhost:8000/api/getall");
      // Atualiza o estado com os produtos recebidos
      setProducts(response.data);
    }

    fetchData();
  }, []); 

  // Função para excluir um produto com base no ID
  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:8000/api/delete/${productId}`)
      .then((response) => {
        // Atualiza o estado removendo o produto excluído
        setProducts((prevProduct) => prevProduct.filter((product) => product._id !== productId));
        // Exibe uma notificação de sucesso
        toast.success(response.data.msg, { position: 'top-right' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='productTable'>
      {/* Link para a página de adicionar um novo produto */}
      <Link to={"/add"} className='addButton'>Add Product</Link>
      {/* Tabela para exibir a lista de produtos */}
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product name</th>
            <th>Product Code</th>
            <th>Product description</th>
            <th>Product Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.pname}</td>
                <td>{product.pcode}</td>
                <td>{product.pdescripton}</td>
                <td>{product.pprice}</td>
                <td className='actionButtons'>
                  {/* Botão para excluir o produto */}
                  <button onClick={() => deleteProduct(product._id)}><i className="fa-solid fa-trash"></i></button>
                  {/* Link para a página de edição do produto */}
                  <Link to={`/edit/` + product._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Product;
