import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

//auth
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api2 } from "state/api";
import useAuth from "hooks/useAuth";
import { toast } from "react-toastify";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
}

const LoginPage = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/home";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const showToastError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

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
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.data?.message);
      }
      errRef.current.focus();
    }
  };
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";


  return (
    <CssVarsProvider>
      <main>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <ModeToggle />
        <Sheet
          sx={{
            width: 300,
            mx: "auto", 
            my: 4, 
            py: 3, 
            px: 2, 
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Bem Vindo!</b>
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Usúario</FormLabel>
              <Input
                name="username"
                id="username"
                ref={userRef}
                value={username}
                onChange={handleUserInput}
                autoComplete="off"
                required
                type="text"
                placeholder="Digite aqui o seu usuário..."
              />
            </FormControl>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={handlePwdInput}
                value={password}
                required
                placeholder="Digite aqui a sua senha..."
              />
            </FormControl>

            <Button type="submit" sx={{ mt: 1 }}>
              Acessar
            </Button>
          </form>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default LoginPage;
