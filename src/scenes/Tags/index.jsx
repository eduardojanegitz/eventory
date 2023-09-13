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

const Tags = () => {
  const theme = useTheme();
  const [item, setItem] = useState();
  // const [descricao, setDescricao] = useState("")
  // const [nome, setNome] = useState("")
  // const [localizacao, setLocalizacao] = useState("")
  // const [serial, setSerial] = useState("")
  const [list, setList] = useState([]);

  let itemName = useRef();

  // permission
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    itemName.current.focus();
  }, []);

  // const userId = useSelector((state) => state.global.userId);
  // const itemQ = 12345
  const { data } = useGetItemByTagQuery(item);
  // const { teste, setTeste } = useState(lista[0]);

  // const { location, setLocation } = useState("");
  // const { responsable, setResponsable } = useState("");
  // const teste = (lista[0])

  async function handleSubmit(e) {
    e.preventDefault();
    await axiosPrivate.post("api/inventory", {
      list,
    });
  }
  //   const response = await api2.post("api/invetory", {
  //     location,
  //     responsable,
  //     // teste,
  //     item
  //   });
  // }

  // const columns = [
  //   {
  //     field: "name",
  //     headerName: "Nome do ativo",
  //     flex: 1,
  //   },
  //   {
  //     field: "description",
  //     headerName: "Descrição do item",
  //     flex: 1,
  //   },
  //   {
  //     field: "value",
  //     headerName: "Valor",
  //     flex: 1,
  //   },
  //   {
  //     field: "serialNumber",
  //     headerName: "Número de série",
  //     flex: 1,
  //   },
  //   {
  //     field: "tag",
  //     headerName: "Número de série",
  //     flex: 1,
  //   },
  // ];

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

    // setItem(columns)
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="LEITURA DE ETIQUETAS"
        subtitle="Faça aqui a sua leitura."
      />
      {/* <FlexBetween
        backgroundColor={theme.palette.background.alt}
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
        width="40%"
        mt="2.5rem"
      >
        <InputBase placeholder="Local" />
      </FlexBetween> */}
      {/* 
      <InputBase
        // backgroundColor={theme.palette.background.alt}
        // borderRadius="9px"
        // gap="3rem"
        // p="0.1rem 1.5 rem"
        // width="40%"
        // mt="2.5rem"
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite o item"
      /> */}
      {/* <Input type="text" user={data || {}} placeholder="Digite" disabled /> */}
      {/* <Button
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "12px",
          fontWeight: "bold",
          padding: "5px 10px",
          mt: "0.8rem",
        }}
        onClick={adicionarItem}
      >
        Adicionar
      </Button> */}
      <form onSubmit={handleSubmit} className="form-tag">
        {/* <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Localização"
          className="input-tag"
        />
        <input
          type="text"
          value={responsable}
          onChange={(e) => setResponsable(e.target.value)}
          placeholder="Responsável"
          className="input-tag"
        /> */}
        <input
          type="text"
          value={item}
          ref={itemName}
          onChange={(e) => setItem(e.target.value)}
          className="input-tag"
          placeholder="Digite o item"
        />
        <button className="btn-submit">FINALIZAR</button>
      </form>
      <button onClick={adicionarItem} className="btn-submit">
        ADICIONAR
      </button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Número de serial</TableCell>
              <TableCell align="right">Localização</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((list) => (
              <TableRow
                key={list.serialNumber}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {list.nome}
                </TableCell>
                <TableCell align="right">{list.descricao}</TableCell>
                <TableCell align="right">{list.serial}</TableCell>
                <TableCell align="right">{list.localizacao}</TableCell>
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

      {/* <table >
          <tr className="table-head">
          <th>Nome</th>
          <th>Descrição</th>
          <th>Localização</th>
          <th>Número de série</th>
          </tr> */}
      {/* <tr className="table-line"> */}
      {/* <td>{lista[0]}</td>
            <td>{lista[1]}</td>
            <td>{lista[2]}</td>
            <td>{lista[3]}</td> */}
      {/* </tr> */}

      {/* {lista.map((index, lista) => 
          
          {console.log([lista[0]])}
          
        )} */}
      {/* </table> */}
      {/* </div> */}
      <div>{/* {data && data.description} */}</div>
      {/* <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-FooterContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          // loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={dataQ || []}
          rowsPerOptions={[20, 50, 100]}
          columns={columns}
          // rowCount={(data && data.total) || 0}
          pagination
          // page={page}
          // pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          // onPageChange={(newPage) => setPage(newPage)}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          // components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch },
          // }}
        />
      </Box>
       */}
    </Box>
  );
};

export default Tags;
