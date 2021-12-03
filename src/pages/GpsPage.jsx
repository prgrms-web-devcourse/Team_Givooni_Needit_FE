import Gps from "@/components/page/Gps.jsx";
import Button from "@mui/material/Button";

const GpsPage = () => {
  return (
    <div>
      <Gps />
      현재 계신 위치와 동일한가요?
      <div>
        <Button href="/GpsDetail" variant="contained" color="primary">
          확 인
        </Button>
        <Button href="GpsDetailed" variant="outlined">
          아니오
        </Button>
      </div>
    </div>
  );
};

export default GpsPage;
