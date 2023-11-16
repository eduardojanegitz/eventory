import { Box, Button } from "@mui/material";
import Header from "components/Header";
import Input from "components/Input";
import React, { useEffect, useState, useRef } from "react";
import { api2 } from "state/api";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const StyledTableContainer = styled(TableContainer)`
  overflow-x: "auto";

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;
const Tags = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [backEnd, setBackEnd] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationValue = searchParams.get("location");

  let itemName = useRef();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    itemName.current.focus();
  }, []);

  useEffect(() => {
    api2
      .get(`api/inventory/location/${locationValue}`)
      .then((response) => setBackEnd(response.data));
  }, []);

  const showToastSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastWarning = (message) => {
    toast.warning(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const hasDuplicates = checkForDuplicates(list);
      const divergences = findDivergences(list, backEnd);

      if (hasDuplicates) {
        showToastError(
          "O item não pode ser lido mais de uma vez no mesmo inventário!"
        );
      } else if (divergences.length === 0 && list.length === backEnd.length) {
        await handleInventorySubmit(list, locationValue);
      } else {
        await handleDivergences(divergences, locationValue);
      }
    } catch (error) {
      handleError(error);
    }
  }

  function checkForDuplicates(list) {
    return list.some(
      (item, index) =>
        list.findIndex(
          (otherItem, otherIndex) =>
            index !== otherIndex && item.tag === otherItem.tag
        ) !== -1
    );
  }

  function findDivergences(list, backEnd) {
    const divergences = [];

    list.forEach((listItem) => {
      const isMatch = backEnd.some(
        (backendItem) =>
          backEnd.length === list.length &&
          backendItem.name === listItem.nome &&
          backendItem.description === listItem.descricao &&
          backendItem.location === listItem.localizacao &&
          backendItem.serialNumber === listItem.serial &&
          backendItem.tag === listItem.tag
      );

      if (!isMatch) {
        divergences.push(listItem);
      }
    });

    return divergences;
  }

  async function handleInventorySubmit(list, locationValue) {
    const response = await axiosPrivate.post("api/inventory", {
      list,
      location: locationValue,
    });
    showToastSuccess(response.data.msg || "Inventário realizado com sucesso!");
  }

  async function handleDivergences(divergences, locationValue) {
    const response = await axiosPrivate.post("api/divergences", {
      divergences,
      location: locationValue,
    });

    showToastError(response.data.msg || "Inventário divergente!");
  }

  function handleError(error) {
    if (error.response.status === 401) {
      showToastError("Acesso expirado. Faça o login novamente.");
      navigate("/");
    } else {
      showToastError(
        error.response?.data?.error ||
          "Erro desconhecido. Entre em contato com o time de TI."
      );
    }
  }

  const addItem = async () => {
    if (itemName.current.value === "") {
      showToastWarning("Preencha o item");
    } else {
      try {
        const response = await api2.get(`api/inventory/item/${item}`);
        const newItem = response.data;
        const itemId = Date.now();

        if (newItem === null) {
          showToastError(
            "Nenhum item encontrado com esse número de patrimônio."
          );
        } else {
          setList((prevList) => [
            ...prevList,
            {
              id: itemId,
              descricao: newItem.description,
              nome: newItem.name,
              localizacao: newItem.location,
              serial: newItem.serialNumber,
              tag: newItem.tag,
            },
          ]);
          setItem("");
          itemName.current.focus();
          if (!isTableVisible) {
            setIsTableVisible(true);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar informações do item: ", error);
      }
    }
  };

  const removeItem = (itemId) => {
    setList((prevList) => prevList.filter((item) => item.id !== itemId));
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="LEITURA DE PATRIMÔNIO"
        subtitle={`Localização: ${locationValue}`}
      />
      <Box sx={{ mt: "25px" }}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={item}
            refInput={itemName}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
            label="Faça aqui a leitura do patrimônio..."
          />
          <Box sx={{ mb: "15px" }}>
          <Button
            sx={{ mr: "5px" }}
            variant="contained"
            color="secondary"
            endIcon={<PlaylistAddIcon />}
            onClick={addItem}
          >
              ADICIONAR
            </Button>
            <Button
              type="submit"
              color="error"
              endIcon={<PlaylistAddCheckIcon />}
              variant="contained"
            >
              FINALIZAR
            </Button>
          </Box>
        </form>
      </Box>
      {isTableVisible && (
        <StyledTableContainer component={Paper}>
          <Table
            aria-label="simple table"
            sx={{
              backgroundColor: theme.palette.background.alt,
              border: "none",
              [`& .${tableCellClasses.root}`]: {
                border: "none",
              },
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.secondary[100],
                }}
              >
                <TableCell
                  sx={{
                    color: theme.palette.background.alt,
                    fontWeight: "bold",
                  }}
                >
                  Item
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.background.alt,
                    fontWeight: "bold",
                  }}
                >
                  Descrição
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.background.alt,
                    fontWeight: "bold",
                  }}
                >
                  Nº de série
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.background.alt,
                    fontWeight: "bold",
                  }}
                >
                  Patrimônio
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.background.alt,
                    fontWeight: "bold",
                  }}
                >
                  Ação
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((listItem, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {listItem.nome}
                  </TableCell>
                  <TableCell>{listItem.descricao}</TableCell>
                  <TableCell>{listItem.serial}</TableCell>
                  <TableCell>{listItem.tag}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete">
                      <DeleteIcon
                        color="error"
                        onClick={() => removeItem(listItem.id)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    </Box>
  );
};

export default Tags;
