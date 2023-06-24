import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { api2 } from "state/api";
import { useState } from "react";
import { PopupExample } from "components/Popup";

const NewItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [tag, setTag] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api2.post("api/item", {
      name,
      description,
      value,
      location,
      supplier,
      serialNumber,
      tag,
    });
    setName("");
    setDescription("");
    setValue("");
    setLocation("");
    setSupplier("");
    setSerialNumber("");
    setTag("");
  }

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="NOVO ITEM" subtitle="Faça o cadastro do novo item" />
      </FlexBetween>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Fornecedor"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Número de série"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Número da tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="input"
        />
        <PopupExample />
      </form>
    </Box>
  );
};

export default NewItem;
// // export default function InputWithIcon() {
// //   return (
// //     <Box sx={{ '& > :not(style)': { m: 1 } }}>
// //       <FormControl variant="standard">
// //         <InputLabel htmlFor="input-with-icon-adornment">
// //           Nome
// //         </InputLabel>
// //         <InputLabel htmlFor="input-with-icon-adornment">
// //           Localização
// //         </InputLabel>
// //         <Input
// //           id="input-with-icon-adornment"
// //           startAdornment={
// //             <InputAdornment position="start">
// //               <AccountCircle />
// //             </InputAdornment>
// //           }
// //         />
// //       </FormControl>
// //       <TextField
// //         id="input-with-icon-textfield"
// //         label="Nome"
// //         InputProps={{
// //           startAdornment: (
// //             <InputAdornment position="start">
// //               <AccountCircle />
// //             </InputAdornment>
// //           ),
// //         }}
// //         variant="standard"
// //       />
// //       <TextField
// //         id="input-with-icon-textfield"
// //         label="Lozalização"
// //         InputProps={{
// //           startAdornment: (
// //             <InputAdornment position="start">
// //               <AccountCircle />
// //             </InputAdornment>
// //           ),
// //         }}
// //         variant="standard"
// //       />
// //       <TextField
// //         id="input-with-icon-textfield"
// //         label="Grupo do item"
// //         InputProps={{
// //           startAdornment: (
// //             <InputAdornment position="start">
// //               <AccountCircle />
// //             </InputAdornment>
// //           ),
// //         }}
// //         variant="standard"
// //       />
// //       <TextField
// //         id="input-with-icon-textfield"
// //         label="Data de aquisição"
// //         InputProps={{
// //           startAdornment: (
// //             <InputAdornment position="start">
// //               <AccountCircle />
// //             </InputAdornment>
// //           ),
// //         }}
// //         variant="standard"
// //       />
// //       <TextField
// //         id="input-with-icon-textfield"
// //         label="Fornecedor"
// //         InputProps={{
// //           startAdornment: (
// //             <InputAdornment position="start">
// //               <AccountCircle />
// //             </InputAdornment>
// //           ),
// //         }}
// //         variant="standard"
// //       />
// //       <TextField
// //         id="input-with-icon-textfield"
// //         label="botao de upload documentos relacionados"
// //         InputProps={{
// //           startAdornment: (
// //             <InputAdornment position="start">
// //               <AccountCircle />
// //             </InputAdornment>
// //           ),
// //         }}
// //         variant="standard"
// //       />
// //       <TextField
// //         id="input-with-icon-textfield"
// //         label="Número de série"
// //         InputProps={{
// //           startAdornment: (
// //             <InputAdornment position="start">
// //               <AccountCircle />
// //             </InputAdornment>
// //           ),
// //         }}
// //         variant="standard"
// //       />
// //       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
// //         <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
// //         <TextField id="input-with-sx" label="With sx" variant="standard" />
// //       </Box>
// //     </Box>
// //   );
// }
