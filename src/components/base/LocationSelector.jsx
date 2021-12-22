import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import { MyLocation as MyLocationIcon } from "@mui/icons-material";
import LocationData from "@/utils/const/LocationData";
import theme from "@/styles/theme";
import { StateContext, DispatchContext } from "@/context";
import styled from "styled-components";

const LocationSelector = () => {
  const state = useContext(StateContext);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [city, setCity] = useState("");
  const [detail, setDetail] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const onDetail = (event) => {
    if (event.target.innerText === "지역 필터링 해제") {
      setCity("");
      setDetail("");
      handleSelectedTown("");
      handleClose();
      return;
    }
    event.target.innerText
      ? setCity(event.target.innerText)
      : setCity(event.target.parentElement.parentElement.innerText);
    setOpenDetail(true);
  };

  const addDetail = (event) => {
    handleClose();
    if (event.target.innerText) {
      setDetail(event.target.innerText);
    } else {
      setDetail(event.target.parentElement.parentElement.innerText);
    }
    setOpenDetail(false);
  };

  const dispatch = useContext(DispatchContext);

  const handleSelectedTown = (town) => {
    dispatch({
      type: "setTown",
      nextState: town,
    });
  };

  useEffect(() => {
    if (openDetail) return;
    if (detail) {
      handleSelectedTown(`${city} ${detail}`);
    }
  }, [detail]);

  return (
    <div>
      <Button
        color={state.selectedTown ? "primary" : "gray_dark"}
        onClick={handleOpen}
        endIcon={<MyLocationIcon />}
        sx={{ fontWeight: "400" }}
      >
        {state.selectedTown ? state.selectedTown : "지역선택"}
      </Button>
      <Modal open={open}>
        <Box sx={style}>
          <Box sx={{ width: "100%", overflow: "auto" }}>
            {openDetail ? (
              LocationData[city].map((city, idx) => {
                return (
                  <ButtonContainer key={idx} onClick={addDetail}>
                    <Button
                      sx={cityStyle}
                      key={idx}
                      onClick={addDetail}
                      endIcon={<MyLocationIcon onClick={addDetail} />}
                    >
                      {city}
                    </Button>
                  </ButtonContainer>
                );
              })
            ) : (
              <>
                {Object.keys(LocationData).map((city, idx) => {
                  return (
                    <ButtonContainer key={idx} onClick={onDetail}>
                      <Button
                        sx={cityStyle}
                        key={idx}
                        endIcon={<MyLocationIcon onClick={onDetail} />}
                      >
                        {city}
                      </Button>
                    </ButtonContainer>
                  );
                })}
                <div onClick={onDetail}>
                  <Button color="gray_dark" sx={{ width: "100%" }}>
                    지역 필터링 해제
                  </Button>
                </div>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default LocationSelector;

const cityStyle = {
  textAlign: "center",
  color: theme.palette.text.secondary,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "1vw",
  overflow: "auto",
};

const ButtonContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 45%;
`;
