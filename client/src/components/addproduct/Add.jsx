import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  // Estado inicial do produto
  const products = {
    pname: "",
    pcode: "",
    pdescripton: "",
    pprice: ""
  }

  // Estado para armazenar os dados do produto
  const [product, setProduct] = useState(products);
 
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    // Atualiza o estado do produto com base no nome do campo e seu valor
    setProduct({ ...product, [name]: value });
  }

  
  const submitForm = async (e) => {
    e.preventDefault(); // Previne o envio padrao de formulario
    await axios.post("http://localhost:8000/api/create", product)
      .then((response) => {
        // Exibe uma notificacao de sucesso
        toast.success(response.data.msg, { position: "top-right" });
        // Retorna para a pagina inicial apos sucesso
        navigate("/");
      })
      .catch(error => console.log(error)); // Tratamento de erros 
  }

  return (
    <div className='addProduct'>
      {/* Link para retornar a pagina principal */}
      <Link to={"/"} className="backButton">Back</Link>
      <h3>Add new product</h3>
      {/* Formulario para adicionar um novo produto */}
      <form className='addProductForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="pname">Product name</label>
          <input type="text" onChange={inputHandler} id="pname" name="pname" autoComplete='off' placeholder='Product name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="pcode">Product Code</label>
          <input type="text" onChange={inputHandler} id="pcode" name="pcode" autoComplete='off' placeholder='Product code' />
        </div>
        <div className="inputGroup">
          <label htmlFor="pdescripton">Descripton</label>
          <input type="text" onChange={inputHandler} id="pdescripton" name="pdescripton" autoComplete='off' placeholder='Description' />
        </div>
        <div className="inputGroup">
          <label htmlFor="pprice">Price</label>
          <input type="text" onChange={inputHandler} id="pprice" name="pprice" autoComplete='off' placeholder='Price' />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD PRODUCT</button>
        </div>
      </form>
    </div>
  )
}

export default Add;
