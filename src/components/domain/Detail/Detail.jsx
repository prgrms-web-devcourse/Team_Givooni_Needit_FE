import styled from "styled-components";
import { useState, useEffect, useContext } from "react";

import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Nav from "@/components/base/Nav";
import Header from "@/components/base/Header";
import Slider from "@/components/base/Slider";
// import Input from "@/components/base/Input";
import BaseButton from "@/components/base/BaseButton";
import Profile from "@/components/base/Profile";
import theme from "@/styles/theme";

import { StateContext } from "@/context/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const giveComplete = {
  text: "기부완료",
  type: "gray",
};

const giveUncomplete = {
  text: "기부신청",
  type: "white",
};

const Detail = () => {
  const [detailData, setDetailData] = useState({});
  const [isClickMoreVert, setIsClickMoreVert] = useState(false);
  const [giveButton, setGiveButton] = useState(giveUncomplete);
  const [modalLink, setModalLink] = useState("");
  const state = useContext(StateContext);

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setModalLink(e.target.currentSrc);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    //api
    setDetailData(Dummy_Data.data);
    console.log(detailData, Dummy_Data);

    isCommentExist();
  }, [detailData]);

  // follow 대상인지 아닌지에 따라 팔로우 하트 혹은 언팔로우 하트 추가
  const IsFollow = () => {
    return false;
  };

  const isCommentExist = () => {
    let isExist = false;

    detailData.comments &&
      detailData.comments.map((comment) => {
        if (comment.userId === state.userId) {
          setGiveButton(giveComplete);
          isExist = true;
        }
      });

    return isExist;
  };

  const clickGiveCommentBtn = () => {
    if (giveButton.text === "기부신청") {
      //api 실행
      //   const apiData = {
      //     "data": 1, // 해당 기부희망댓글의 식별자 아이디 반환
      //     "message": "success"
      //   }

      setGiveButton(giveComplete);
    } else if (giveButton.text === "기부완료") {
      // 자신의 comment 삭제 이벤트
      setGiveButton(giveUncomplete);
    }
  };

  return (
    <>
      <MainContainer>
        <Header type="main" fixed={true} />
        <WriteContainer>
          <WriteSubContainer>
            <TextSliderAvatarContainer>
              <Avatar sx={{ width: 50, height: 50 }} />
              <TextSliderContainer>
                <div>{detailData.userName}</div>
                <Slider
                  id="기부진행"
                  toggle={true}
                  onChange={(data) => {
                    console.log(data);
                  }}
                />
              </TextSliderContainer>
            </TextSliderAvatarContainer>
            {state.userId === detailData.userId ? (
              <MoreVertIcon
                onClick={() => {
                  setIsClickMoreVert(!isClickMoreVert);
                }}
              />
            ) : IsFollow() ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}

            {isClickMoreVert ? (
              <>
                <EditIcon
                  onClick={() => {
                    // 글쓰기 페이지 이동
                    console.log("글쓰기 페이지 이동");
                  }}
                />
                <DeleteOutlineIcon
                  onClick={() => {
                    console.log("삭제기능구현");
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </WriteSubContainer>
        </WriteContainer>
        <TitleContainer>
          <CustomTitle>{detailData.title}</CustomTitle>
        </TitleContainer>
        <ContentContainer>
          <CustomContent>{detailData.content}</CustomContent>
        </ContentContainer>
        <ImageWrapContainer>
          <ScrollWrapContainer>
            {detailData.images &&
              detailData.images.map((link, i) => {
                return (
                  <CustomImg
                    src={link}
                    key={i}
                    onClick={(e) => {
                      handleOpen(e);
                    }}
                  />
                );
              })}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={modalLink} />
              </Box>
            </Modal>
          </ScrollWrapContainer>
        </ImageWrapContainer>
        <LineBar />
        <CommentContainer>
          <CommnentSubContainer>
            <GroupContainer>
              <ProfileContainer>
                <Profile
                  width={23.65}
                  height={17.4}
                  comments={detailData.comments}
                />
                <CustomCommentNum>
                  참여자 수 {detailData.userCnt}명
                </CustomCommentNum>
              </ProfileContainer>

              {state.userId !== detailData.userId ? (
                <BaseButton
                  width={80}
                  height={28}
                  fontWeight={500}
                  fontSize={12}
                  text={giveButton.text}
                  btnType={giveButton.type}
                  onClick={() => {
                    clickGiveCommentBtn();
                  }}
                />
              ) : (
                <></>
              )}
            </GroupContainer>
            {detailData.comments &&
              detailData.comments.map((part, i) => {
                return (
                  <CardContainer key={i}>
                    <MemberDeleteContainer>
                      <MemberContainer>
                        <Avatar
                          sx={{ width: 30, height: 30 }}
                          src={part.userImage}
                        />
                        <MemberName>{part.userName}</MemberName>
                      </MemberContainer>
                      {part.userId === state.userId ? (
                        <DeleteOutlineIcon
                          onClick={() => {
                            console.log("댓글 삭제기능");
                          }}
                        />
                      ) : (
                        <MailOutlineIcon
                          onClick={() => {
                            console.log("메일보내기 기능");
                          }}
                        />
                      )}
                    </MemberDeleteContainer>
                    <JoinCommentContainer>
                      <Comment>기부할래요!</Comment>
                    </JoinCommentContainer>
                  </CardContainer>
                );
              })}
          </CommnentSubContainer>
        </CommentContainer>

        <Nav />
      </MainContainer>
    </>
  );
};

const Dummy_Data = {
  message: "success",
  data: {
    id: 1,
    title: "재능기부할 사람~",
    content: "기부원해요",
    category: "재능기부",
    status: "기부진행",
    userId: "abcde",
    userName: "테스트 센터",
    userImage: "updated url",
    userCnt: 3,
    boardType: "WISH",
    createdDate: "2021-12-13T23:56:35.714455",
    updatedDate: "2021-12-13T23:59:17.218369",
    tags: ["아동·청소년", "어르신"],
    images: [
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhYYGRgZHSEeGhocGhoaGhocHh4aGhwaGh4cIS4lHB4rHxoZJzgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQrJSE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0ND80NDQ0NP/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYHAAj/xABEEAABAgMEBwUGBAUDAgcAAAABAhEAAyEEEjFBBVFhcYGR8AYiobHREzJCUsHhYoKS8RRyssLSB6LiFXMjQ1NUY8Py/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QAJBEAAgICAgICAwEBAAAAAAAAAAECEQMhEjEEQSJRE2FxQjL/2gAMAwEAAhEDEQA/AOirU+azxI8jCBbfNxKn8TCMr5n23Uj1jxURmf0j0jxzShUr13+Z/wAox9vVctS3Ba+FZHFlHXmTnGvTMfFdOHpGW7SyGmhQUVXkYuXcEhsNTQYjR7PaXnIRNIUpAdiHIBIa7ma1SYERbkfOiud4axXGC9JIBMtWLopwILc1GHyi9T9NmUXguVInLRR6ftDrShsUVOoFj5AdGKmTLJAX8oUeBMs/3GLS02crUpbd5WrJ6eQ8IKmIQiWst8N0ciDux8Y9OOL19GSUzOWCaBY5zkXfdJOT3geLrIG7hAWj7KUy/bH41EpTsupTU+J4QLZp6p6RZkUK5hWsj3QxIKtoDlhtOuNPpCzXQhADJQAlGZADsojWAFrO0fiilXEW6dfYJo0XQpZwvC6M1KHwgcE/qhsqSVJSnMqfZU3y+4Dzgm0oveyQgBKQCW1B6YbEu8OQ4Jb4EudpNQNxLxOhkx1onAlCR7qVFSlHK6G8SwAxj1ltQEz2pDJlhgM1KuhKU/7XOplY0cJSSSz4BhqAGJPEjacIlADAAd1NA+JJxUdp+ghZSKRjYTJmdy7mojgBnBwJY01+UDWcZtWChE3IvHHYllm90obEY7mbm0AWkMDy5N6QadcBrZliDGWgSx0zN233zubxeIZgZS+MS2pJvdaxDJiO+s5Y/WOchFEGVhtb+4wPaSy31H6NB6JfpybrjAU1DpG5uTwjZRI6doWYZ0tK03GV8yiGIxFAcHiwVZV4lSOCln/64x/YPShTflVr30bwBeHEHwjbrnE5eHjHm5UoyaNEbaA12VXzp5KPpEf8Cv50/pV/nBV85Jj3tFbInzDTL9KZj0CAPz/5CHhBGJRwvDzVCBCMXD6ro+jQ10irq4BA8VK9YNkdjyo/h4iviYpO1UslCFnAKKaNmH2/KYuUWgfM35knwC4B08ErkLxJSyqAFmNcCcnho9hV2UyJZVJRV7ilpfMBRvAeAiBCFpUUqWFJvd1skuL2+kLYkCZLmILkABbHYUk0H8g5mIVITLKkpFBUgcCTxwjd4iUpfwhndIhtk4IQVZ1I/KW83EVFot3cLnElw+QSVcaI5wmlp7qKTVN5CfqfI84r7bLBN3FkL2fAR9SeMejKRkjEB7DMgKmn3j3U5mmez7bYulWlc+YEAs4AUdQNSBwSeBIij0Ou5JRQVpWrn3jQ0yA4RfWFaUJUq4L6zViQMbqQXJalS2EBPVBkt2WCkhyRS9QbAkMBtpSJ0SgEGtVkga2SAB4v4xX2KdfU4BYDuucXNA1K+7BGmp9xQlggkI5OQgc1F+EdaO4sr7NLKiVPTLg/r4wUlOWrHXu8ucLZ1hKXpWiUjdTgzF98FWazsHPR1mM82a8asSVLYZxI8PVEcyIs1RVEMxbJgIrYGJrStgOsICWahOZ9R9ucchZAlpQL6Rs+pMRrl0Udb+USKmXllg+Q3CnMtDpxYtiwrh0anwgtiqPYLMAFN8CrR3SB+L6esELx4Q0mn5T4n9oFisG0VajLmJWMUEHeAACOTx1aRaypAKUKIIoXAplgdUcgkjvJ2x0Ts/MKpKRQ3XS+xy0ZvIitNjwZcLmrOQG9R/xiO8v8H6/+MRqRu8I97PdyEZfj9FdmtNnDd5Lb1JHljCos6Mko33x6RGVpORHEAcnhU3R8Irv9Y7RHYSENkj9cJMk3kqT3TeBTzBGMQldKJ3UbzIENWteQSN4B8liOFpmQ0S6VkEiqVJOeol/yhXOKyfO7xDu6gnW4Qz7w5EWtsT7Na1KoUqJpnQnX7tcIy0+eAknO6STqvOTlqA5b49XxI0nIjndtIAt1pqFE1C3O9RPd4KJDbNsSzFD/AMRZZkoU+4BKT/T4wBNlqZDsBeSQTR2chhiXJ8ILtC0pkTSmpa66mIqSPdqDiMXdsI1kaK3R88EJCUnY5f3tQ4MMXJaLe1rYBIxZg20d7fR+Yis0WhgVrOJo9VKoADXANg+/KlvoSX7ebexSCK4vXLxPAwljF9oSwF0IOq8rYMA/E/7YzU/SBmT1qFSpYu6sVBA2JAvKP2jYWu0hFmnzR3SsEA6kglIbY5POMt2Y0deHtFBh3ikcWB3hNI6WgRVs0NgsSUBKlqF5mA+UZ/mJqeiSipORipn2InBVdtYCm2eanAvuLfSM8pWbIRaRfTCIHmrii/6ktJYvxhs/TAbUd/TQtWU5JBFtnAFn37M/SB1KuoKviXRIzbDy84ARagTfW90VCRio6zqENmWpcxeQKgw/AjPdtO9nLQ1E+VuyewVUSKJSMsMnO0O55RJ7N+NTsSHYcS/KJJIATcRUDEtQnbqSNWJ3Q6YWDB9ZUaEnjCSdsdKkDCU5VkAKk5bdkV9ptAcgCgH0oOUFaQnXEMDUn7PzjPlXeCdrq9N+Lw6WiUnssE4jWCPED6xuezCFKQoJu5GpIxGVDqjEpTR9d3me83Jo6B2El3kLVsThvP1BiOeuOxouixTYlk94pG5T+kS/wv40+HrFqqyghy5OykQXf/jX4esY7j9B5S+yyJOV3aDeV9WhApYNEI4Y+JENUEs5IhoKBUFFPwjxISYnsJIqasZJ8PQwl9eN5sh3n/tj3tU/KOAf+oCEVNGIQf8AaPOCk/Z1mT7XTLhr3gq4CXOagk5DJJjJ26ddSoCh7qQRjiHL5UJwjTdtlgpvN8QAFPhN96b4xWklshY1KA3MlIj2MDqCMk9yBRMvLcF2D4nGt1/DmYK0ou5Z2cOcC+qiT4g7xFVYgxUf5QOXhlzEE6fW6LoyA5OPQxWxaK9FqDBAwFOBx4nMx0Ps5ZVJs5uJJXM7iW+G8GvcEuf3jnGh5F6YkayB94+htBaOSiUhhUDxIrHRVsEnSM5pnQ6lSRKoEd2/sSkYDafqYp0qCEhNAAG2UjoVvsoUkiMLpfQl8mJ5NFsCT2Ulp04hJZ3PXGI7N2gkrIF4B9Z9RDbdof2SFpSlytBDsMeqcYzOirGtc9KUJddGBTeSnD3gaUxrm8I4RaLfklF9G8XZUTE0L/eKe19niTxw9YuJ9nFnnJSg9xb935VahsPnB81btEE3FluKkrZn5HZh8VcBh6/tti4snZ+Sge7eOZOcWVmTE06ggSmwxhFeijt85EsUGG6Mtb9KgvTcI1NtlJ+JuLfWM+vRKFrJJF3eBwf0gxa9gkn6M9a7W6AXz4vr35cYrpWO09NE2kkBKzWnwtgz5RFZqxpXRlfZbiYyBX4nI/lSw846L2IBRZ715is4XXoHAx2kxzvRNhVaJqZYwfvHUM69Zx1yUlCEpQmiUhk8BGLyZKK4/ZSKsKM8/Or9KY97T8auUv0iNE0a4k9oIx2/oeixlSE5XeCVA+ESqlHK9+lf1pEISgtTDBk+TloVaE//AKWgQLFHXSKeJAf+oR5eDkAtXDIeEMWUD4wk6rw+kRz1pul1A5Bkk6tbwyezqMb2xmBXs01crU+DU7npGD0xMx2rPkU+cbXtitLygl2Dn3QMkKyx948459pFbnaCT/UY9bA/gjNPs9o4uoDbePgP7RC6RUS4108f3iPRRq+4eH7QlvUxrq8HPrFGzkT9n0/+MjVeHnSPomwe4ndHzzohQM1Ck4Xg0d/sEzuI3CGi6FmrQRPFIzduQxMX02dFLb1AmJZnqy3jrdFDakE7YEl2Ri4BB2FvKLq4DDFyWjI5s3qCKxWj0KUlSit0qCqqLEjBwYVZ7x1QXMTEIlEx0W2c9Fho9DwPpSZdQpdWSHpU8NZgzRqWLQ6dZXB2wr7Ccen2ibaZoKu8T7sp1ABywDBiasSc90aLtDo4SAhSHBYe0D90hqkp4GNUrRoBcBjrFD4RW9pLHds81WdxWf4TF/yJ0qM7xUm7OX2ueZswqNScAMgMAMhSJpIyw1wLLF0VPARPLW7DbF2ZToXYSUgXgQHIxP4SNX8wjbXZZwCH1d5/OMP2SKhMe6XKrvFSL2e1B5RtwF/IrlHmeRfIvHof7FGDI8fK9Hv4dPyo5H/KGFKvkX+lX0hO98i/0r9IlQS2KXxS/FZ84QS0k+4w4/UGHpWj5jyU27GFJRrB3Zc4SgciIpAoEjiAPMRCWZlM29Iwrq2QQbn4vIeJiJUwZXvdPxbNjwV2Gzn/AGum3lytxO9wBX9MYK3mp6xjfds1d9H8pFNl4+ao5/bj1wj1sD+CM0uxNGTMdqvAwukFZdZn6iBLApv1J/ugq248TFn2CJP2cNRsVHe9FTHlp3RwDQKmWobQfEj0jtnZq03pYByjl2dJfEuJyqRU2iLRcVlpSxhZrRTC6YKgxIrCIiYcVRhktnoRegSeYKsEu9hFTOmKXMuJpXGNNoeyiWkgqBJjRhh7ZnzzpaEsktlwSoCElEX3GuIlzO8RtiM3TZSFtIeZQMUHbsIRYpxPysN6iEjzjQoU8c5/1V0wGRZkmpIWvYA4Sk7y54DXHY1ykgZJcYs5oMWgmzio3wMgQZZk4HUevKNrMR0Ds/NCFgqPxSlD8xMsEHcpUdBKAM+nY/SOXWdwogE1S4wPurBTuoenjoiVmnfX+lB1HZHmeQvkmWiEe2TeIr3WehzdqnE0yhL41K8PWAZk8ml4/pH+UD/xavm/2f8AOIjUahUpZZwG1XR9awipCsX5OPIQGqYrJIO0v9RHghZGCeKSfIQrZ1E5B/FyZ+LvDZ5N1VcjQkatp3wz2Cw2A3JUPOI5qFEF1nazbNsFHGO7eSi6CCaXmFMDizbhz2xzi3Hy+0dJ7ey1ezSolwCc3Ic08jHNbeXD5tXacX5x6fj/APKM8+wKz4HrD94NtJfmPKAbOWUesifpB9oFOH1i7BEgsky5NSddDx+7R1/slaXSBrEcbnhiDqLx0PsbbWUEnfwP3gnVpo6bAFpOMEiaGgG2FoWXQca2BLVWEKqNEC5jPEcu1JVVJBGsGkZZRtm+LpEM2QUqvoNYZZkWgLKytSgT7tAANQiVdvlihWH2Vg2xW1Ck0U5fCO5Sih/xct0FWRCxizaz1UwSASok5wQFApoRA4WGJOWL4b4m3Z3QPpnSqLLJXOXgkUGalH3UjefBzlHCbfbFzpi5qy6lkknLcNQAYAahF9227Qm1zbqCfYy3CdSjgVkbcBs3mMykRrxQ4q32zDmnylrpE0tOHWuDtHy3WE6wdtWPpAqUUG71i00Mke1STl3vED6w8noQuETSF3SCGcEVqCLj+KTwjZWbSSVS0Oa3A+VWD+MYnSU5PtrySWwqd4wyHuxo9F24pkJYrxIAAJ+I57IxZo8kmUi6LmQsLS6S78aaw2MR+yT8yf1Q+zrLCtW4wT/FdMIzLIlqg0y7Ew0He3BaG4d4GPKCjQvxWPQwxMzKgOwI9TD5ZOSieKfoIRBIVSgCKNvVeH0eHrl7R+k7TiXEPmEipx/mW/hAk5dDQmmtRbDWYZHGU7cgCSQ+aWw1qfrbHN7YKda43vbmYCUpZmFaNmG/pMYqZLpsb7x6WBVFEJ9lKCxB6p0YPVVL8ONfQwAsMSINs63Q23yBbmCeUXYsexkxLgbovdDWooKVDFPiMxFKB15QdYJjG4TXLaNW+EHR2DR1rC0JUkuCIS2rMZDQGkfZlie4fA642RAWlxnHS2ho/GRWqD4xn9K6HSTeCQ2bU40jUzJLRAqWTEF8Xs1Qk07RhEWVSSwF8HDF+BBESplzQWQlYOBBqA1DkG4xpJmgVKVeQbuxnHDVBtg0KsEla3TmkOHzqXweA5I9WObCo2+z2irItCEqKyb4qGDM+VM/rGW7ddpxdNlkqd6TVjD/ALYP9XLXEnbjtbdKrPZ1MoUWtPw5FCWz1nLDHDnUsZxTHj/1I8byM7lJpD1ChhUikeIcAddO8SFNIuZgwIDA6w3IiLTs8g3yoD3UDzOPFoqlq7ifzecX3Z5KkoURnTFIpxMSnpMZdntNTHuKY113doOA2DlF5o21hElIrUk+6DiSR8QyaMxaZipikIAfxqct+PONEmWtKUp9msgBh3SaDdEpR+KRzZobLOStAWjCrHURik6i9Im9sdY64RkbNpBdnmhSkL9mv3wUKDHC8HGLZDFo0v8A1Kz/APqJ/UfWMc8TvopGao0SJ+07mH0VEiZiTgk8QR5ritkzFMClwCHo/pB8uYWZyDqvONmqFo6yRP8AI+pn+8Dz1VqkJYZgDXrUHyhy1bRxYeJMDW+1BCFqcEs4Du5wSBvNIMVbpHNmE7ULKpisKKuhsGT3if1KUPyiM7aEsCNVOLh4vdIJ74RiQKnWo95R3laumijWXG9z5H1j04qkkR7KWeO8+0eH7QlmUxI6p9iYmnGrdYxAgC8Fc/IxT0IuwpFDxiO0EhiOjEqknPEGu8GFtgpseFXY76FlaZWkYAxfaD7cqlKCVodGbGqdoBx3RkVqqqkMIENSF5M7pYtJy5yAtCwpJwI8iMQdhiVKg8cNstrXLVeQtSDsLPvGB4xdyO2VpQGdCtqkl/8AaQIlPHy6LYsyj2dilLEZLt32tEhJkSVPOUO8of8Alg/3HIZY6nxNo7YWpYIvhA/CljwJcjhGeUpySS5NSTUk5vCww07Y+TPaqIwB4mAyhEikShLb4uzOkOlpruB9IcsUEKhLCPTMWGQbjC+xiQJe4nY55knzEWcu0EIuJxUanUnDhiYDuVI6YU+kWVgspXdSkZOScBtPjTOEk1WxkSaMs4vumgTmcyWcnrAxaFVGqTrNTDhZ0IF0JBbEkVJzJaISpL+6nmoeSozyqT7BYlpTfSRUnLDGKS6vby+0Xl9LsEpFPmW53d+HOPkTzX/nAX9FNZoqyTQAlYKSRequWQMAod0l6nKu+Lb+CWBe7135lqSgNrIUaP8AURkNOafmrMyWhd4JdRmJZAQkklKcKm7dBPIxo9HSDNs6ELXfQtCLyQ5Sca992ejgUpTExufiYb4279/oyrPm4qUkkSWyeqUpAUgEKBZlnIDNJYuS3rhFXpS2BSyw7qKs7pvB2I1Zk45RY2wISgISBcQ1BgGwAGGNYxky0KXeIe6FVORIyfMAthmI6OCGKLXbvv8ARRTlNpgNtmXipWZJPjTzJitUMTqiymSw104036zA9v7qatgdwqR1uhaKWUNoLPrA8y0DKLbj+0TWqcCWTsHW8+ZiKaly2oAcWD+JhxbD0FwDr+lHh6kXkNw4jrwgWzTWDbX5/sPGDZK2xw6bx84RqmUTtFRNQxfrCsRRZ2+X8QFM9hPr1jFaqGTsRqhIUJeEiVAYP0568IJyGTjlqhJct8YVIcvtidSWZPOAH9jEB9wh6jUDX+/OFFE4YwxQq+qg9Y4YKRiOsISQnveJ3CJJckhNcSY8o0Os+XTwgyJZCSq8djDjRvFo28qWhEpCE90sSVM5UaPmIzFjsqgEkJJBXTaQSrzEXGk7QXQADQZsGw2xOe1QsrTRJMR+P/Z/zgNaA/vjf7P/AJwir5+E80f5RH7JZ+E/qT/lE1ADY43RisncgcqriO+PmPJPrHl2df4AM+96RD/Br+Q8x6w/FAs1Nns4Si6m9eUu+pZKVFSndILpusItbXpdKEoQwSoJZTK7oGLkAAbTvhLToS1ygpdwFIDkgBm23lAjlFbo3Rc8PNMmWtJLBUyYAkXcSUg1q+IblGyco8m4qm+2SSbSUndegyQiZPTdYpRiSruhsa51IFBkE1EU2kQhJWhBUq6SHKboSzA0DMXBYZARtrTaZyZClrUEXElQTLllSaBw5UEhJ8jqMYSXaisnumpLqLb1F3OuO7WjlpjJhSgTH98kNxfDnGb0kpa1MMAGHqYtiLyn14UgaYDVtcCMbY0nSKJVluY4nLVDfZsl8ySK7g/nBdpGvrD1iNWAGX16ENxQqZAlDPXqsT3241+8IlGG+IxVhqrwzhXEZMJQpwR0NkBTbOQdkPQsCrcPvDfbFmIeE40PyT7BrrRNNolG9zwoPIxEsiJSHuPX7qLPBAOlIbgH519IYpVetsErNCdpPAYeMDJRz1wArodLLh+tcOQlyOfCHJl+m4HGJCi6NajTxq+6kBjIIHeu8fCn18Iks0kLWkGiSoB9+qPIAArkkc2c+YhhmvdOQVgN9T1qMTHRrpSU+1QlPuoD7nYDjSNGlCVhlgK3gHzjJ6KWVOstVhy1cSY0lkVrMZZ2mbIJND/+hSVuLqkvR0KI8C48IjtPZ64gKQlU0A95ilKgHZyCkuBiSDwiykr86eEHybVdTe1R0M0oyur/AKLkwRkq6/hy5cy9euhQHw3hVQ4GnKBP4jaecb7tboIKQbRKFRWYgDHWtIy289cYdxqjbGUZq0edKEoOmfQdpTfBTkQ0UehdHlBUhYdKfd1PhQcBGmRLZMQSEsoxQmnp0Zf/AFCtYlWUIwMxQB13Ed9TcQkfmjmtncJbMh88c28RwjSf6l2z2loEsHuoSE7HPeX4XQ34YygXT9vDOLx6JMZaFkKIwLAjk3pziC2p+MCitWRrTm44PC2maXSSBTAkV2g7MIFm2ogU8ahqOCDQh/rCtFOWgKYl3HEfUePhERRExL12wl2AMMUKQMXYjr7waR3YEUmAzkRLhihEpRDVphWhgZYiaWKuTgR1ziNZq8LLwOwjkX+0KELmEAMMwa8TESSnJzyETWhDoSoYdesAOyo4NhiplBvP0h610A2M41qLnzj0uTeSW4b2II8jzj0lLKQDgCx2avIiA0MpE9rmMzaz4EfTygWzLdZ1Cg39PyiedLvYdZ+kQzEBFM8TvZh9fHgEtBb2aXs9aklRRUU7v5aeTcjGrkrpqjmtjtBQpCnqC4+++sa+zaeQ3fCgWfDk0ZsuJ3aNOLLGqZoLXakoS5yDnwbx8o9MtBCZUtu+s3lDUkMo7qsHjKWzSyVrSGUpyCUhgS2CH1NUn9o1uhLKskzpvvryyQkYJHnvMJKPFWyqlydI01hUwD45xH/0Gy/+3l/phbPBbRBNjtJ9msMV9unplIXMUWShJUdyQ5gpS4yP+omkfZ2UpBZUxQTuSnvq/pA/NHrLbo8Y5daLSqZNWtVSSSa/EtV5RHWcMXhWnWEDSFUerkk/TLY3WLlrcVPXlGhdCNbILWqj6uPX3gFanTvgu04FnaAwO7AYyHIFIQCHpTTGFKYU4YvD6QORBJTEJTHMKIwIYtMTNDFCAEDWmGILPtglaIhUiFaGDLGQtCkZmo5AHljAy7OxANHwOW4w2SbpBGILxaKUiaO9Qnz1jXAoFkMpBT3mrgdW8a4klspQ1kgenGJJFkUAwW41Ufk0RzlhBYl1DAVptOflxjmjkyWQG2kCu18B4cngSaLyrxYjPVx9BBWkSQkLSHQtidhLuNhNdjhQyiOzlDd5QGx35sGJhRrBr4JwUdrV4A5RZ6OJUyWUE5khz9huiFNoQCyQDvAfzwg+yWkhYOGxsYEutDQ72a/RVilIAKUh8XKWPPOLyTNDsYoLHPSRix1fthFpZpxetYwStvZ6UaUdF7ZyDBsAWNTxYXTB4C8i4XMjlX+p2kSqahAJZCdvvLLnDYJf2je2y3gJJeOG6etxmz1q1rJOGCe6nwAjZilcjBOHGKsVK6DrZllshSvXAaJmyHiZ5+XQjUmZ6JpmFcYhu0/aFvPx1Qqeso448kU6p1WPCPNu8Hhyhq8Y44Zdhi0RIIaqOOIiIjUInbOGEQBgdSYjKIIKYY0Cg2QBEeJIie7CLRHUAhKyQzq50gUgimUFFENUmFaGH2S1lIKfhORqNx2FhuxEFS5bh0KI1oOPCne4NuitUiPIU0KFB5mqFCSeJH0iWzWoXkhjUgPvLZGBkWh9Z8eUNKhiCH6yMIx1R0mUEIQAAB5vB9hckHKMfoi1KmqF40GEbiwymaIcNmlz1o0FgSk4RZey6pFdYUs0Wd6HUSUpbMdpmcUKUFBn6cbI4zMmd4ne3OO19rqjdhHFbfJKVEsQkqVdLULHvMc2cc4TBqTQ+d3FMeJkSpmZwAgwTLxjYmZGg5C3HXpD0nrrqkQSx00To62ZavKHQjHUhIVI2ddeUKkQQHgOm4QhEPyiM9eeqOANOzrqkNIhxjwjgkahEd2JliG3YB1kd2GmJmhikxwURkQxaYlhkKOQLEQqghQiFYhGFEbtBmhrOJ9olSllgtQQ+q9QHmRASoO7Nru2uzF2adLc7L6X8IBzei+0IhUqb7NYZSFFChtBung8dP0fLoIy3bbRZRMFqQKFkzBqUKJXxDJO0J1xp9ATwtCVaxCLY0Z3FMvbPJgu5DLPBnCGo7kc37RWh70UOktAGZoqWpIHtEKmTdpStSiofoShX5YsNNe6qNWJSUy0JAAF1IbZcAaI+OrbZXzHxpI4FLgqXAsrKDJUaomdhiBTHCHhP266yhknA7x/dEqcetQigguvZC9Z7oUZdavSETlHCinhrhihEnp6QxWJ4Rxw3nHiI96QpwPGOCMKa8ITrrlDhl+X6Q1eHP6xxwhEMUIk9YYrCAFEKoauHq+sMVCsciXESxEyoiXCs4HXCIWUkKFCCCDtFRCrhohQn0HaAmdLqHQtAO9Kg/kYouy5Mpa5Cj7h7p+ZJwPnFl2crYrN/wBpHgkCK+0UnoOd4h9jEt4DlE49kcbptG6sxpBTRX2DAQfFSp//2Q==",
    ],
    comments: [
      {
        id: 1,
        comment: "기부신청",
        userId: 123,
        userName: "기부니1",
        userImage: "test.jpg",
        createdDate: "2021-12-14T00:38:39.943698",
        updatedDate: "2021-12-14T00:38:39.943698",
      },
      {
        id: 2,
        comment: "기부신청",
        userId: "abcdef",
        userName: "기부니2",
        userImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/IU_at_%22Persona%22_press_conference%2C_27_March_2019_02.jpg/640px-IU_at_%22Persona%22_press_conference%2C_27_March_2019_02.jpg",
        createdDate: "2021-12-14T00:38:39.943698",
        updatedDate: "2021-12-14T00:38:39.943698",
      },
      {
        id: 3,
        comment: "기부신청",
        userId: 456,
        userName: "기부니3",
        userImage: "test.jpg",
        createdDate: "2021-12-14T00:38:39.943698",
        updatedDate: "2021-12-14T00:38:39.943698",
      },
    ],
  },
};

const MainContainer = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.palette.placeholder.main};
`;

const WriteContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 82px;
`;

const WriteSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 314px;
  height: 50px;
  align-items: center;
  margin-top: 13px;
  margin-bottom: 23px;
  color: ${theme.palette.primary.main};
`;

const TextSliderAvatarContainer = styled.div`
  display: flex;
  width: 185px;
  height: 50px;
`;

const TextSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  font-weight: bold;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const CustomTitle = styled.div`
  width: 320px;
  height: 30px;
  background: ${theme.palette.gray.light};
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 6px 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomContent = styled.div`
  width: 320px;
  height: 126px;
  background: ${theme.palette.gray.light};
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 6px 10px;
`;

const ImageWrapContainer = styled.div`
  margin-top: 9px;
  margin-bottom: 11px;
  margin-left: 26px;
  max-width: 500px;
  white-space: nowrap;
`;

const ScrollWrapContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
`;

const CustomImg = styled.img`
  width: 100px;
  height: 140px;
  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-right: 10px;
`;

const LineBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
`;

const CommentContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 27px;
  padding-bottom: 56px;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-left: 13px;
  width: 140px;
  height: 25px;
`;

const CustomCommentNum = styled.div`
  margin-left: 3px;
  font-size: 12px;
  text-align: center;
`;

const GroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  width: 320px;
`;

const CardContainer = styled.div`
  margin-bottom: 17px;
  padding: 14px 10px;
  background-color: ${theme.palette.gray.light};
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  width: 320px;
`;
const JoinCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 293px;
`;
const Comment = styled.div`
  color: ${theme.palette.placeholder.main};
  margin-left: 38px;
  margin-right: 38px;
`;

const MemberContainer = styled.div`
  display: flex;
`;

const CommnentSubContainer = styled.div`
  margin-top: 17px;
`;

const MemberDeleteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${theme.palette.primary.main};
`;

const MemberName = styled.div`
  font-weight: bold;
  margin-left: 8px;
`;

export default Detail;
