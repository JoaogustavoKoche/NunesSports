import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/productRoute.js";


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// Define a porta para o servidor, ou usa a porta especificada no arquivo .env
const PORT = process.env.PORT || 7000;
// Define a URL do banco de dados MongoDB a partir das variaveis de ambiente
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    // Mensagem de sucesso
    console.log("DB connected sucessfull");

    //Porta usada
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

    // Exibe uma mensagem de erro no console se a conexão com o banco de dados falhar
}).catch(error => console.log(error));


app.use("/api", route);