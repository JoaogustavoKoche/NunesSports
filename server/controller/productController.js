import Product from "../model/productModel.js";

// Funcao para criar um novo produto
export const create = async (req, res) => {
    try {
        // Cria uma nova instância do modelo Product com os dados recebidos
        const productData = new Product(req.body);

        // Verifica se os dados do produto foram fornecidos
        if (!productData) {
            return res.status(404).json({ msg: "Product data not found" });
        }

        // Salva o novo produto no banco de dados
        await productData.save();
        res.status(200).json({ msg: "Product created successfully" });

    } catch (error) {
        // Retorna uma resposta de erro em caso de falha
        res.status(500).json({ error: error });
    }
}

// Funcao para obter todos os produtos
export const getAll = async (req, res) => {
    try {
        // Busca todos os produtos no banco de dados
        const productData = await Product.find();

        // Verifica se algum produto foi encontrado
        if (!productData) {
            return res.status(404).json({ msg: "Product data not found" });
        }
        res.status(200).json(productData);

    } catch (error) {
        // Retorna uma resposta de erro em caso de falha
        res.status(500).json({ error: error });
    }
}

// Funcao para obter um produto especifico pelo ID
export const getOne = async (req, res) => {
    try {
        // Obtem o ID do produto dos parametros da requisicao
        const id = req.params.id;

        // Busca o produto pelo ID
        const productExist = await Product.findById(id);

        // Verifica se o produto foi encontrado
        if (!productExist) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json(productExist);

    } catch (error) {
        // Retorna uma resposta de erro em caso de falha
        res.status(500).json({ error: error });
    }
}

// Funcao para atualizar um produto existente
export const update = async (req, res) => {
    try {
        // Obtem o ID do produto dos parametros da requisicao
        const id = req.params.id;

        // Verifica se o produto existe
        const productExist = await Product.findById(id);
        if (!productExist) {
            return res.status(401).json({ msg: "Product not found" });
        }

        // Atualiza o produto com os novos dados fornecidos
        const updatedData = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "Product updated successfully" });

    } catch (error) {
        // Retorna uma resposta de erro em caso de falha
        res.status(500).json({ error: error });
    }
}

// Funcao para excluir um produto
export const deleteProduct = async (req, res) => {
    try {
        // Obtem o ID do produto dos parametros da requisicao
        const id = req.params.id;

        // Verifica se o produto existe
        const productExist = await Product.findById(id);
        if (!productExist) {
            return res.status(404).json({ msg: "Product not exist" });
        }

        // Exclui o produto do banco de dados
        await Product.findByIdAndDelete(id);
        res.status(200).json({ msg: "Product deleted successfully" });

    } catch (error) {
        // Retorna uma resposta de erro em caso de falha
        res.status(500).json({ error: error });
    }
}
