import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import theme from "@/styles/theme";
import { format } from "date-fns";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Palette as PaletteIcon,
  CardGiftcard as CardGiftcardIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import BaseButton from "@/components/base/BaseButton";
import PropTypes from "prop-types";
const PostCard = ({ DUMMY }) => {
  return (
    <div style={{ width: "100%" }} component={Link} to={`/`}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "12px",
          backgroundColor: theme.palette.gray.light,
          border: `solid 1px ${theme.palette.gray.main}`,
          borderRadius: "8px",
        }}
      >
        <Link
          to={`/center/${DUMMY.data.id}`}
          style={{ textDecoration: "none" }}
        >
          <CardMainContainer>
            <Box sx={{ width: "100%" }}>
              <CardHeader>
                <CardHeaderInfo
                  sx={{ display: "flex", alignContent: "center" }}
                >
                  <Box sx={{ display: "flex", gap: "6px" }}>
                    <BaseButton
                      tag={
                        DUMMY.data.status === "기부진행"
                          ? "primary"
                          : "gray_dark"
                      }
                      width="auto"
                      height="22px"
                      text={DUMMY.data.status}
                      typography="body2"
                    />
                    {DUMMY.data.category === "재능기부" ? (
                      <PaletteIcon color="primary" fontSize="small" />
                    ) : (
                      <CardGiftcardIcon color="primary" fontSize="small" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    <CalendarTodayIcon
                      color="primary"
                      sx={{ mr: "2px", fontSize: "" }}
                    />
                    {format(new Date(DUMMY.data.createdDate), "MM.dd")}
                  </Typography>
                </CardHeaderInfo>
              </CardHeader>

              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ my: "4px" }}
                >
                  {DUMMY.data.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    width: "100%",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    fontWeight: 300,
                  }}
                >
                  {DUMMY.data.content}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{ my: "6px" }}
                >
                  {DUMMY.data.member}
                </Typography>
                {Math.floor(Math.random()) * 2 ? (
                  <FavoriteIcon
                    sx={{ ml: "4px" }}
                    color="like"
                    fontSize="small"
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{ ml: "4px" }}
                    color="like"
                    fontSize="small"
                  />
                )}
              </Box>
            </Box>
          </CardMainContainer>
        </Link>
        <Box
          sx={{
            borderTop: `solid 1px ${theme.palette.gray.main}`,
            ml: "-12px",
            width: "calc(100% + 24px)",
          }}
        >
          <CardFooterContainer>
            <Box display="flex" marginRight="auto">
              <LocationOnIcon
                fontSize="small"
                sx={{
                  color: "text.secondary",
                  mt: "-4px",
                }}
              />
              <Typography
                color="text.secondary"
                typography="body2"
                fontWeight={300}
              >
                {"서울특별시 강남구"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "4px",
              }}
            >
              {DUMMY.data.tags.map((tag, index) => (
                <Typography
                  key={index}
                  color="text.secondary"
                  typography="body2"
                  fontWeight={300}
                >
                  #{tag}
                </Typography>
              ))}
            </Box>
          </CardFooterContainer>
        </Box>
      </Box>
    </div>
  );
};

export default PostCard;

PostCard.propTypes = {
  DUMMY: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

const CardMainContainer = styled.div`
  display: flex;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardHeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardFooterContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  padding: 12px 12px 0 12px;
`;
