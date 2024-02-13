module.exports = class Controller {
  static async index(req, res, next) {
    try {
      res.send("OK");
    } catch (error) {
      next(error);
    }
  }
  static async addList(req, res, next) {
    try {
      res.send("OK");
    } catch (error) {
      next(error);
    }
  }
  static async editList(req, res, next) {
    try {
      res.send("OK");
    } catch (error) {
      next(error);
    }
  }
  static async deleteList(req, res, next) {
    try {
      res.send("OK");
    } catch (error) {
      next(error);
    }
  }
  static async showProfile(req, res, next) {
    try {
      res.send("OK");
    } catch (error) {
      next(error);
    }
  }
  static async editProfile(req, res, next) {
    try {
      res.send("OK");
    } catch (error) {
      next(error);
    }
  }
};
