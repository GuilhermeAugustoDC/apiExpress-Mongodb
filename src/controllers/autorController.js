import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Falha na requisição dos autores`,
      });
    }
  }

  static async listaAutoresByID(req, res) {
    try {
      const autorEncontrado = await autor.findById(req.params.id);
      res.status(200).json(autorEncontrado);
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na requisição do autor`,
      });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res
        .status(201)
        .json({ msg: "Autor Cadastrado com sucesso", autor: novoAutor });
    } catch (err) {
      res
        .status(500)
        .json({ msg: `${err.message} - Falha no cadastro do autor` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      await autor.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Autor atualizado com sucesso" });
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na atualização do autor`,
      });
    }
  }

  static async excluirAutor(req, res) {
    try {
      await autor.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Autor excluido com sucesso" });
    } catch (err) {
      Response.status(500).json({
        message: `${err.message} - Falha na exclusão do livro`,
      });
    }
  }
  
}
export default AutorController;
