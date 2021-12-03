import { useEffect, useState } from "react";
/*global kakao*/
const Gps = () => {
  const [latitude, setLatitude] = useState("37.566826");
  const [longitude, setLongitude] = useState("126.9786567");
  const [address, setAddress] = useState("서울 중구 태평로1가 31");

  const kakaomap = () => {
    useEffect(() => {
      kakao.maps.load(() => {
        const container = document.getElementById("map-container"),
          options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 2,
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
            setAddress(result[0].address.address_name);
          }
        };

        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      }
      getAddress(latitude, longitude);
    }, [latitude, longitude]);
  };

  kakaomap();

  return (
    <div>
      <div
        id="map-container"
        style={{ height: "600px", width: "500px", borderRadius: "12.8px" }}
      ></div>
      <div>현재 위치 : {address}</div>
    </div>
  );
};

export default Gps;
