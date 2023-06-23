import axios from "axios";
import { baseUrl } from "../../../utils/Constants";

export const fetchFollowingPost = async (user_id,setPosts) => {
    try {
      const response = await axios.get(`${baseUrl}posts/fposts/${user_id}/`);
      setPosts(response.data.data)
    } catch (error) {
      console.log('Error', error);
      return [];
    }
  };