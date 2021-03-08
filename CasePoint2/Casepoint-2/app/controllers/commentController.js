const { comment } = require("./../db/models");
const response = require("./../response/res");

class CommentController {
  static async CreateComment(req, res) {
    try {
      const dataComment = await comment.create({
        body: req.body.body,
        todoId: req.body.todoId,
      });
      return response.resJsonSucces(
        "successfully created",
        dataComment,
        201,
        res
      );
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async getAllComment(req, res) {
    try {
      const dataComment = await comment.findAll();
      return response.resJsonSucces(
        "success find all comments",
        dataComment,
        200,
        res
      );
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async getByIdComment(req, res) {
    try {
      const dataComment = await comment.findByPk(req.params.id);
      if (dataComment) {
        return response.resJsonSucces("success find comment by id", dataComment, 200, res);
      }
      return response.resJsonSucces(
        "comment doesn't exist",
        dataComment,
        200,
        res
      );
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async deleteComment(req, res) {
    try {
      const dataComment = await comment.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataComment) {
        return response.resJsonSucces(
          "todo deleted successfully",
          dataComment,
          200,
          res
        );
      }
      return response.resJsonSucces("comment doesn't exist", dataComment, 200,res)
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async updateComment(req, res) {
    try {
      const newComment = {
        body: req.body.body,
      };
    //   console.log(newComment)
      const updateTodo = await comment.update(newComment, {
        where: {
          id: req.params.id,
        },
      });
    //   console.log(updateTodo)
      if (updateTodo[0]) {
        const getComment = await comment.findByPk(req.params.id);
        return response.resJsonSucces(
          "updated successfully",
          getComment,
          200,
          res
        );
      }
      return response.resJsonSucces("comment doesn't exist", [], 200, res);
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }
}

module.exports = CommentController