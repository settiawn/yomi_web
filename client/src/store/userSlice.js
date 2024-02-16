import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    meta: [],
    userData: {},
    userList: [],
    //TODO => fetchLoading, fetchError
  },
  reducers: {
    fetchMeta(state, { payload }) {
      state.meta = payload;
    },
    fetchUserData(state, { payload }) {
      state.userData = payload;
    },
    fetchUserList(state, { payload }) {
      state.userList = payload;
    },
  },
});

//reducer (fungsi) harus di export
export const userReducer = userSlice.reducer;
export const { fetchMeta, fetchUserData, fetchUserList } = userSlice.actions;

//thunk middleware
export function fetchUserInfo() {
  return async function getUser(dispatch) {
    try {
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "verify/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          token: localStorage.getItem("access_token"),
        },
      });
      dispatch(fetchMeta({ userId: data.userId, profileId: data.profileId }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchUserProfile(id){
  return async function fetchData(dispatch) {
    try {
      dispatch(fetchUserData([]))
      dispatch(fetchUserList([]))
      
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "profile/" + id,
      });
      dispatch(fetchUserData(data))
      dispatch(fetchUserList(data.Lists))
    } catch (error) {
      console.log(error);
    }
  }
}


