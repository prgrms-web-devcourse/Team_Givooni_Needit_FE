// import Input from "@/components/Input";
import * as React from "react";
import { Box, Typography } from "@mui/material";
import BaseButton from "@/components/BaseButton";
import { Link } from "react-router-dom";
import theme from "@/styles/theme";
import styled from "styled-components";
import Input from "@/components/Input";

const Login = () => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(true);

  const primary = theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: 200,
          width: 200,
          backgroundColor: "red",
          marginBottom: 20,
        }}
      ></div>
      {open ? (
        <LoginContainer>
          <BaseButton width={300} text="로그인" func={handleOpen} />
          <Link to="/register" style={{ textDecoration: "none" }}>
            <BaseButton width={300} type={1} text="회원가입" />
          </Link>
          <Link to="/member" style={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ color: primary }}>
              로그인 없이 둘러보기
            </Typography>
          </Link>
        </LoginContainer>
      ) : (
        <LoginContainer>
          <Input placeholder="Email" />
          <Input placeholder="비밀번호" />
          <BaseButton width={300} text="로그인" func={handleClose} />
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Typography variant="h5" sx={{ color: primary }}>
              회원가입
            </Typography>
          </Link>
          <Link to="/member" style={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ color: primary }}>
              로그인 없이 둘러보기
            </Typography>
          </Link>
        </LoginContainer>
      )}
    </Box>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  /* height: 400px; */
  gap: 15px;
`;
