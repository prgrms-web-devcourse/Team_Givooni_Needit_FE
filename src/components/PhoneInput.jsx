import Input from "./Input";
import styled from "styled-components";

const PhoneContainer = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const PhoneInput = () => {
  return (
    <PhoneContainer>
      <Input type="Phone" placeholder={"010"}></Input>
      <Input type="Phone" placeholder={" "}></Input>
      <Input type="Phone" placeholder={" "}></Input>
    </PhoneContainer>
  );
};

export default PhoneInput;
