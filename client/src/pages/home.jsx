import axios from "axios";
import { serverAPI } from "../api";
import { Card } from "../components/card";
import { useEffect, useState } from "react";

export function Home() {
  const upgrade = async () => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:3000/payment/midtrans/initiate",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        await serverAPI.patch(
          "/profile/upgrade",
          {
            orderId: data.orderId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  };

  const [manga, setManga] = useState([]);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    fetchManga();
  }, []);

  const [input, setInput] = useState({
    title: "",
  });

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  async function fetchManga(title) {
    try {
      setManga([]);
      let params = {};
      if (title) params.title = title;

      const { data } = await axios({
        method: "get",
        url: "https://api.mangadex.org/manga",
        params,
      });
      setMeta({
        limit: data.limit,
        offset: data.offset,
      });
      setManga(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen  bg-dark">
      <div className="container text-center mx-auto">
        <h1 className="pt-5 font-bold text-4xl text-white">Home</h1>
        <button
          className="text-white border-spacing-4 bg-blue-500 font-bold px-4 py-2 rounded-lg m-5 hover:cursor-pointer"
          onClick={upgrade}
        >
          Upgrade
        </button>
      </div>
      <div className="container text-center mx-auto">
        <form action="">
          <input
            type="text"
            name="title"
            placeholder="title.."
            onChange={inputHandler}
            className="ml-auto mr-auto p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            className="ml-2 bg-blue-500 text-white font-bold px-3 py-2 rounded-lg"
            onClick={(event) => {
              event.preventDefault();
              fetchManga(input.title);
            }}
          >
            Search
          </button>
        </form>
        <div className="grid gap-4 grid-cols-5 grid-rows-4">
          {manga.map((x) => {
            let img = x.relationships.find((z) => z.type === "cover_art")
            return (
              <Card
                id={x.id}
                name={x.attributes.title.en}
                cover={img}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
