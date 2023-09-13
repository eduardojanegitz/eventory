import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { api2, useGetCustomersQuery, useGetUserQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PopupExample } from "components/Popup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUserQuery();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDeparment] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api2.post("api/user", {
      username,
      name,
      email,
      password,
      department,
    });
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const columns = [
    {
      field: "username",
      headerName: "Nome de usuário",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 0.5,
    },
    {
      field: "department",
      headerName: "Departamento",
      flex: 1,
    },
    {
      field: "Ação",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              // onClick={(event) => {
              //   handleClick(event, cellValues)
              // }}
              sx={{ marginRight: "5px" }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              // onClick={(event) => {
              //   handleClick(event, cellValues)
              // }}
            >
              Apagar
            </Button>
          </>
        );
      },
    },

    // {
    //     field: "phoneNumber",
    //     headerName: "Número de telefone",
    //     flex: 0.5,
    //     renderCell: (params) => {
    //         return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //     }
    //   },
    //   {
    //     field: "country",
    //     headerName: "País",
    //     flex: 0.4,
    //   },
    // {
    //   field: "occupation",
    //   headerName: "Occupation",
    //   flex: 1,
    // },
    // {
    //   field: "role",
    //   headerName: "Role",
    //   flex: 0.5,
    // },
  ];

  const showToastMessage = () => {
    toast.success("Usuário cadastrado com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="USUÁRIOS" subtitle="Lista de usuários" />
        <Box>
          {/* <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Link to="/novo-usuario/" className="btn-new"> 
              <PersonAddOutlinedIcon sx={{ mr: "10px" }} />
              Novo usuário
            </Link>
          </Button> */}

          {// CRIAR UM COMPONENTE PARA ISSO
          }
          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            NOVO USUÁRIO
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Cadastro de novo usuário
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit} className="form">
                  <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="Departamento"
                    value={department}
                    onChange={(e) => setDeparment(e.target.value)}
                    className="input"
                  />
                  <button onClick={showToastMessage} className="btn-submit">
                    Cadastrar
                  </button>
                  {/* <PopupExample />  */}
                </form>
              </Typography>
            </Box>
          </Modal>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
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
          isLoading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
