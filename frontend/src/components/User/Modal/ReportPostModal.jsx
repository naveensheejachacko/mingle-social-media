import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
// import { REPORT_POST, REPORT_POST_HOME } from "../../../utils/ConstUrls";
import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import {
//   setExplorePostAfterReport,
//   setHomePosts,
//   setPosts,
// } from "../../../redux/userSlice";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../../utils/Constants";

import Cookies from "js-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: 1,
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

function ReportPostModal({ postId,userId }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState("Spam");
//   const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleReport = async () => {
    setLoading(true);
    const body = JSON.stringify({
      reason: selectedValue,
      userId: userId,
      postId: postId,
    });
    const token = Cookies.get("jwt_user");
    // if (location.pathname === "/home") {
      axios
        .post(
          `${baseUrl}posts/reportPost/${postId}/${userId}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          if (response.status==200) {
            setOpen(false);
            toast.success(response.data.message);
          } else {
            setOpen(false);
            toast.error("error occured ");
          }
        })
        .catch((err) => {
          setLoading(false);
          setOpen(false);
          toast.error("Oops Something went wrong");
        });
    // } 
    
    // else {
    //   axios
    //     .post(
    //       `http://127.0.0.1:8000/posts/reportPost/${postId}/${userId}`,
    //       body,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       setLoading(false);
    //       if (response.data.success) {
    //         setOpen(false);
    //         toast.success(response.data.message);
    //       } else {
    //         setOpen(false);
    //         toast.error(response.data.message);
    //       }
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       setOpen(false);
    //       toast.error("Oops Something went wrong");
    //     });
    // }
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Report</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            color={"red"}
            variant="h6"
            component="h2"
          >
            Report Post
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Spam"
              name="radio-buttons-group"
              value={selectedValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
              <FormControlLabel
                value="Its Inappropriate"
                control={<Radio />}
                label="Its Inappropriate"
              />
              <button
                size="small"
                onClick={handleReport}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                <span>Report</span>
              </button>
            </RadioGroup>
          </FormControl>
          {/* </Typography> */}
        </Box>
      </Modal>
    </>
  );
}

export default ReportPostModal;
