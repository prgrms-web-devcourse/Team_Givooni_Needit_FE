import theme from "@/styles/theme";
import { useContext, useEffect, useState } from "react";
import { DispatchContext } from "@/context/index";

/*global kakao*/

const Gps = () => {
  const [latitude, setLatitude] = useState("37.566826");
  const [longitude, setLongitude] = useState("126.9786567");
  const [address, setAddress] = useState("위치를 찾는 중입니다.");
  const dispatch = useContext(DispatchContext);

  const kakaomap = () => {
    useEffect(() => {
      kakao.maps.load(() => {
        const container = document.getElementById("map-container"),
          options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3,
            scrollwheel: true,
            draggable: true,
          };
        const map = new kakao.maps.Map(container, options);
        const circle = new kakao.maps.Circle({
          center: new kakao.maps.LatLng(latitude, longitude),
          radius: 100,
          strokeWeight: 5,
          strokeColor: "#ffa409",
          strokeOpacity: 0.1,
          fillColor: "#ffa409",
          fillOpacity: 0.5,
        });

        circle.setMap(map);
      });

      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            function (error) {
              console.error(error);
            },
            {
              enableHighAccuracy: false,
              maximumAge: 0,
              timeout: Infinity,
            }
          );
        } else {
          console.log("GPS 지원이 불가한 환경입니다.");
        }
      };

      getLocation();

      function getAddress(lat, long) {
        let geocoder = new kakao.maps.services.Geocoder();
        let coord = new kakao.maps.LatLng(lat, long);
        let callback = function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            setAddress(
              result[0].region_1depth_name + " " + result[0].region_2depth_name
            );
            dispatch({
              type: "setTown",
              nextState: address,
            });
          }
        };

        geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), callback);
      }
      getAddress(latitude, longitude);
    }, [latitude, longitude]);
  };

  kakaomap();

  return (
    <div
      style={{
        height: "62vh",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        id="map-container"
        style={{
          height: "120vw",
          width: "90vw",
          maxWidth: "420px",
          maxHeight: "560px",
          borderRadius: "12.8px",
        }}
      ></div>
      <div style={{ color: theme.palette.gray.dark }}>{address}</div>
    </div>
  );
};

export default Gps;
