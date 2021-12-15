import PropTypes from "prop-types";
import BaseButton from "@/components/base/BaseButton";
import styled from "styled-components";
import { useState } from "react";
import theme from "@/styles/theme";

const TagFilter = ({
  tag = [
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
  ],
}) => {
  const [filter, setfilter] = useState([]);
  const onFilter = (e) => {
    const tagname = e.target.innerText;
    filter.includes(tagname)
      ? setfilter(filter.filter((value) => value !== tagname))
      : setfilter([...filter, tagname]);
  };

  console.log(filter);

  return (
    <TagContainer>
      <BaseButton
        height="20px"
        width="3rem"
        text="태그"
        tag="primary"
        typography="body2"
        fontSize="14px"
      />
      {tag.map((tag, idx) => (
        <BaseButton
          key={idx}
          height="20px"
          width={`${tag.length + 2}rem`}
          typography="body2"
          fontSize="14px"
          text={tag}
          onClick={onFilter}
          btnType={filter.includes(tag) ? null : "gray"}
        />
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
  gap: 4px;
  padding: 8px 4px;
  border-bottom: 1px solid ${theme.palette.gray.main};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
