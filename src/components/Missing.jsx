import notFound from "../assets/404-status-code.jpg";
import { Box } from "@mui/material";

const Missing = () => {
  return (
    <article>
      {/* <p>Página não encontrada!</p> */}
      <Box>
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          src={notFound}
          alt="Página não encontrada!"
        />
      </Box>
    </article>
  );
};

export default Missing;
