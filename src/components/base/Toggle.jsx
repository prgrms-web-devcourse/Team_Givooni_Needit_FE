import { Chip } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";
const Tag = styled(Chip)`
  background-color: ${(props) => !props.checked && "#9e9e9e"};
  color: white;
`;
function Toggle({ id, text, toggleOn = false, onChange }) {
  const [checked, setChecked] = useState(toggleOn);
  const onClick = () => {
    try {
      onChange({
        id,
        text,
        toggle: !checked,
      });
      setChecked((prev) => !prev);
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <Tag label="태그" color="primary" checked={checked} onClick={onClick} />
  );
}
Toggle.propTypes = {
  id: PropTypes.string,
  text: PropTypes.text,
  toggleOn: PropTypes.bool,
  onChange: PropTypes.func,
};
Toggle;
export default Toggle;
