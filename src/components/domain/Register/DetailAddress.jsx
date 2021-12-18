import { Box, Typography, Modal, Checkbox } from "@mui/material";
import BaseButton from "@/components/base/BaseButton";
import Header from "@/components/base/Header";
import Input from "@/components/base/Input";
import DaumPostCode from "react-daum-postcode";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { DispatchContext } from "@/context";
import theme from "@/styles/theme";

const districtor = (address) => {
  // 행정구역 시도 구분
  if (
    ["서울", "부산", "대구", "인천", "광주", "대전", "울산"].includes(address)
  ) {
    address = address + "시";
  } else if (address === "세종특별자치시") {
    address = "세종시";
  } else if (address === "제주특별자치도") {
    address = "제주도";
  } else address = address + "도";
  return address;
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "1vw",
};

const centerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "7px",
};

const DetailAddress = ({ usertype = "center", userAddress }) => {
  userAddress
    ? (userAddress = ["시", "도로명", "상세주소"])
    : (userAddress = false);

  const navigate = useNavigate();
  const [isCenter, setIsCenter] = useState(false);
  const [open, setOpen] = useState(!userAddress);
  const [firstAddress, setFirstAddress] = useState(userAddress[0]);
  const [secondAddress, setSecondAddress] = useState(userAddress[1]);
  const [thirdAddress, setThirdAddress] = useState(userAddress[2]);
  const [detailAddress, setDetailAddress] = useState("");
  const [warning, setWarning] = useState("hidden");
  const dispatch = useContext(DispatchContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onChangeAddress = (e) => setDetailAddress(e.target.value);

  const navigation = () => {
    dispatch({
      type: "setTown",
      nextState: `${firstAddress} ${secondAddress} ${thirdAddress} ${detailAddress}`,
    });
    navigate("/register");
  };

  const submitAddress = () => {
    (isCenter &&
      firstAddress &&
      secondAddress &&
      thirdAddress &&
      detailAddress) ||
    (!isCenter && firstAddress && secondAddress && thirdAddress)
      ? navigation()
      : setWarning("visible");
  };

  const handleData = (data) => {
    console.log(data);
    const addressData = data.address.split(" ");
    setFirstAddress(districtor(addressData[0]));
    setSecondAddress(addressData[1]);
    setThirdAddress(addressData[2]);
    handleClose();
  };

  return (
    <div>
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <DaumPostCode onComplete={handleData} />
          </Box>
        </Modal>
      </div>
      <Header type="plain" />
      <Box sx={centerStyle} style={{ marginTop: "8vh", marginBottom: "8vh" }}>
        <div style={{ color: theme.palette.primary.main }}>
          기관사용자이신가요?
          <Checkbox
            onChange={() => {
              setIsCenter(!isCenter);
            }}
          />
        </div>
        <Input value={firstAddress} placeholder="시" />
        <Input value={secondAddress} placeholder="군, 구" />
        <Input value={thirdAddress} placeholder="도로명주소" />
        {usertype === "center" ? (
          <Input
            onChange={onChangeAddress}
            placeholder="상세주소 (기관 사용자 입력 필수)"
          />
        ) : null}
      </Box>

      <Box sx={centerStyle}>
        <Typography
          color="primary"
          onClick={handleOpen}
          style={{ cursor: "pointer" }}
        >
          주소 재검색
        </Typography>
        <BaseButton
          text="확인"
          width={300}
          func={submitAddress}
          onClick={submitAddress}
        />
        <Typography style={{ visibility: warning }} color="error">
          값을 입력해주세요
        </Typography>
      </Box>
    </div>
  );
};

export default DetailAddress;

DetailAddress.propTypes = {
  usertype: PropTypes.string,
  userAddress: PropTypes.string,
};
