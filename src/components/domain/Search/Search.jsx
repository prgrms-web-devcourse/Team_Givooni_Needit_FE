import { getRequest } from "@/api/axios";
import Header from "@/components/base/Header";
import Input from "@/components/base/Input";
import Nav from "@/components/base/Nav";
import useDebounce from "@/hooks/useDebounce";
import theme from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";

const Search = () => {
  const [value, setValue] = useState("");
  const [centersResult, setCentersResult] = useState([]);
  const [donationsResult, setDonationsResult] = useState([]);
  const [wishesResult, setWishesResult] = useState([]);

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
            size: 10,
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
          <ListContainer>
            센터
            {centersResult.map(
              (
                { profileImageUrl, name, address, introduction, centerId },
                index
              ) => (
                <Card
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(centerId);
                  }}
                >
                  <Image src={profileImageUrl} />
                  <div>
                    <div>{name}</div>
                    <div>{address}</div>
                    <div>{introduction}</div>
                  </div>
                </Card>
              )
            )}
          </ListContainer>
          <ListContainer>
            기부 게시물
            {donationsResult.map((res, index) => (
              <Card key={index}>{res.title}</Card>
            ))}
          </ListContainer>
          <ListContainer>
            기부 희망 게시물
            {wishesResult.map((res, index) => (
              <Card key={index}>{res.title}</Card>
            ))}
          </ListContainer>
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
  padding: 0rem;
  box-sizing: border-box;
  color: ${theme.palette.primary.main};
  gap: 0.5rem;
`;

const ListContainer = styled.div`
  margin-top: 1rem;
`;

const Image = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`;
