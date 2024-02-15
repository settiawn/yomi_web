import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  async function register(event) {
    try {
      event.preventDefault();
      await axios({
        method: "post",
        url: "http://localhost:3000/register",
        data: input,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }
  return (
    <div className="min-h-screen bg-dark">
      <div className="flex flex-col text-center">
        <h1 className="text-white font-bold text-4xl m-5">Register</h1>
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
          onClick={register}
        >
          Login
        </button>
        <p className="text-white m-3 pt-9">Already have an account ?</p>
        <Link to="/login" className="font-bold text-sky-500">
          Login
        </Link>
      </div>
    </div>
  );
}
