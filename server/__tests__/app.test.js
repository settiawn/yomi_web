const { test, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { User, Profile, List, Order } = require("../models/index");

let access_token;

beforeAll(async () => {
  const user = await User.create({
    email: "user@mail.at",
    password: "user",
  });

  access_token = signToken({ id: user.id });
});

afterAll(async () => {
    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  
    await Profile.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  
    await List.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Order.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });
