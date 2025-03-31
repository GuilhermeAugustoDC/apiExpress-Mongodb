import livro from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const litaLivros = await livro.find({});
      res.status(200).json(litaLivros);
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na requisição`,
      });
    }
  }

  static async listarLivroByID(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na requisição do livro`,
      });
    }
  }

  static async cadastrarLivro(req, res) {
    try {
      const novoLivro = await livro.create(req.body);
      res.status(201).json({ msg: "criado com sucesso", livro: novoLivro });
    } catch (err) {
      res.status(500).json({ msg: `${err.message} - falha no cadastro` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro Atualizado" });
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na atualização do livro`,
      });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro Excluido" });
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na exclusão do livro`,
      });
    }
  }
}

export default LivroController;
