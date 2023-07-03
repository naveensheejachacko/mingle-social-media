
// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';


// export const fetchPosts = () => async (dispatch) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/posts/getPosts`);
//       dispatch(setPosts(response.data.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };




// const postSlice = createSlice({
//     name: 'post',
//     initialState: {
//       posts: [],
//     },
//     reducers: {
//       setPosts: (state, action) => {
//         // console.log(state,"daa")
//         // console.log(action.payload,"action daa")
//         state.posts = action.payload;
//       },
//       resetPosts: (state) => {
//         state.posts = [];
//       }
//     },
//   });
//   export const { setPosts,resetPosts  } = postSlice.actions;

// export default postSlice.reducer;



