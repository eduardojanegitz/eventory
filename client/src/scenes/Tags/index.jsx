import { Box, Button, InputBase, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import React, { useState } from "react";

const Tags = () => {
  const theme = useTheme();
  const [item, setItem] = useState("");
  const [lista, setLista] = useState([]);

  const adicionarItem = () => {
    if (item.trim() !== "") {
      setLista([...lista, item]);
      setItem("");
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="LEITURA DE ETIQUETAS"
        subtitle="Faça aqui a sua leitura."
      />
      <FlexBetween
        backgroundColor={theme.palette.background.alt}
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
        width="40%"
        mt="2.5rem"
      >
        <InputBase
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Digite o item"
        />
      </FlexBetween>
      <Button
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "12px",
          fontWeight: "bold",
          padding: "5px 10px",
          mt: "0.8rem"
        }}
        onClick={adicionarItem}
      >
        Adicionar
      </Button>
      <ul>
        {lista.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Box>
  );
};

export default Tags;
