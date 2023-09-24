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

const Tags = () => {
  const [item, setItem] = useState();
  const [list, setList] = useState([]);
  const [backEnd, setBackEnd] = useState([]);
  const [showError, setShowError] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationValue = searchParams.get("location");

  let itemName = useRef();

  // permission
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    itemName.current.focus();
  }, []);

  useEffect(() => {
    api2
      .get(`api/tag/${locationValue}`)
      .then((response) => setBackEnd(response.data));
  }, []);

  const { data } = useGetItemByTagQuery(item);

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

      if (divergences.length == 0 && list.length === backEnd.length) {
        await axiosPrivate.post("api/inventory", {
          list,
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

  const adicionarItem = () => {
    if (itemName.current.value === "") {
      window.alert("Preencha o item");
    } else {
      setList([
        ...list,

        {
          descricao: data.description,
          nome: data.name,
          localizacao: data.location,
          serial: data.serialNumber,
        },
      ]);
      setItem("");
      itemName.current.focus();
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="LEITURA DE ETIQUETAS"
        subtitle={`Faça aqui a sua leitura. Localização: ${locationValue}`}
      />

      <form onSubmit={handleSubmit} className="form-tag">
        <input
          type="text"
          value={item}
          ref={itemName}
          onChange={(e) => setItem(e.target.value)}
          className="input-tag"
          placeholder="Digite o item"
        />
        <Button
          sx={{ mr: "5px" }}
          variant="contained"
          color="secondary"
          onClick={adicionarItem}
        >
          ADICIONAR
        </Button>
        <Button type="submit" color="error" variant="contained">
          FINALIZAR
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Número de serial</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((list) => (
              <TableRow
                key={list.serialNumber}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {list.nome}
                </TableCell>
                <TableCell align="right">{list.descricao}</TableCell>
                <TableCell align="right">{list.serial}</TableCell>
                <TableCell align="right">
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tags;
