import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserInfo } from "../store/userSlice";

export function EditList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  const dispatch = useDispatch();
  const session = useSelector((x) => x.user.meta);

  useEffect(() => {
    fetchData();
    dispatch(fetchUserInfo());
  }, []);

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  async function sendData() {
    try {
      await axios({
        method: "put",
        url: import.meta.env.VITE_BASE_URL + "mylist/" + id,
        data: input,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      navigate("/profile/" + session.profileId);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "mylist/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setInput({ comments: data.comments, rating: data.rating });
    } catch (error) {
      console.log(error);
    }
  }

  const [rating, setRating] = useState([
    { rating: 1, label: "Appalling" },
    { rating: 2, label: "Horrible" },
    { rating: 3, label: "Very Bad" },
    { rating: 4, label: "Bad" },
    { rating: 5, label: "Average" },
    { rating: 6, label: "Fine" },
    { rating: 7, label: "Good" },
    { rating: 8, label: "Very Good" },
    { rating: 9, label: "Great" },
    { rating: 10, label: "Masterpiece" },
  ]);

  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto text-white pt-10 text-center">
        <div className="font-bold text-4xl m-7">Edit Entry</div>
        <div className="flex flex-col text-white font-bold text-1xl mt-3 text-center">
          <label htmlFor="" className="mb-1">
            Rating
          </label>
          <select
            name="rating"
            onChange={inputHandler}
            className="mx-auto text-center appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 px-2 pr-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {rating.map((item) => (
              <option key={item.rating} value={item.rating} selected={item.rating === input.rating}>
                {item.rating} - {item.label}
              </option>
            ))}
          </select>
          <label htmlFor="" className="mt-5 mb-1">
            Bio
          </label>
          <textarea
            name="comments"
            id=""
            cols="30"
            rows="10"
            onChange={inputHandler}
            value={input ? input.comments : ""}
            className="ml-auto mr-auto p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black font-normal"
          ></textarea>
          <button
            className="ml-auto mr-auto bg-blue-500 text-white font-bold px-4 py-2 rounded-lg m-5"
            onClick={sendData}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
