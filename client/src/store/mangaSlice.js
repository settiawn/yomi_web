import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUserProfile } from "./userSlice";
import Swal from "sweetalert2";

const mangaSlice = createSlice({
  name: "manga",
  initialState: {
    data: [],
    mangaMeta: {},
    loading: false,
    error: "",
  },
  reducers: {
    fetchDataManga(state, { payload }) {
      state.data = payload;
    },
  },
});

export const mangaReducer = mangaSlice.reducer;
export const { fetchDataManga } = mangaSlice.actions;

//thunk middleware
export function deleteList(id, profileId) {
  return async function deleteHandler(dispatch) {
    try {
      const response = await axios({
        method: "delete",
        url: import.meta.env.VITE_BASE_URL + "mylist/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      Swal.fire("Success!", response.data.message, "success");
      dispatch(fetchUserProfile(profileId));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addToList(id) {
  return async function add(dispatch) {
    try {
      const { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "index/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Oops...",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };
}

//REQ KE mangadex
export function fetchAll(title) {
  return async function fetchFromMangadex(dispatch) {
    try {
      console.log("Hello Home");
      dispatch(fetchDataManga([]));
      let params = {};
      if (title) params.title = title;

      const { data } = await axios({
        method: "get",
        url: "https://api.mangadex.org/manga",
        params,
      });

      dispatch(fetchDataManga(data.data));
    } catch (error) {
      console.log(error);
    }
  };
}
