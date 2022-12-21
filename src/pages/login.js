import { TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addLoginData } from '../redux/actions'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [values, setValues] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleClick = () => {
        localStorage.setItem('userData', JSON.stringify(values))
        dispatch(addLoginData(values))
        navigate('/')
    }


    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100vh' bgcolor='grey'>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='300px' width='400px' bgcolor='white' >
                <TextField sx={{ mb: '20px' }} name='username' label='User Name' value={values.username} onChange={handleChange} />
                <TextField value={values.password} name='password' label='Password' onChange={handleChange} />
                <Button onClick={handleClick} sx={{ mt: '20px' }} variant='contained' >Login</Button>
            </Box>
        </Box>
    )
}
