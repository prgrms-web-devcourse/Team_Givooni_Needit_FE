import * as React from "react";
import PropTypes from "prop-types";
import { TextField, Stack, Box } from "@mui/material";
// import { Event as EventIcon } from "@mui/icons-material";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import BaseButton from "@/components/BaseButton";

const Scheduler = () => {
  const [clearedDate, setClearedDate] = React.useState(null);
  console.log(clearedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          clearable
          value={clearedDate}
          onChange={(newValue) => setClearedDate(newValue)}
          renderInput={(params) => (
            <Box>
              <TextField
                {...params}
                sx={{ display: "flex", m: 1 }}
                inputProps={{ placeholder: "약속시간을 입력해주세요!" }}
              />
              <Box sx={{ display: "flex", gap: "10px", m: 1 }}>
                <BaseButton text="수락" func={() => console.log("클릭!")} />
                <BaseButton
                  text="거절"
                  type={1}
                  func={() => console.log("클릭!")}
                />
              </Box>
            </Box>
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

Scheduler.propTypes = {
  text: PropTypes.string,
};

export default Scheduler;
