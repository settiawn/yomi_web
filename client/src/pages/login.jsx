import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();

  const handleCredentialResponse = async (response) => {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/google-login",
        headers: {
          google_token: response.credential,
        },
      });
      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "240498324458-9h0p6nfv22ih6idqallgf4ih2sl38ofe.apps.googleusercontent.com", //TODO ini masukin env
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "outline", size: "large" } // customization attributes
    );
  });

  return (
    <div className="min-h-screen bg-dark">
      <div className="flex flex-col text-center">
        <h1 className="text-white font-bold text-4xl m-5">yomi</h1>
        <label htmlFor="" className="text-white font-bold text-1xl mt-3">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="ml-auto mr-auto p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <label htmlFor="" className="text-white font-bold text-1xl mt-3">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="ml-auto mr-auto p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button className="ml-auto mr-auto bg-blue-500 text-white font-bold px-4 py-2 rounded-lg m-5">
          Login
        </button>
        <p className="text-white m-3 pt-9">Don't have an account yet?</p>
        <div id="google-button" className="ml-auto mr-auto"></div>
        <p className="text-white m-3">or</p>
        <Link to="/register" className="font-bold text-blue-500">
          Register
        </Link>
      </div>
    </div>
  );
}

{
  /* <div className="text-center container mx-auto m-5">
          <div className="flex flex-col">
            <h1 className="font-bold text-black text-6xl">Hello world!</h1>
            <form action="">
              <div class=" text-gray-700 font-bold mb-2 flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="order border-gray-400 rounded-lg py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
              <div class="bg-gray-200 p-6 m-2">
                <label htmlFor="">Password</label>
              </div>
            </form>
          </div>
        </div> */
}
