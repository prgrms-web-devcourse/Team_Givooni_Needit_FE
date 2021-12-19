import * as React from "react";
import PropTypes from "prop-types";
import { TextField, Box, Modal, Button } from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import BaseButton from "@/components/base/BaseButton";

const AddSchedule = ({ reserveDonation }) => {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const schedulerConfirm = () => {
    value && handleClose();
    reserveDonation(value);
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        sx={{
          maxWidth: "70px",
          maxHeight: "70px",
          minWidth: "30px",
          minHeight: "30px",
          marginRight: "4px",
          padding: 0,
        }}
      >
        <EventIcon fontSize="large" />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "90%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box>
              <MobileDateTimePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                label="약속을 정해주세요!"
                onError={console.log}
                minDate={new Date("2021-12-01T00:00")}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "90%", mx: "5%", my: 1 }}
                    {...params}
                  />
                )}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  m: 1,
                }}
              >
                <BaseButton text="확인" onClick={schedulerConfirm} />
                <BaseButton text="취소" btnType="white" onClick={handleClose} />
              </Box>
            </Box>
          </LocalizationProvider>
        </Box>
      </Modal>
    </Box>
  );
};

AddSchedule.propTypes = {
  text: PropTypes.string,
  reserveDonation: PropTypes.func,
};

export default AddSchedule;
