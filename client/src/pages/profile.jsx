import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardProfile } from "../components/cardProfile";

export function Profile() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState({});
  const [list, setList] = useState([]);

  const [session, setSession] = useState({})

  useEffect(() => {
    fetchData();
    isUser()
  }, []);

  //TODO => profile headers (pic, name) bikin responsive
  //TODO => bikin fungsi ini di reducer buat ke tombol edit entry + delete
  //TODO => fix screen di home.jsx
  async function isUser(){
    try {
      const {data} = await axios({
        method: "get",
        url: "http://localhost:3000/verify/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          token: localStorage.getItem("access_token")
        },
      })
      setSession({userId: data.userId, profileId: data.profileId})
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/profile/" + id,
      });
      setData(data);
      setList(data.Lists);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditProfile(){
    navigate("/profile/edit/" +  id)
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto text-white pt-10">
        <div class="flex">
          <div class="flex-none relative">
            <div class="w-60 h-60 bg-gray-200 flex items-center justify-center text-black">
              <img src={data.picture} alt="No Picture" />
            </div>
            { session.profileId === +id && (
            <div className="flex absolute bottom-0">
              <div onClick={handleEditProfile} className="bg-green-500 font-bold p-3 text-white hover:cursor-pointer">
                Edit Profile
              </div>
            </div>
            )}
          </div>
          <div class="flex-1 pl-5">
            <div className="font-bold text-8xl">{data.name}</div>
            <div className="pl-3">
              <p className="font-bold mt-10 text-2xl">About Me</p>
              <p className="pt-2">{data.bio}</p>
            </div>
          </div>
        </div>
        <div className="text-white mt-8 font-bold text-5xl">Manga List</div>
        {list.map((x) => {
          return (
            <CardProfile
              id={x.id}
              mangaId={x.mangaId}
              coverId={x.coverId}
              rating={x.rating}
              comments={x.comments}
            />
          );
        })}
      </div>

      <div className="grid gap-4 grid-cols-5 grid-rows-4 mx-32"></div>
    </div>
  );
}
