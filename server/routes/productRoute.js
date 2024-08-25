import express from "express";
import { create, deleteProduct, getAll, getOne, update } from "../controller/productController.js";


const route = express.Router();

//Criando rotas respectivas  

route.post("/create", create);
route.get("/getAll", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteProduct);

export default route;