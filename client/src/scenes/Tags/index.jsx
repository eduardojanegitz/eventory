import { Box, Button, InputBase, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import Input from "components/Input";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  api2,
  useGetCustomersQuery,
  useGetItemByTagQuery,
  useGetUserQuery,
} from "state/api";

const Tags = () => {
  const theme = useTheme();
  const [item, setItem] = useState("");
  // const userId = useSelector((state) => state.global.userId);
  // const itemQ = 12345
  const { data } = useGetItemByTagQuery(item);
  // const { teste, setTeste } = useState(lista[0]);

  const { location, setLocation } = useState("");
  const { responsable, setResponsable } = useState("");
  const [lista, setLista] = useState([]);
  // const teste = (lista[0])

  async function handleSubmit(e) {
    e.preventDefault();
  }
  //   const response = await api2.post("api/invetory", {
  //     location,
  //     responsable,
  //     // teste,
  //     item
  //   });
  // }

  const columns = [
    {
      field: "name",
      headerName: "Nome do ativo",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição do item",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Valor",
      flex: 1,
    },
    {
      field: "serialNumber",
      headerName: "Número de série",
      flex: 1,
    },
    {
      field: "tag",
      headerName: "Número de série",
      flex: 1,
    },
  ];

  const adicionarItem = () => {
    if (item.trim() !== "") {
      setLista([
        data && data.description,
        data && data.name,
        data && data.location,
        data && data.serialNumber
      ]);
      setItem("");
    }

    // setItem(columns)

    // console.log(data && data.description);
    // console.log([lista]);
    // console.log(setItem(data))
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
        <input
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
        />
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="input-tag"
          placeholder="Digite o item"
        />
        <button onClick={adicionarItem} className="btn-submit">ADICIONAR</button>
      </form>

      <div className="cont">
        <table >
          <tr className="table-head">
          <th>Nome</th>
          <th>Descrição</th>
          <th>Localização</th>
          <th>Número de série</th>
          </tr>
          <tr className="table-line">
            {/* <td>{lista[0]}</td>
            <td>{lista[1]}</td>
            <td>{lista[2]}</td>
            <td>{lista[3]}</td> */}
            {lista.map((list) => <td>{list}</td>)}
          </tr>
       
          {/* {lista.map((index, lista) => 
          
          {console.log([lista[0]])}
          
        )} */}
        </table>
        {/* <button className="btn-submit">FINALIZAR</button> */}
      </div>
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
