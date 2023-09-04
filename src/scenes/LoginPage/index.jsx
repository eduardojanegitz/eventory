import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
}

export default function LoginFinal() {
    return (
        <CssVarsProvider>
            <main>
                <ModeToggle />
                <Sheet
                    sx={{
                        width: 300,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & bottom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Bem Vindo!</b>
                        </Typography>
                        {/* <Typography level="body-sm">Sign in to continue.</Typography> */}
                    </div>
                    <FormControl>
                        <FormLabel>Usúario</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="email@hotmail.com"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Senha</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Senha"
                        />
                    </FormControl>

                    <Button sx={{ mt: 1 /* margin top */ }}>Acessar</Button>
                </Sheet>
            </main>
        </CssVarsProvider>
    );
}

