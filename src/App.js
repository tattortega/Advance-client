import {BrowserRouter, Routes, Route} from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Menu from './components/NavBar';
import {Container} from '@mui/material';

export default function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Container>
        <Routes>
            <Route path='/' element={<EmployeeList />} />
            <Route path='/employee/new' element={<EmployeeForm />} />
            <Route path='/employee/:id' element={<EmployeeForm />} />
          </Routes>
      </Container>
    </BrowserRouter>
  )
}