import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../store/userSlice";

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { meta } = useSelector((x) => x.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  function toMyProfile() {
    navigate("/profile/" + meta.profileId);
  }

  function toHome() {
    navigate("/");
  }

  function logout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

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
          {meta.length !== 0 && (
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
