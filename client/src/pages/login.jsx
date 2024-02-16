import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

export function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  async function login(event) {
    try {
      event.preventDefault();
      const response = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "login",
        data: input,
      });
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  //for google login
  const handleCredentialResponse = async (response) => {
    try {
      const { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "google-login",
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
      client_id: import.meta.env.VITE_GOOGLE_ID,
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
          onChange={inputHandler}
          className="ml-auto mr-auto p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <label htmlFor="" className="text-white font-bold text-1xl mt-3">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={inputHandler}
          className="ml-auto mr-auto p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button 
        className="ml-auto mr-auto bg-blue-500 text-white font-bold px-4 py-2 rounded-lg m-5"
        onClick={login}
        >
          Login
        </button>
        <p className="text-white m-3 pt-9">Don't have an account yet?</p>
        <div id="google-button" className="ml-auto mr-auto"></div>
        <p className="text-white m-3">or</p>
        <Link to="/register" className="font-bold text-sky-500">
          Register
        </Link>
      </div>
    </div>
  );
}
