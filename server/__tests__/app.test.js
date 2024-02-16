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

  await User.create({
    email: "user3@mail.at",
    password: "user3",
  });

  await Profile.create({
    userId: 1,
    name: "Hello"
  });

  await Profile.create({
    userId: 2,
    name: "UserKedua"
  });

  await List.create({
    profileId: 1,
    mangaId: "0c44cf39-3d6c-4472-815b-9e163613cfe9",
    coverId: "3092e00e-6765-45aa-bb56-8f3b7aa805e9.jpg",
  })

  access_token = signToken({ id: user.id });
});

describe("POST /login", () => {
  test("Berhasil login dan mengirimkan access token", async () => {
    const loginInfo = {
      email: "user@mail.at",
      password: "user",
    };

    const response = await request(app).post("/login").send(loginInfo);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });

  test("Email tidak diberikan / tidak di input", async () => {
    const loginInfo = {
      email: "",
      password: "user",
    };

    const response = await request(app).post("/login").send(loginInfo);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Password tidak diberikan / tidak di input", async () => {
    const loginInfo = {
      email: "user@mail.at",
    };

    const response = await request(app).post("/login").send(loginInfo);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Email yang diberikan invalid / tidak terdaftar", async () => {
    const loginInfo = {
      email: "user222@mail.at",
      password: "user",
    };

    const response = await request(app).post("/login").send(loginInfo);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Password yang diberikan salah / tidak match", async () => {
    const loginInfo = {
      email: "user@mail.at",
      password: "user222",
    };

    const response = await request(app).post("/login").send(loginInfo);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe("POST /register", () => {
  test("Berhasil menambahkan user", async () => {
    const data = {
      email: "user2@mail.at",
      password: "user2",
    };

    const response = await request(app)
      .post("/register")
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
  });

  test("Email tidak diberikan / tidak diinput", async () => {
    const data = {
      password: "user2",
    };

    const response = await request(app)
      .post("/register")
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Email")
    );
  });

  test("Password tidak diberikan / tidak diinput", async () => {
    const data = {
      email: "user2@mail.at"
    };

    const response = await request(app)
      .post("/register")
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Password")
    );
  });

  test("Email diberikan string kosong", async () => {
    const data = {
      email: "",
      password: "user2",
    };

    const response = await request(app)
      .post("/register")
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Email")
    );
  });

  test("Password diberikan string kosong", async () => {
    const data = {
      email: "user2@mail.at",
      password: "",
    };

    const response = await request(app)
      .post("/register")
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Password")
    );
  });

  test("Email sudah terdaftar", async () => {
    const data = {
      email: "user@mail.at",
      password: "user",
    };

    const response = await request(app)
      .post("/register")
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Email")
    );
  });

  test("Format email salah / invalid", async () => {
    const data = {
      email: "user2",
      password: "user2",
    };

    const response = await request(app)
      .post("/register")
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Format")
    );
  });
});

describe("Create List", () => {
  test("Duplicate title", async () => {
    const response = await request(app)
      .post("/index/0c44cf39-3d6c-4472-815b-9e163613cfe9")
      .set("Authorization", `Bearer ${access_token}`)

    console.log("body");
    console.log(response.body);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Title")
    );
  });

  test("gagal menjalankan fitur karena belum login", async () => {

    const response = await request(app)
    .post("/index/0c44cf39-3d6c-4472-815b-9e163613cfe9")

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Please log in first")
    );
  });

  test("gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {

    const response = await request(app)
      .post("/index/0c44cf39-3d6c-4472-815b-9e163613cfe9")
      .set("Authorization", `Bearer 1234`)

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid Token")
    );
  });

  test("gagal karena request params adalah id manga yang invalid", async () => {

    const response = await request(app)
      .post("/index/0c44cf39-3d6c-4472-815b-9e163613cfe9123")
      .set("Authorization", `Bearer ${access_token}`)

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("database")
    );
  });
});

describe("PUT profile", () => {
  test("Berhasil mengupdate entitas utama berdasarkan id yang diberikan", async () => {
    const data = {
      name: "Hello Edit",
      picture : "a.png",
      bio : "Trinity is the best!"
    };

    const response = await request(app)
      .put("/profile/1")
      .set("Authorization", `Bearer ${access_token}`)
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("has been updated")
    );
  });

  test("gagal menjalankan fitur karena belum login", async () => {
    const data = {
      name: "Hello Edit",
      picture : "a.png",
      bio : "Trinity is the best!"
    };

    const response = await request(app)
    .put("/profile/1")
    .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid Token")
    );
  });

  test("gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    const data = {
      name: "Hello Edit",
      picture : "a.png",
      bio : "Trinity is the best!"
    };

    const response = await request(app)
      .put("/profile/1")
      .set("Authorization", `Bearer 1234`)
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid Token")
    );
  });

  test("gagal karena id entity yang dikirim tidak terdapat di database", async () => {
    const data = {
      name: "Hello Edit",
      picture : "a.png",
      bio : "Trinity is the best!"
    };

    const response = await request(app)
      .put("/profile/99")
      .set("Authorization", `Bearer ${access_token}`)
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Not Found")
    );
  });

  // test("gagal karena terkena validasi nama", async () => {
  //   const data = {
  //     nama: ""
  //   };

  //   const response = await request(app)
  //     .put("/profile/1")
  //     .set("Authorization", `Bearer ${access_token}`)
  //     .send(data);

  //   expect(response.headers["content-type"]).toMatch(/json/);
  //   expect(response.status).toBe(200);

  //   expect(response.body).toHaveProperty(
  //     "message",
  //     expect.stringContaining("Name")
  //   );
  // });

  test("gagal karena mencoba mengedit profile user lain", async () => {
    const data = {
      name: "Hello Edit",
      picture : "a.png",
      bio : "Trinity is the best!"
    };

    const response = await request(app)
      .put("/profile/2")
      .set("Authorization", `Bearer ${access_token}`)
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(403);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Forbidden")
    );
  });
});

describe("update List", () => {
  test("Berhasil mengupdate entitas utama berdasarkan id yang diberikan", async () => {
    const data = {
      description: "description edited",
      rating: 9
    };

    const response = await request(app)
      .put("/mylist/1")
      .set("Authorization", `Bearer ${access_token}`)
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("updated")
    );
  });

  test("gagal menjalankan fitur karena belum login", async () => {
    const data = {
      description: "description edited",
      rating: 9
    };

    const response = await request(app).put("/mylist/1").send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid Token")
    );
  });

  test("gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    const data = {
      description: "description edited",
      rating: 9
    };

    const response = await request(app)
      .put("/mylist/1")
      .set("Authorization", `Bearer 1234`)
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid Token")
    );
  });

  test("gagal karena id entity yang dikirim tidak terdapat di database", async () => {
    const data = {
      description: "description edited",
      rating: 9
    };

    const response = await request(app)
      .put("/mylist/99")
      .set("Authorization", `Bearer ${access_token}`)
      .send(data);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Not Found")
    );
  });
});

describe("Delete List", () => {
  test("Berhasil menghapus entitas utama berdasarkan params id yang diberikan", async () => {
    const response = await request(app)
      .delete("/mylist/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Entry has been deleted")
    );
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    const response = await request(app).delete("/mylist/1");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid Token")
    );
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    const response = await request(app)
      .delete("/mylist/1")
      .set("Authorization", `Bearer 1234`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid Token")
    );
  });

  test("Gagal karena id entity yang dikirim tidak terdapat di database", async () => {
    const response = await request(app)
      .delete("/mylist/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Not Found")
    );
  });
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
