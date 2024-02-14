import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CardProfile(params) {
  const { id, mangaId, coverId, rating, comments } = params;
  const [title, setTitle] = useState("");
  const [coverLink, setCoverLink] = useState("");

  useEffect(() => {
    fetchManga();
  });

  async function fetchManga() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.mangadex.org/manga/" + mangaId,
      });

      let img = `https://uploads.mangadex.org/covers/${mangaId}/${coverId}`;

      setCoverLink(img);
      setTitle(data.data.attributes.title.en);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-sky-800 mt-8 font-bold flex">
      <div className="flex-none w-60 relative">
        <img src={coverLink} alt="image not found 404" />
        <div className="flex justify-between absolute bottom-0 w-full">
          <Link
            target="_blank"
            className="w-1/2 bg-sky-500 font-bold p-3 text-white hover:cursor-pointer"
          >
            Edit 
          </Link>
          <div className="w-1/2 bg-red-500 font-bold p-3 text-white hover:cursor-pointer">
            Delete
          </div>
        </div>
      </div>
      <div className="flex-1 m-5">
        <div className="text-3xl">{title}</div>
        <div className="text-xl mt-3">User's Rating : {rating}</div>
        <div className="text-xl mt-2">User's comment :</div>
        <div className="font-normal">{comments}</div>
      </div>
    </div>
  );
}
