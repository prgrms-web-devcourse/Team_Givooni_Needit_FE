import Input from "./Input";
import styled from "styled-components";

const PhoneContainer = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const PhoneInput = () => {
  return (
    <PhoneContainer>
      <Input
        type="Phone"
        className="phone1"
        placeholder={"010"}
        defaultValue={"010"}
        onKeyUp={(e) =>
          e.target.value.length === 3
            ? document.getElementById("phone2").focus()
            : undefined
        }
        inputProps={{ maxLength: "3" }}
      />
      <Input
        type="Phone"
        id="phone2"
        placeholder={" "}
        inputProps={{ maxLength: "4" }}
        onKeyUp={(e) =>
          e.target.value.length === 4
            ? document.getElementById("phone3").focus()
            : undefined
        }
      />
      <Input
        type="Phone"
        id="phone3"
        placeholder={" "}
        inputProps={{ maxLength: "4" }}
      />
    </PhoneContainer>
  );
};

export default PhoneInput;
