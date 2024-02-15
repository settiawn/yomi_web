import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { addToList } from "../store/mangaSlice";

export function Card(params) {
  const { id, name, cover } = params;
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    getImageLink();
  }, []);

  async function getImageLink() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.mangadex.org/cover/" + cover.id,
      });

      let img = `https://uploads.mangadex.org/covers/${id}/${data.data.attributes.fileName}`;
      let link = `https://mangadex.org/title/${id}`;
      setImage(img);
      setLink(link);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="rounded overflow-hidden shadow-lg mt-8 bg-white relative px-0 p-0">
      <div class="font-bold text-xl absolute top-0 w-full bg-sky-500 p-3 bg-opacity-75 text-black text-opacity-75">
        {name}
      </div>
      <div className="flex items-center">
        <div className="">
          <img src={image} alt="cover_art" className="" />
        </div>
      </div>
      <div className="flex justify-between absolute bottom-0 w-full text-white">
        <Link
          to={link}
          target="_blank"
          className="w-1/2 bg-green-500 font-bold p-3 hover:cursor-pointer"
        >
          Read
        </Link>
        <div
          className="w-1/2 bg-yellow-500 font-bold p-3 hover:cursor-pointer"
          onClick={() => {
            dispatch(addToList(id));
          }}
        >
          Add
        </div>
      </div>
    </div>
  );
}
