import axios from "axios";
import { serverAPI } from "../api";
import { Card } from "../components/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../store/mangaSlice";

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

  const dispatch = useDispatch();
  const { userData, userList, meta } = useSelector((x) => x.user);
  const { data } = useSelector((x) => x.manga);

  console.log();

  //TODO if else kalo udah supporter ganti tulisan

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  const [input, setInput] = useState({
    title: "",
  });

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  return (
    <div className="min-h-screen  bg-dark">
      <div className="container text-center mx-auto">
        <h1 className="pt-5 font-bold text-4xl text-white">
          Add your favorite manga
        </h1>
        {userData.status === "normal" ? (
          <div
            className="text-white border-spacing-4  font-bold px-4 py-2 bg-amber-600 m-5 hover:cursor-pointer"
            onClick={upgrade}
          >
            Click here to support this project to get full benefit of this
            application
          </div>
        ) : (
          <div className="text-white border-spacing-4  font-bold px-4 py-2 bg-amber-600 m-5">
            Thank you for supporting this project!
          </div>
        )}
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
              dispatch(fetchAll(input.title));
            }}
          >
            Search
          </button>
        </form>
        <div className="grid gap-4 grid-cols-5 grid-rows-2 p-8">
          {data.map((x) => {
            let img = x.relationships.find((z) => z.type === "cover_art");
            return <Card id={x.id} name={x.attributes.title.en} cover={img} />;
          })}
        </div>
      </div>
    </div>
  );
}
