import Typography from "@mui/joy/Typography";
import image from "../../assets/imagem-fundo-login.png";
import Input from "components/Input";
import { Button, Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api2 } from "state/api";
import useAuth from "hooks/useAuth";
import { toast } from "react-toastify";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";

const LoginPage = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/home";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showToastError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api2.post(
        "api/auth/login",
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, password, roles, accessToken });

      setUsername("");
      setPassword("");
      // navigate(from, { replace: true });
      if (roles.includes("Admin") || roles.includes("Manager")) {
        navigate("/dashboard");
      } else if (roles.includes("Employee")) {
        navigate("/inventarios");
      }
    } catch (error) {
      if (error.response.status === 400) {
        {
          showToastError(
            error.response.data.message || "Usuário e senha são obrigatórios!"
          );
        }
      } else if (error.response.status === 401) {
        showToastError(
          error.response.data.message || "Usuário ou senha incorretos!"
        );
      } else {
        showToastError("Erro interno no servidor");
      }
    }
  };
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  return (
    <Box>
      <FlexBetween>
        <Box
          component="img"
          alt="profile"
          src={image}
          sx={{
            height: "65vh",
            "@media (max-width: 768px)" : {
              display: "none"
            }
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "95vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            "@media (max-width: 768px)" : {
              p: "16px"
            }
          }}
        >
          <Typography>
            <Header
              title="Bem-vindo ao EVENTORY."
              subtitle="Insira as credenciais para continuar"
            />
          </Typography>
          <form onSubmit={handleSubmit}>
            <Input
              id="username"
              // ref={userRef}
              value={username}
              onChange={handleUserInput}
              required
              type="text"
              label="Usuário"
            />
            <Input
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
              label="Senha"
            />

            <Button variant="contained" color="secondary" type="submit">
              Acessar
            </Button>
          </form>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default LoginPage;
