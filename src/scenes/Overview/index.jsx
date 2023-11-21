import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import PieChart from "components/PieChart";

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="ITENS POR GRUPO DE ITENS"
        subtitle="Veja o gráfico dos itens por grupo de itens."
      />
      <Box mt="40px" height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
