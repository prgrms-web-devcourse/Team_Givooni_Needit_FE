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

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const RegisterPage = () => {
  const [isCenter, setIsCenter] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
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
            <Input type="Email 인증" />
            {!isCenter ? <Input type="닉네임" /> : undefined}
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <PhoneInput />
            {isCenter ? (
              <>
                <Input type="기관명" />
                <Input type="사업자 등록 번호" />
                <Input type="대표자 성명" />
                <Input type="개업 일자 / YYYYMMDD" />
              </>
            ) : undefined}
            <BaseButton
              text="회원가입"
              style={{ textAlign: "center" }}
              type="submit"
            />
          </AlignContainer>
        </RegisterContainer>
      </form>
    </>
  );
};

export default RegisterPage;
