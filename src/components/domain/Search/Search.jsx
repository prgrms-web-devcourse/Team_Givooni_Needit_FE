import { getRequest } from "@/api/axios";
import Header from "@/components/base/Header";
import Input from "@/components/base/Input";
import Nav from "@/components/base/Nav";
import useDebounce from "@/hooks/useDebounce";
import theme from "@/styles/theme";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import PostCard from "../Posts/PostCard";

const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [centersResult, setCentersResult] = useState([]);
  const [donationsResult, setDonationsResult] = useState([]);
  const [wishesResult, setWishesResult] = useState([]);
  const [viewCenters, setViewCenters] = useState(true);
  const [viewDonations, setViewDonations] = useState(true);
  const [viewWishes, setViewWishes] = useState(true);

  useDebounce(
    async () => {
      if (value === "") setDonationsResult([]);
      else {
        const centersData = await getRequest("centers/search", {
          params: {
            centerName: value,
          },
        });
        setCentersResult(centersData.data);
        const donationsData = await getRequest("donations/search", {
          params: {
            page: 1,
            size: 20,
            title: value,
          },
        });
        setDonationsResult(donationsData.data.content);

        const wishesData = await getRequest("wishes/search", {
          params: {
            page: 1,
            size: 10,
            title: value,
          },
        });
        setWishesResult(wishesData.data.content);
      }
    },
    400,
    [value]
  );

  return (
    <>
      <Header type="searchOut" fixed={true} />
      <AlignContainer>
        <form type="search">
          <Input
            value={value}
            type="searchFull"
            sx={{ width: "95vw" }}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
          />
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={viewCenters}
                  onClick={() => setViewCenters(!viewCenters)}
                />
              }
              label={<Typography variant="body2">기관 사용자</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={viewDonations}
                  onClick={() => setViewDonations(!viewDonations)}
                />
              }
              label={<Typography variant="body2">기부 원해요!</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={viewWishes}
                  onClick={() => setViewWishes(!viewWishes)}
                />
              }
              label={<Typography variant="body2">기부 받아요!</Typography>}
            />
          </FormGroup>
          {viewCenters && (
            <ListContainer>
              기관 사용자
              {centersResult?.map(
                (
                  { profileImageUrl, name, address, introduction, centerId },
                  index
                ) => (
                  <Card
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/center/${centerId}`);
                    }}
                  >
                    <Image src={profileImageUrl} />
                    <div>
                      <CenterName>{name}</CenterName>
                      <CenterDescription>{address}</CenterDescription>
                      <CenterDescription>{introduction}</CenterDescription>
                    </div>
                  </Card>
                )
              )}
            </ListContainer>
          )}
          {viewDonations && (
            <ListContainer>
              기부 원해요!
              {donationsResult?.map((res, id) => (
                <PostCard key={id} data={res} />
              ))}
            </ListContainer>
          )}
          {viewWishes && (
            <ListContainer>
              기부 받아요!
              {viewWishes &&
                wishesResult?.map((res, index) => (
                  <PostCard key={index} data={res}></PostCard>
                ))}
            </ListContainer>
          )}
        </form>
      </AlignContainer>
      <Nav />
    </>
  );
};

export default Search;

const Card = styled.li`
  list-style: none;
  color: black;
  border: 1px solid ${theme.palette.gray.main};
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 12.8px;
  margin-bottom: 0.5rem;
  background-color: ${theme.palette.gray.light};
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.8rem;
`;

const AlignContainer = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 0rem 4rem 0rem;
  box-sizing: border-box;
  color: ${theme.palette.primary.main};
  gap: 0.5rem;
`;

const ListContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Image = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`;

const CenterName = styled.div`
  color: ${theme.palette.primary.main};
  font-size: 0.95rem;
  font-weight: 500;
`;

const CenterDescription = styled.div`
  color: ${theme.palette.gray_dark.light};
  font-size: 0.7rem;
`;
