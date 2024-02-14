import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export function Card(params) {
  const { id, name, cover } = params;
  const [image, setImage] = useState("https://corona.s-ul.eu/P2xNVZkN.jpg");
  const [link, setLink] = useState("");

  useEffect(() => {
    getImageLink();
  }, []);

  async function getImageLink() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.mangadex.org/cover/" + cover,
      });

      let img = `https://uploads.mangadex.org/covers/${id}/${data.data.attributes.fileName}`;
      let link = `https://mangadex.org/title/${id}`;
      setImage(img);
      setLink(link);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToList() {
    try {
      const {data} = await axios({
        method: "post",
        url: "http://localhost:3000/index/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success"
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Oops...",
        text: error.response.data.message,
        icon: "error"
      });
    }
  }
  //   max-w-sm
  return (
    <div class="rounded overflow-hidden shadow-lg mt-8 bg-white relative px-0 p-0">
      <div class="font-bold text-xl absolute top-0 w-full bg-sky-500 p-3">
        {name}
      </div>
      <div className="flex items-center">
        <div className="">
          <img src={image} alt="cover_art" className="" />
        </div>
      </div>
      <div className="flex justify-between absolute bottom-0 w-full">
        <Link
          to={link}
          target="_blank"
          className="w-1/2 bg-green-500 font-bold p-3 text-white hover:cursor-pointer"
        >
          Read
        </Link>
        <div
          className="w-1/2 bg-yellow-500 font-bold p-3 text-white hover:cursor-pointer"
          onClick={addToList}
        >
          Add
        </div>
      </div>
    </div>
  );
}
