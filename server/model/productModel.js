import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
   
    pname: {
        type: String,   // Tipo de dado e uma string
        required: true  // Campo obrigatorio
    },
   
    pcode: {
        type: String,   
        required: true  
    },
    
    pdescripton: {
        type: String,   
        required: true  
    },
    
    pprice: {
        type: Number,   
        required: true  
    }
});

// Cria e exporta o modelo do produto
export default mongoose.model("Product", productSchema);
