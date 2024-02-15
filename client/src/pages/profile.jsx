import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardProfile } from "../components/cardProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeta, fetchUserInfo, fetchUserProfile } from "../store/userSlice";

export function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData, userList, meta } = useSelector((x) => x.user);

  useEffect(() => {
    dispatch(fetchUserProfile(id));
    dispatch(fetchUserInfo());
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfile(id));
    dispatch(fetchUserInfo());
  }, [id]);

  function handleEditProfile() {
    navigate("/profile/edit/" + id);
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto text-white pt-10">
        <div class="flex">
          <div class="flex-none relative">
            <div class="w-60 h-60 bg-gray-200 flex items-center justify-center text-black">
              <img src={userData.picture} alt="No Picture" />
            </div>
            {meta.profileId === +id && (
              <div className="flex absolute bottom-0">
                <div
                  onClick={handleEditProfile}
                  className="bg-green-500 font-bold p-3 text-white hover:cursor-pointer"
                >
                  Edit Profile
                </div>
              </div>
            )}
          </div>
          <div class="flex-1 pl-5">
            <div className="font-bold text-8xl">{userData.name}</div>
            <div className="pl-3">
              <p className="font-bold mt-10 text-2xl">About Me</p>
              <p className="pt-2">{userData.bio}</p>
            </div>
          </div>
        </div>
        <div className="text-white mt-8 font-bold text-5xl">Manga List</div>
        {userList.map((x) => {
          return (
            <CardProfile
              id={x.id}
              profileId={id}
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
