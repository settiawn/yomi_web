import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserInfo, fetchUserProfile } from "../store/userSlice";
import { deleteList } from "../store/mangaSlice";
import axios from "axios";

export function CardProfile(params) {
  const { id, profileId, mangaId, coverId, rating, comments } = params;
  const navigate = useNavigate();
  const [coverLink, setCoverLink] = useState();
  const [title, setTitle] = useState();
  const [mangaMeta, setMangaMeta] = useState();

  const dispatch = useDispatch();
  const { userData, userList, meta } = useSelector((x) => x.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
    fetchById();
  }, []);

  function editHandler() {
    navigate("/list/edit/" + id);
  }

  async function fetchById() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.mangadex.org/manga/" + mangaId,
      });

      let img = `https://uploads.mangadex.org/covers/${mangaId}/${coverId}`;

      setMangaMeta(data);
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
        {meta.profileId === +profileId && (
          <div className="flex justify-between absolute bottom-0 w-full">
            <div
              onClick={editHandler}
              className="w-1/2 bg-sky-500 font-bold p-3 text-white hover:cursor-pointer"
            >
              Edit
            </div>
            <div
              onClick={() => {
                dispatch(deleteList(id, profileId))
              }}
              className="w-1/2 bg-red-500 font-bold p-3 text-white hover:cursor-pointer"
            >
              Delete
            </div>
          </div>
        )}
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
