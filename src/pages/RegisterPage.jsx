import BaseButton from "@/components/BaseButton";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";
import PhoneInput from "@/components/PhoneInput";
import theme from "@/styles/theme";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useFormik } from "formik";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  box-sizing: border-box;
  color: ${theme.palette.primary.main};
  gap: 0.5rem;
`;

const AlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RegisterPage = () => {
  const [isCenter, setIsCenter] = useState(false);

  const validationSchema = !isCenter
    ? yup.object({
        email: yup
          .string("이메일을 입력해주세요.")
          .email("유효한 이메일을 입력해주세요.")
          .required("이메일을 입력해주세요."),
        password: yup
          .string("비밀번호를 입력해주세요.")
          .min(8, "9자 이상의 비밀번호를 입력해주세요.")
          .required("비밀번호를 입력해주세요."),
        nickname: yup
          .string("닉네임을 입력해주세요")
          .min(3, "3자 이상의 닉네임을 입력해주세요.")
          .required("닉네임을 입력해주세요."),
      })
    : yup.object({
        email: yup
          .string("이메일을 입력해주세요.")
          .email("유효한 이메일을 입력해주세요.")
          .required("이메일을 입력해주세요."),
        password: yup
          .string("비밀번호를 입력해주세요.")
          .min(8, "9자 이상의 비밀번호를 입력해주세요.")
          .required("비밀번호를 입력해주세요."),
        nickname: yup
          .string("닉네임을 입력해주세요")
          .min(3, "3자 이상의 닉네임을 입력해주세요.")
          .required("닉네임을 입력해주세요."),
        centername: yup
          .string("기관명을 입력해주세요")
          .min(3, "3자 이상의 기관명을 입력해주세요.")
          .required("기관명을 입력해주세요."),
      });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      nickname: "",
      centername: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Header type="plain" />
      <form onSubmit={formik.handleSubmit}>
        <RegisterContainer>
          <AlignContainer>
            <div>
              기관사용자이신가요?
              <Checkbox onChange={() => setIsCenter(!isCenter)}></Checkbox>
            </div>
            <Input
              type="Email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Input type="Email 인증 코드" sx={{ width: "13.5rem" }} />
              <BaseButton
                text="인증 요청"
                width="6rem"
                height="2.4rem"
                onClick={() => console.log(`gg`)}
              />
            </div>
            {!isCenter ? (
              <Input
                type="닉네임"
                id="nickname"
                onChange={formik.handleChange}
                error={
                  formik.touched.nickname && Boolean(formik.errors.nickname)
                }
                helperText={formik.touched.nickname && formik.errors.nickname}
              />
            ) : undefined}
            <PasswordInput
              id="password"
              name="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <PhoneInput />
            {isCenter ? (
              <>
                <Input
                  type="기관명"
                  id="centername"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.centername &&
                    Boolean(formik.errors.centername)
                  }
                  helperText={
                    formik.touched.centername && formik.errors.centername
                  }
                />
                <Input type="사업자 등록 번호" />
                <Input type="대표자 성명" />
                <Input type="개업 일자 / YYYYMMDD" />
              </>
            ) : undefined}
            <div
              style={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "3rem",
              }}
            >
              <BaseButton text="회원가입" width="20rem" type="submit" />
            </div>
          </AlignContainer>
        </RegisterContainer>
      </form>
    </>
  );
};

export default RegisterPage;
