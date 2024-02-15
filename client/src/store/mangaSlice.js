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
      await axios({
        method: "delete",
        url: "http://localhost:3000/mylist/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
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
        url: "http://localhost:3000/index/" + id,
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

export function fetchAll(title) {
  return async function fetchFromMangadex(dispatch) {
    try {
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
