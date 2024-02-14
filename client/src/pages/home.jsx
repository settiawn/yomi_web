import axios from "axios";
import { serverAPI } from "../api";

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
  return (
    <div className="h-screen  bg-dark">
      <div className="container text-center mx-auto">
        <h1 className="pt-5 font-bold text-4xl text-white">Home</h1>
        <button
          className="text-white border-spacing-4 bg-blue-500 font-bold px-4 py-2 rounded-lg m-5 hover:cursor-pointer"
          onClick={upgrade}
        >
          Upgrade
        </button>
      </div>
    </div>
  );
}
