import React, { useState } from "react";
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
import { PopupExample } from "components/Popup";

const NewUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [department, setDeparment] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api2.post("api/user", {
      name,
      email,
      pass,
      department,
    });
  }

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="NOVO USUÁRIO"
          subtitle="Faça o cadastro do novo usuário"
        />
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
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Departamento"
          value={department}
          onChange={(e) => setDeparment(e.target.value)}
          className="input"
        />
        {/* <button className="btn-submit">Cadastrar</button> */}
        <PopupExample /> 
      </form>
    </Box>
  );
};

export default NewUser;

// export default function InputWithIcon() {
//   return (
//     <Box sx={{ '& > :not(style)': { m: 1 } }}>
//       <FormControl variant="standard">
//         <InputLabel htmlFor="input-with-icon-adornment">
//           With a start adornment
//         </InputLabel>
//         <Input
//           id="input-with-icon-adornment"
//           startAdornment={
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           }
//         />
//       </FormControl>
//       <TextField
//         id="input-with-icon-textfield"
//         label="TextField"
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
