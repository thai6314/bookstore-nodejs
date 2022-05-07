const Category = require("../../model/book/category");

module.exports = {
  async createCategory(req, res, next) {
    try {
      const tmp = req.body;

      const dataCategory = {
        type: tmp.type,
      };
      const category = new Category(dataCategory);

      await category.save();
      res.json({
        message: "Category is created successfully",
        dataCategory,
      });
    } catch (error) {
      res.status(403).json({ error: errorr });
    }
  },

  async getCategory(req, res, next) {
    try {
      const response = await Category.find().lean();
      res.json({
        data: response,
      });
    } catch (error) {
      res.status(403).json({ error: error });
    }
  },
};
