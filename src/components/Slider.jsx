import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
const ToggleContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  width: 72px;
  height: 26px;
  border-radius: 16px;
  background-color: #fd9f28;
  transition: all 0.2 ease-out;
  box-sizing: border-box;
  &:after {
    content: "기부마감";
    position: relative;
    padding: 4px 4px;
    padding-left: 8px;
    box-sizing: border-box;
    left: calc(100% - 60px);
    display: block;
    width: 60px;
    height: 26px;
    font-size: 12px;
    border-radius: 16px;
    color: white;
    background-color: #9e9e9e;
    transition: all 0.2s ease-out;
  }
`;

const ToggleInput = styled.input`
  display: none;
  &:checked + div {
    background: #9e9e9e;
  }
  &:checked + div:after {
    content: "기부진행";
    left: 0;
    background: #fd9f28;
  }
  &:disabled + div {
    opacity: 0.7;
    cursor: not-allowed;
    &:after {
      opacity: 0.7;
    }
  }
`;

const Toggle = ({ id, onChange, disabled, toggle }) => {
  const [checked, setChecked] = useState(toggle);
  const handleChange = () => {
    setChecked((prev) => !prev);
    onChange({
      id,
      toggle: !checked,
    });
  };

  return (
    <ToggleContainer>
      <ToggleInput
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <ToggleSwitch />
    </ToggleContainer>
  );
};

Toggle.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  toggle: PropTypes.bool,
};
export default Toggle;
