import PropTypes from "prop-types";

const convertURLtoFile = async (url) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};

export default convertURLtoFile;

convertURLtoFile.propTypes = {
  children: PropTypes.string,
};
