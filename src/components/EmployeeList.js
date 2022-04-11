import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

export default function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const loadEmployees = async () => {
        const response = await fetch(`http://localhost:4000/employees`)
        const data = await response.json()
        setEmployees(data)
    }

    const handleDelete = async (id) => {
        var isDelete = window.confirm("¿Esta seguro(a) de eliminar a este usuario?");
        if (isDelete) {
            try {
                await fetch(`http://localhost:4000/employee/${id}`, {
                    method: "DELETE",
                });
                setEmployees(employees.filter((employee) => employee.employeeid !== id));
            } catch (error) {
                console.error(error);
            }
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        loadEmployees()
    }, [])
    return (
        <TableContainer style={{
            border: 'solid #1e272e',
            padding: '1rem',
            margin: '1rem',
            textAlign: 'center'
        }}
        >
            <Table sx={{ minWidth: '650' }} aria-label="simple table" >
                <TableHead st>
                    <TableRow>
                        <TableCell style={{ color: 'white' }}>DOCUMENTO</TableCell>
                        <TableCell style={{ color: 'white' }}>NOMBRE</TableCell>
                        <TableCell style={{ color: 'white' }}>APELLIDO</TableCell>
                        <TableCell style={{ color: 'white' }}>TELEFONO</TableCell>
                        <TableCell style={{ color: 'white' }}></TableCell>
                        <TableCell style={{ color: 'white' }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map(emp => (
                        <TableRow key={emp.employeeid}>
                            <TableCell style={{ color: 'white' }}>{emp.documentnumber}</TableCell>
                            <TableCell style={{ color: 'white' }}>{emp.firstname}</TableCell>
                            <TableCell style={{ color: 'white' }}>{emp.lastname}</TableCell>
                            <TableCell style={{ color: 'white' }}>{emp.phonenumber}</TableCell>
                            <TableCell style={{ width: '0', color: 'white' }}>
                                <Button variant="outlined" style={{
                                    marginRight: '1rem',
                                    marginBottom: '1rem',
                                    backgroundColor: 'yellow',
                                    color: 'black'
                                }} onClick={() => navigate(`/employee/${emp.employeeid}`)}>Editar</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" style={{
                                    marginBottom: '1rem',
                                    backgroundColor: 'red',
                                    color: 'black'
                                }} onClick={() => handleDelete(emp.employeeid)}>Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
