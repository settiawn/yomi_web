import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const [session, setSession] = useState();

  useEffect(() => {
    isUser();
  }, []);

  async function isUser() {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/verify/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          token: localStorage.getItem("access_token"),
        },
      });
      setSession({ userId: data.userId, profileId: data.profileId });
    } catch (error) {
      console.log(error);
    }
  }
  function toMyProfile() {
    navigate("/profile/" + session.profileId);
  }

  function toHome() {
    navigate("/");
  }

  function logout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  console.log(session, "Session<<<<");

  return (
    <>
      <div className="bg-dark">
        <div className="mx-auto text-white flex justify-between pt-5 px-80 pb-4 bg-zinc-900">
          <div
            className="font-bold text-xl hover:cursor-pointer"
            onClick={toHome}
          >
            yomi
          </div>
          {session !== undefined && (
            <div className="flex flex-row gap-4 text-1xl">
              <p to="" className="hover:cursor-pointer" onClick={toMyProfile}>
                My Profile
              </p>
              <p className="hover:cursor-pointer" onClick={logout}>
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
