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
      <BaseButton height="24px" width="3rem" text="태그" tag="primary" />
      {tag.map((tag, idx) => (
        <BaseButton
          key={idx}
          height="24px"
          width={`${tag.length + 2}rem`}
          text={tag}
          onClick={onFilter}
          btnType={filter.includes(tag) ? null : "gray_dark"}
          style={{ margin: "0 2px 8px 2px" }}
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
  border-bottom: 1px solid ${theme.palette.gray.main};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
