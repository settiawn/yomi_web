import axios from "axios";
import { useEffect, useState } from "react";

export function Card(params) {
  const { id, name, cover } = params;
  const [image, setImage] = useState("https://corona.s-ul.eu/P2xNVZkN.jpg");

  useEffect(() => {
    getImageLink();
  }, []);

  async function getImageLink() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.mangadex.org/cover/" + cover,
      });

      let a = `https://uploads.mangadex.org/covers/${id}/${data.data.attributes.fileName}`;
      setImage(a);
    } catch (error) {
      console.log(error);
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
        <div className="w-1/2 bg-green-500 font-bold p-3 text-white hover:cursor-pointer">
          Read
        </div>
        <div className="w-1/2 bg-yellow-500 font-bold p-3 text-white hover:cursor-pointer">
          Add
        </div>
      </div>
    </div>
  );
}
