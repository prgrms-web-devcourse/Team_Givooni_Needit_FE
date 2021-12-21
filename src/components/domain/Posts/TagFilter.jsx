import PropTypes from "prop-types";
import BaseButton from "@/components/base/BaseButton";
import styled from "styled-components";
import theme from "@/styles/theme";
import Toggle from "@/components/base/Toggle";

const TagFilter = () => {
  const tag = [
    "아동·청소년",
    "어르신",
    "장애인",
    "다문화",
    "지구촌",
    "가족·여성",
    "시민사회",
    "동물",
    "환경",
    "기타",
  ];

  return (
    <TagContainer>
      <BaseButton
        height="20px"
        width="3rem"
        text="태그"
        tag="white"
        typography="body2"
        fontSize="14px"
      />
      {tag.map((tag, idx) => (
        <Toggle key={idx} id={idx + 1} text={tag} />
      ))}
    </TagContainer>
  );
};

export default TagFilter;

TagFilter.propTypes = {
  tag: PropTypes.array,
};

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-bottom: 1px solid ${theme.palette.gray.main};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
