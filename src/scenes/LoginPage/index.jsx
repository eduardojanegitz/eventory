import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

//auth
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "state/auth/authSlice";
import { useLoginMutation } from "state/auth/authApiSlice";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
}

const LoginFinal = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
        if (!error.status) {
            setErrMsg('No Server Response');
        } else if (error.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (error.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg(error.data?.message);
        }
        errRef.current.focus();
    }
  };
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Carregando...</p>;
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
            mx: "auto", // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
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
            {/* <Typography level="body-sm">Sign in to continue.</Typography> */}
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

export default LoginFinal;
