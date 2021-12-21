// import Countdown, { zeroPad } from "react-countdown";
import BaseButton from "@/components/base/BaseButton";
import Header from "@/components/base/Header";
import Input from "@/components/base/Input";
import PasswordInput from "@/components/base/PasswordInput";
import theme from "@/styles/theme";
import { Button, Checkbox } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useFormik } from "formik";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.kr";
import { postRequest, putRequest } from "@/api/axios";
import { useNavigate } from "react-router";
import { StateContext } from "@/context/index";
import { Box } from "@mui/system";

const RegisterContainer = styled.div`
  margin-top: 5rem;
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
  const state = useContext(StateContext);
  const navigate = useNavigate();
  const [validating, setValidating] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
  const [centerValidated, setCenterValidated] = useState(false);
  const [centerName, setCenterName] = useState("홍길동");
  const [centerNum, setCenterNum] = useState("0000000000");
  const [centerDate, setCenterDate] = useState("20000101");
  // const [validateStatus, setValidateStatus] = useState("");
  const [myEmail, setEmail] = useState("");
  const [myCode, setCode] = useState("");
  const [emailValidated, setEmailValidated] = useState("");
  const [memberInfo, setMemberInfo] = useState({
    address: state.selectedTown || "서울특별시 강남구",
    contact: "",
    email: "",
    nickname: "",
    password: "",
  });
  const [centerInfo, setCenterInfo] = useState({
    address: state.selectedTown || "서울특별시 강남구",
    contact: "",
    email: "",
    name: "",
    owner: "",
    password: "",
    registrationCode: "",
  });

  // const ref = useRef();

  const onPhoneChange = (e) => {
    if (isCenter) {
      setCenterInfo({
        ...centerInfo,
        contact: e.target.value.replaceAll(" ", ""),
      });
    } else {
      setMemberInfo({
        ...memberInfo,
        contact: e.target.value.replaceAll(" ", ""),
      });
    }
  };

  // const handleStart = () => {
  //   ref?.current.start();
  // };

  const businessData =
    // JSON.stringify({
    // businesses: [
    {
      b_no: centerNum,
      start_dt: centerDate,
      p_nm: centerName,
      // p_nm2: "",
      // b_nm: "",
      // corp_no: "",
      // b_sector: "",
      // b_type: "",
    };
  //],
  //});

  // const request = {
  //   method: "post",
  //   url: "https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=w2MOw0zoOwMPgsdLpEtEKNVazsFgDfbNOxMb%2FkMMierdPUgPmj1coM%2Bgf0w%2FvA3xP6OFm8bk0GnLLUgXRoU3qQ%3D%3D",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: data,
  // };

  const validation = async () => {
    // await axios(request)
    //   .then(function (response) {
    //     setValidateStatus(
    //       JSON.stringify(response.data.data[0].valid).replaceAll('"', "")
    //     ); // 유효한 정보인지 출력해보기 & 일치 확인 위해 따옴표 제거
    //     console.log(response.data);
    //   })
    //   .catch(function () {
    //     alert("유효한 사업자 정보를 입력해주세요.");
    //   });
    setValidating(true);
    setCenterValidated(true);
    const result = await postRequest("check-businesscode", {
      data: businessData,
    });
    // setValidateStatus(result);

    if (result.data.valid === false) {
      setCenterValidated(false);
    }
  };

  const emailValidation = async () => {
    try {
      const result = await postRequest("email", { data: { email: myEmail } });
      if (result.message === "success") setEmailValidated("ing");
    } catch (error) {
      const result = await putRequest("email", {
        data: { email: myEmail },
      });
      if (result.message === "success") setEmailValidated("ing");
      else console.log("email 전송 실패");
    }
  };

  const codeValidation = async () => {
    const result = await postRequest("verify-code", {
      data: {
        code: myCode,
        email: myEmail,
      },
    });
    console.log(result, result.message === "success");
    if (result.message === "success") setEmailValidated("success");
  };

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
        centername: yup
          .string("기관명을 입력해주세요")
          .min(3, "3자 이상의 기관명을 입력해주세요.")
          .required("기관명을 입력해주세요."),
      });

  const formik = useFormik({
    initialValues: !isCenter
      ? {
          email: "",
          password: "",
          nickname: "",
        }
      : {
          email: "",
          password: "",
          centername: "",
        },

    validationSchema: validationSchema,
    onSubmit: async () => {
      if (!isCenter && emailValidated === "success") {
        const register_result = await postRequest("members/signup", {
          data: memberInfo,
        });
        console.log(register_result);
        if (register_result.message === "success") {
          console.log("회원가입 성공");
          navigate("/login");
        }
      }
      if (isCenter && centerValidated && emailValidated) {
        console.log(centerInfo);
        const register_result2 = await postRequest("centers/signup", {
          data: centerInfo,
        });
        console.log(register_result2);
        if (register_result2.message === "success") {
          navigate("/login");
        }
      }
    },
  });

  const emailRt = async (e) => {
    e.target.innerText = "인증코드 전송중";
    const response = await putRequest("email", {
      data: { email: myEmail },
    });
    if (response.message === "success")
      e.target.innerText = "인증코드 전송완료";
    setTimeout(() => {
      e.target.innerText = "인증코드 재전송";
    }, 8000);
  };

  return (
    <>
      <Header type="plain" fixed={true} />
      <form onSubmit={formik.handleSubmit}>
        <RegisterContainer>
          <AlignContainer>
            <div>
              기관사용자이신가요?
              <Checkbox
                onChange={() => {
                  setIsCenter(!isCenter);
                }}
              ></Checkbox>
            </div>
            <Input
              type="Email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onKeyUp={(e) => {
                setEmail(e.target.value);
                if (isCenter) {
                  setCenterInfo({
                    ...centerInfo,
                    email: e.target.value,
                  });
                } else {
                  setMemberInfo({
                    ...memberInfo,
                    email: e.target.value,
                  });
                }
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Input
                  type="Email 인증 코드"
                  sx={{ width: "13.5rem" }}
                  onKeyUp={(e) => setCode(e.target.value)}
                />
                {emailValidated && (
                  <Button
                    sx={{
                      width: "7rem",
                      height: "1.5rem",
                      whiteSpace: "nowrap",
                    }}
                    onClick={emailRt}
                  >
                    인증코드 재전송
                  </Button>
                )}
              </Box>
              {emailValidated === "success" ? (
                <BaseButton
                  type="button"
                  text="인증 완료"
                  width="6rem"
                  height="2.4rem"
                />
              ) : emailValidated === "ing" ? (
                <BaseButton
                  btnType="gray_dark"
                  type="button"
                  text="인증 확인"
                  width="6rem"
                  height="2.4rem"
                  onClick={() => codeValidation()}
                />
              ) : (
                <BaseButton
                  type="button"
                  text="인증 요청"
                  width="6rem"
                  height="2.4rem"
                  onClick={() => {
                    if (myEmail) {
                      emailValidation();
                      // handleStart();
                    }
                  }}
                />
              )}
            </div>
            {/* <Countdown
              ref={ref}
              date={Date.now() + 300000}
              autoStart={false}
              renderer={({ minutes, seconds }) => (
                <div
                  style={{
                    color: "#d32f2f",
                    fontSize: "0.8rem",
                    textAlign: "right",
                    marginRight: "0.5rem",
                  }}
                >
                  {zeroPad(minutes)} : {zeroPad(seconds)}
                </div>
              )}
            /> */}
            <PasswordInput
              id="password"
              name="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onKeyUp={(e) => {
                if (isCenter) {
                  setCenterInfo({
                    ...centerInfo,
                    password: e.target.value,
                  });
                } else {
                  setMemberInfo({
                    ...memberInfo,
                    password: e.target.value,
                  });
                }
              }}
            />
            {!isCenter ? (
              <Input
                type="닉네임"
                id="nickname"
                onChange={formik.handleChange}
                error={
                  formik.touched.nickname && Boolean(formik.errors.nickname)
                }
                helperText={formik.touched.nickname && formik.errors.nickname}
                onKeyUp={(e) => {
                  setMemberInfo({
                    ...memberInfo,
                    nickname: e.target.value,
                  });
                }}
              />
            ) : undefined}
            <Cleave
              placeholder="010 0000 0000"
              options={{ phone: true, phoneRegionCode: "KR" }}
              onKeyUp={onPhoneChange}
              style={{
                border: `1px solid #bbbbbb`,
                borderRadius: "5px",
                height: "2.5rem",
                fontSize: "16px",
                padding: "0.7rem",
                boxSizing: "border-box",
              }}
            />
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
                  onKeyUp={(e) => {
                    setCenterInfo({
                      ...centerInfo,
                      name: e.target.value,
                    });
                  }}
                />
                <Input
                  type="사업자 등록 번호"
                  onKeyUp={(e) => {
                    setCenterNum(e.target.value);
                    setCenterInfo({
                      ...centerInfo,
                      registrationCode: e.target.value,
                    });
                  }}
                />
                <Input
                  type="대표자 성명"
                  onKeyUp={(e) => {
                    setCenterName(e.target.value);
                    setCenterInfo({
                      ...centerInfo,
                      owner: e.target.value,
                    });
                  }}
                />
                <Input
                  type="개업 일자 / YYYYMMDD"
                  onKeyUp={(e) => setCenterDate(e.target.value)}
                />
                <div
                  style={{
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  {validating && centerValidated === false ? (
                    <div style={{ marginBottom: "1rem", color: "red" }}>
                      유효하지 않은 사업자 정보입니다.
                    </div>
                  ) : undefined}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <BaseButton
                      type="button"
                      btnType={centerValidated ? undefined : "gray_dark"}
                      text="기관 회원 인증"
                      onClick={(e) => {
                        e.preventDefault();
                        validation();
                      }}
                    />
                  </div>
                </div>
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
              <div>
                <BaseButton text="회원가입" width="20rem" type="submit" />
              </div>
            </div>
          </AlignContainer>
        </RegisterContainer>
      </form>
    </>
  );
};

export default RegisterPage;
