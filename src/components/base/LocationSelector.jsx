import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import { MyLocation as MyLocationIcon } from "@mui/icons-material";
import area from "@/utils/const/LocationData";
import theme from "@/styles/theme";
import { StateContext, DispatchContext } from "@/context";

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
    handleSelectedTown(`${city} ${detail}`);
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
    if (city && detail) {
      console.log(city, detail);
      handleSelectedTown(`${city} ${detail}`);
    }
  }, [detail]);

  return (
    <div>
      <Button onClick={handleOpen} endIcon={<MyLocationIcon />}>
        {state.selectedTown ? state.selectedTown : "지역선택"}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ width: "100%", overflow: "auto" }}>
            {openDetail
              ? area[city].map((city, idx) => {
                  return (
                    <>
                      <Button
                        sx={cityStyle}
                        key={idx}
                        onClick={addDetail}
                        endIcon={<MyLocationIcon onClick={addDetail} />}
                      >
                        {city}
                      </Button>
                    </>
                  );
                })
              : Object.keys(area).map((city, idx) => {
                  return (
                    <>
                      <Button
                        sx={cityStyle}
                        key={idx}
                        onClick={onDetail}
                        endIcon={<MyLocationIcon onClick={onDetail} />}
                      >
                        {city}
                      </Button>
                    </>
                  );
                })}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default LocationSelector;

const cityStyle = {
  width: "45%",
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
