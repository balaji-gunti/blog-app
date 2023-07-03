import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { config } from "../App";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { LuEdit2 } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = async () => {
    navigate(`/blogs/update/${id}`);
  };
  console.log(isUser);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${config.endpoint}/v1/blogs/delete/${id}`
      );
      window.location.reload();
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedVote, setSelectedVote] = useState("");
  const handleOnVote = async () => {
    let url = `${config.endpoint}/v1/user/${id}`;
    await axios.patch(url);
  };

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            {/* <FaHeart /> */}
            <LuEdit2 />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <AiOutlineDelete />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="img" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>
        <Box>
          <IconButton>
            <BiSolidLike onClick={handleOnVote} />
          </IconButton>
          <IconButton>
            <BiDislike onClick={handleOnVote} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
