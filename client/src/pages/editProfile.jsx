import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/profile/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(data);
      setInput({ name: data.name, bio: data.bio, picture: data.picture });
    } catch (error) {
      console.log(error);
    }
  }

  async function sendData() {
    try {
      await axios({
        method: "put",
        url: "http://localhost:3000/profile/" + id,
        data: input,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      navigate("/profile/" + id)
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
      <div className="container mx-auto text-white pt-10 text-center">
        <div className="font-bold text-4xl m-7">Edit Profile</div>
        <div className="flex flex-col text-white font-bold text-1xl mt-3">
          <label htmlFor="" className="mb-1">
            Profile Name
          </label>
          <input
            type="text"
            name="name"
            onChange={inputHandler}
            value={input ? input.name : ""}
            className="ml-auto mr-auto p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black font-normal"
          />
          <label htmlFor="" className="mt-5">
            Profile Image URL
          </label>
          <label htmlFor="" className="font-normal text-sm mb-1">
            (currently we haven't support upload image yet)
          </label>
          <input
            type="text"
            name="picture"
            onChange={inputHandler}
            value={input ? input.picture : ""}
            className="mx-auto p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black font-normal"
          />
          <label htmlFor="" className="mt-5 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            id=""
            cols="30"
            rows="10"
            onChange={inputHandler}
            value={input ? input.bio : ""}
            className="ml-auto mr-auto p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black font-normal"
          ></textarea>
          <button className="ml-auto mr-auto bg-blue-500 text-white font-bold px-4 py-2 rounded-lg m-5"
          onClick={sendData}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
