import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Header from "components/Header";
import { api2 } from "state/api";
import { useState } from "react";
import FlexBetween from "components/FlexBetween";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from "hooks/useAxiosPrivate";

const NewMovement = () => {
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  // const [list, setList] = useState("");
  const [list2, setList2] = useState("");
  const [actualLocation, setActualLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [reason, setReason] = useState("");
  const [observations, setObservations] = useState("");
  const [id, setId] = useState("");


  const axiosPrivate = useAxiosPrivate();

  async function handleSubmit(e) {
    e.preventDefault();

      await axiosPrivate.post("api/movement/", {
      id,
      name,
      actualLocation,
      newLocation,
      reason,
      observations,
    });
  }

  const adicionar = async () => {
    const response = await api2.get(`api/item/${item}`)
    setId(response.data._id)
    setActualLocation(
      
        response.data.location
      
    )
    setName(
      response.data.name
    )

  }
  
  const showToastMessage = () => {
    toast.success('Movimentação realizada com sucesso!', {
        position: toast.POSITION.TOP_CENTER
    });
};

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="MOVIMENTAÇÃO"
          subtitle="Faça aqui a movimentação do item"
        />
      </FlexBetween>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nome"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="input"
          onBlur={adicionar}
        />
        <input
          type="text"
          placeholder="Nome"
          value={actualLocation}
          className="input"
          disabled
        />
        <input
          type="text"
          placeholder="Nome"
          value={name}
          className="input"
          disabled
        />
        {/* <button onClick={adicionar}>ola</button> */}
        {/* <input
          type="text"
          placeholder="Localização atual"
          value={actualLocation}
          onChange={(e) => setActualLocation(e.target.value)}
          className="input"
        /> */}
        <input
          type="text"
          placeholder="Nova localização"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Motivo"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Observações"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="input"
        />
        <button onClick={showToastMessage} className="btn-submit">
          <ThumbUpAltIcon />
          CONFIRMAR MOVIMENTAÇÃO
        </button>
      </form>
    </Box>

    
  );
};

export default NewMovement;
// export default function AssetMovement() {
//   return (
//     <Box sx={{ '& > :not(style)': { m: 1 } }}>
//       <TextField
//         id="input-with-icon-textfield"
//         label="Nome do ativo"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <TextField
//         id="input-with-icon-textfield"
//         label="Data da movimentação"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <TextField
//         id="input-with-icon-textfield"
//         label="Localização atual"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <TextField
//         id="input-with-icon-textfield"
//         label="Nova localização"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <TextField
//         id="input-with-icon-textfield"
//         label="Motivo"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <TextField
//         id="input-with-icon-textfield"
//         label="Observações"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <TextField
//         id="input-with-icon-textfield"
//         label="Responsável"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//         <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//         <TextField id="input-with-sx" label="With sx" variant="standard" />
//       </Box>
//     </Box>
//   );
// }
