import { Box } from "@mui/material";
import { BACKEND_URL } from "variable";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${BACKEND_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;