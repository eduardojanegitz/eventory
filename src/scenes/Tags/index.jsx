import { Box, Button, InputBase, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import Input from "components/Input";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  api2,
  useGetCustomersQuery,
  useGetItemByTagQuery,
  useGetUserQuery,
} from "state/api";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const StyledTableContainer = styled(TableContainer) `
  overflow-x: 'auto';

  @media (max-width: 600px) {
    max-width: 100%;
  }
`
const Tags = () => {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [backEnd, setBackEnd] = useState([]);

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

  const showToastMessage = () => {
    toast.success("Inventário realizado com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastError = () => {
    toast.error("Inventário divergente!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastError2 = () => {
    toast.error("Os itens não podem inventariado duas vezes!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const hasDuplicates = list.some(
      (item, index) =>
        list.findIndex(
          (otherItem, otherIndex) =>
            index !== otherIndex &&
            item.nome === otherItem.nome &&
            item.descricao === otherItem.descricao &&
            item.localizacao === otherItem.localizacao &&
            item.serial === otherItem.serial
        ) !== -1
    );

    if (hasDuplicates) {
      showToastError2();
    } else {
      const divergences = [];

      list.forEach((listItem) => {
        const isMatch = backEnd.some(
          (backendItem) =>
            backendItem.name === listItem.nome &&
            backendItem.description === listItem.descricao &&
            backendItem.location === listItem.localizacao &&
            backendItem.serialNumber === listItem.serial
        );

        if (!isMatch) {
          divergences.push(listItem);
        }
      });

      if (divergences.length === 0 && list.length === backEnd.length) {
        await axiosPrivate.post("api/inventory", {
          list,
          location: locationValue
        });
        showToastMessage();
      } else {
        await axiosPrivate.post("api/divergences", {
          divergences,
          location: locationValue
        });

        showToastError();
      }
    }
  }

  const addItem = async () => {
    if (itemName.current.value === "") {
      window.alert("Preencha o item");
    } else {
      try {
        const response = await api2.get(`api/inventory/item/${item}`);
        const newItem = response.data;
        setList((prevList) => [
          ...prevList,
          {
            descricao: newItem.description,
            nome: newItem.name,
            localizacao: newItem.location,
            serial: newItem.serialNumber,
            tag: newItem.tag,
          },
        ]);
        setItem("");
        itemName.current.focus();
      } catch (error) {
        console.error("Erro ao buscar informações do item: ", error);
      }
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="LEITURA DE TAGS"
        subtitle={`Localização: ${locationValue}`}
      />

      <form onSubmit={handleSubmit} className="form-tag">
        <Input
          type="text"
          value={item}
          refInput={itemName}
          onChange={(e) => setItem(e.target.value)}
          label="Digite o item"
        />
        <Button
          sx={{ mr: "5px" }}
          variant="contained"
          color="secondary"
          onClick={addItem}
        >
          ADICIONAR
        </Button>
        <Button type="submit" color="error" variant="contained">
          FINALIZAR
        </Button>
      </form>

      <StyledTableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Série</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((listItem, index) => (
              <TableRow
                key={index}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {listItem.nome}
                </TableCell>
                <TableCell align="right">{listItem.descricao}</TableCell>
                <TableCell align="right">{listItem.serial}</TableCell>
                <TableCell align="right">{listItem.tag}</TableCell>
                <TableCell align="right">
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default Tags;
