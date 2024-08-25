import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../addproduct/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

  // Estado inicial do produto com campos vazios
  const products = {
    pname: "",
    pcode: "",
    pdescripton: "",
    pprice: ""
  }

  // Obtem o ID do produto da URL
  const { id } = useParams();
  //navegacao entre paginas
  const navigate = useNavigate();
  // Estado para armazenar os dados do produto
  const [product, setProduct] = useState(products);

  // Funcao para atualizar o estado do produto com base nas mudanças nos inputs
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    console.log(product);
  }

  // useEffect para buscar os dados do produto quando o componente e montado ou o ID muda
  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        // Atualiza o estado com os dados do produto recebido da API
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error); 
      });
  }, [id]);

  // Funcao para lidar com o envio do formulario
  const submitForm = async (e) => {
    e.preventDefault(); // Previne o envio padrao de formulario
    await axios.put(`http://localhost:8000/api/update/${id}`, product)
      .then((response) => {
        // Exibe uma notificacao de sucesso
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch(error => console.log(error)); 
  }

  return (
    <div className='addProduct'>
      {/* Link para voltar a pagina principal */}
      <Link to={"/"} className="backButton">Back</Link>
      <h3>Update product</h3>
      {/* Formulário para atualizar o produto */}
      <form className='addProductForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="pname">Product name</label>
          <input type="text" value={product.pname} onChange={inputChangeHandler} id="pname" name="pname" autoComplete='off' placeholder='Product name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="pcode">Product code</label>
          <input type="text" value={product.pcode} onChange={inputChangeHandler} id="pcode" name="pcode" autoComplete='off' placeholder='Product code' />
        </div>
        <div className="inputGroup">
          <label htmlFor="pdescripton">Description</label>
          <input type="text" value={product.pdescripton} onChange={inputChangeHandler} id="pdescripton" name="pdescripton" autoComplete='off' placeholder='Description' />
        </div>
        <div className="inputGroup">
          <label htmlFor="pprice">Price</label>
          <input type="text" value={product.pprice} onChange={inputChangeHandler} id="pprice" name="pprice" autoComplete='off' placeholder='Price' />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE PRODUCT</button>
        </div>
      </form>
    </div>
  )
}

export default Edit;
