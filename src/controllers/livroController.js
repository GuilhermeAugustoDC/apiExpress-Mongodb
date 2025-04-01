import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na requisição dos livros`,
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
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: autorEncontrado };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ msg: "Livro criado com sucesso", livro: livroCriado });
    } catch (err) {
      res
        .status(500)
        .json({ msg: `${err.message} - falha no cadastro do livro` });
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

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na busca do livro por editora`,
      });
    }
  }
}

export default LivroController;
