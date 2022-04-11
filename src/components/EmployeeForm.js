import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function EmployeeForm() {


    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        address: '',
        phonenumber: '',
        birthdate: '',
        documenttype: '',
        documentnumber: '',

    })

    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                const response = await fetch(`https://advance-server.herokuapp.com/employee/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(employee),
                    headers: { 'Content-Type': 'application/json' },
                });
                await response.json();
            } else {
                const response = await fetch(`https://advance-server.herokuapp.com/employee`, {
                    method: 'POST',
                    body: JSON.stringify(employee),
                    headers: { 'Content-Type': 'application/json' },
                });
                await response.json();
            }
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (params.id) {
            loadEmployee(params.id);
        }
    }, [params.id]);

    const loadEmployee = async (id) => {
        const res = await fetch(`https://advance-server.herokuapp.com/employee/` + id);
        const data = await res.json();
        setEmployee({
            firstname: data.firstname,
            lastname: data.lastname,
            gender: data.gender,
            email: data.email,
            address: data.address,
            phonenumber: data.phonenumber,
            birthdate: data.birthdate,
            documenttype: data.documenttype,
            documentnumber: data.documentnumber,
        });
        setEditing(true);
    };

    return (
        <Grid container direction='column' alignItems='center' justifyContent='center'>
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{
                    backgroundColor: '#1e272e',
                    padding: '1rem',
                    margin: '1rem'
                }}>
                    <Typography variant='h5' textAlign='center' color='white'>
                        Nuevo Empleado
                    </Typography>
                    <CardContent style={{width:'250px'}} >
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='outlined'
                                label='Nombre'
                                required='true'
                                type='text'
                                value={employee.firstname}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                    width: '30rem'
                                }}
                                name='firstname'
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white', width: '14rem' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                variant='outlined'
                                label='Apellido'
                                required='true'
                                type='text'
                                value={employee.lastname}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                    width: '40rem'
                                }}
                                name='lastname'
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white', width: '14rem' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <FormControl >
                                <InputLabel style={{ color: 'white' }}>Género</InputLabel>
                                <Select
                                    variant='outlined'
                                    required='true'
                                    label='Género'
                                    value={employee.gender}
                                    sx={{
                                        display: 'block',
                                        margin: '.5rem 0',
                                        width: '16rem'
                                    }}
                                    name='gender'
                                    onChange={handleChange}
                                    SelectDisplayProps={{ style: { color: 'white' } }}
                                >
                                    <MenuItem value='Hombre'>Hombre</MenuItem>
                                    <MenuItem value='Mujer'>Mujer</MenuItem>
                                    <MenuItem value='Otro'>Otro</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                variant='outlined'
                                label='Email'
                                required='true'
                                type='email'
                                value={employee.email}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                    width: '30rem'
                                }}
                                name='email'
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white', width: '14rem' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                variant='outlined'
                                label='Dirección'
                                type='text'
                                value={employee.address}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                    width: '30rem'
                                }}
                                name='address'
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white', width: '14rem' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                variant='outlined'
                                label='Teléfono'
                                required='true'
                                type='text'
                                value={employee.phonenumber}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                    width: '30rem'
                                }}
                                name='phonenumber'
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white', width: '14rem'  } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                variant='outlined'
                                label='Fecha de nacimiento'
                                type='date'
                                value={employee.birthdate}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                    width: '30rem'
                                }}
                                name='birthdate'
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white', marginTop: '1.5rem', width: '14rem' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <FormControl fullWidth>
                                <InputLabel style={{ color: 'white' }}>Tipo de documento</InputLabel>
                                <Select
                                    variant='outlined'
                                    label='Tipo de documento'
                                    required='true'
                                    value={employee.documenttype}
                                    sx={{
                                        display: 'block',
                                        margin: '.5rem 0',
                                        width: '16rem'
                                    }}
                                    name='documenttype'
                                    onChange={handleChange}
                                    SelectDisplayProps={{ style: { color: 'white' } }}
                                >
                                    <MenuItem value='Cedula'>Cédula</MenuItem>
                                    <MenuItem value='Cedula de extranjeria'>Cédula de extranjeria</MenuItem>
                                    <MenuItem value='Otro'>Otro</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                variant='outlined'
                                label='Número de documento'
                                required='true'
                                type='text'
                                value={employee.documentnumber}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                    width: '30rem'
                                }}
                                name='documentnumber'
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white', width: '14rem' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <Button variant='contained' color='primary' type='submit' style={{ margin: 'auto', marginTop:'2rem', display: 'block' }} >
                                Guardar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
