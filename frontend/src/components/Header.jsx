import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem("userId");
  //state
  const [value, setValue] = useState();
  // 64a2a30ff2263562b193ecb0
  //logout
  const handleLogout = async () => {
    try {
      await dispatch(authActions.logout());
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h4">Blog App</Typography>
          {isLogin && (
            <Stack
              marginLeft={25}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Link
                to="/blogs"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  BLOGS
                </Typography>
              </Link>
              <Link
                to={`/blogs/user/${id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  MY BLOGS
                </Typography>
              </Link>
              <Link
                to="/blogs/create"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                <Typography variant="subtitle2" gutterBottom>
                  CREATE BLOG
                </Typography>{" "}
              </Link>
            </Stack>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
