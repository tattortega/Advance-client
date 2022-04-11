import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar>
                        <Typography variant='h6' sx={{ flexGrow: 1 }}>
                            <Button variant= 'contained' color= 'success' onClick={() => navigate('/')}>Empleados</Button>
                        </Typography>

                        <Button variant='contained' color='primary' onClick={() => navigate('/employee/new')}>
                            Crear Empleado
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}
