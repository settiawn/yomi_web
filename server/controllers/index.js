const { User, Profile, List, Order } = require("../models/index");
const axios = require("axios").default;

module.exports = class Controller {
  static async showProfile(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await Profile.findByPk(id, {
        include: [
          {
            model: List,
          },
        ],
      });
      if (!profile) throw { name: "ProfileNotFound" };
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async editProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { name, picture, bio } = req.body;

      await Profile.update({ name, picture, bio }, { where: { id } });

      res.json({ message: "Profile has been updated" });
    } catch (error) {
      next(error);
    }
  }

  static async upgrade(req, res, next) {
    try {
      const { orderId } = req.body;
      console.log(orderId);
      const order = await Order.findOne({ where: { orderId } });
      if (!order) throw { name: "OrderNotFound" };
      if (req.user.id !== order.userId) throw { name: "Forbidden" };
      if (req.profile.status === "supporter")
        throw { name: "AlreadySupporter" };
      if (order.status === "paid") throw { name: "AlreadyPaid" };

      const serverKey = process.env.MIDTRANS_SERVER_KEY.toString("base64");
      const serverKeyBase64 = Buffer.from(serverKey + ":").toString("base64");

      const { data } = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
        {
          headers: {
            Authorization: "Basic " + serverKeyBase64,
          },
        }
      );

      if (data.status_code === "200" && data.transaction_status === "capture") {
        await req.profile.update({ status: "supporter" });
        await order.update({ status: "paid", paidDate: new Date() });
      } else {
        throw { name: "MidtransError" };
      }

      res.json({ message: "Upgrade success" });
    } catch (error) {
      next(error);
    }
  }

  static async addList(req, res, next) {
    try {
      const { mangaId } = req.params;
      const response = await axios({
        method: "get",
        url: "https://api.mangadex.org/manga/" + mangaId,
      });

      const { data } = response.data;
      if (!data) throw { name: "MangaNotFound" };
      // console.log(data.id);
      // console.log(data.relationships[2].id);
      // console.log(req.profile.id);

      await List.create({
        profileId: req.profile.id,
        mangaId: data.id,
        coverId: data.relationships[2].id,
      });
      //manga id dari axios, cover id dari axios, profileId dari req.profile

      res
        .status(201)
        .json({ message: `Added "${data.attributes.title.en}" to your list` });
    } catch (error) {
      next(error);
    }
  }

  static async editList(req, res, next) {
    try {
      const { listId } = req.params;
      const { comments, rating } = req.body;
      await List.update({ comments, rating }, { where: { id: listId } });

      res.json({ message: "Entry has been updated" });
    } catch (error) {
      next(error);
    }
  }
  
  static async deleteList(req, res, next) {
    try {
      const { listId } = req.params;
      await List.destroy({ where: { id: listId } });

      res.json({ message: "Entry has been deleted" });
    } catch (error) {
      next(error);
    }
  }
};
