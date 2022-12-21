import { ArrowDownward, ArrowUpward, Search } from '@mui/icons-material'
import { Box, Button, TextField, Dialog, DialogContent, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addLoginData, addMovieData } from '../redux/actions'
import Movies from './movies'

export default function Index() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loginData, movieData } = useSelector((state) => state)
    const [values, setValues] = useState({ id: movieData?.length + 1 || 0, name: '', description: '', videoSrc: '', imageSrc: '' })
    const [open, setOpen] = useState(false)
    const [searchVal, setSearchVal] = useState([])
    const [sortVal, setSortVal] = useState([])
    const [searchText, setSearchText] = useState('')
    const [isSort, setIsSort] = useState(false)
    const [eventVal, setEventVal] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleClick = () => {
        let data = [...movieData, values]
        dispatch(addMovieData(data))
        setOpen(false)
    }

    const logoutFunction = () => {
        localStorage.removeItem('userData')
        dispatch(addLoginData({}))
    }

    const sortFunction = () => {
        setIsSort(!isSort)
        const val = movieData.sort((a, b) => {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (isSort) {
                if (x < y) { return -1; }
                if (x > y) { return 1; }
            }
            else {
                if (x > y) { return -1; }
                if (x < y) { return 1; }
            }
            return 0

        })
        setSortVal(val)
    }

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    const handleSearch = (e) => {
        let val = e?.target?.value || ''
        setSearchText(val);
        setEventVal(e);
        const searchRegex = new RegExp(escapeRegExp(val), 'i');
        const filteredRows = movieData.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field]);
            });
        });

        setSearchVal(filteredRows);
    }

    useEffect(() => {
        handleSearch(eventVal);
    }, [movieData])


    return (
        <>
            <Box bgcolor='grey'>
                <Box bgcolor='blue' height='90px'>
                    <Box sx={{ float: 'left', ml: '30px' }}>
                        <h1 style={{ color: 'white' }} >Movie App</h1>
                    </Box>
                    {Object.keys(loginData).length ?
                        <Button variant='contained' sx={{ float: 'right', m: '30px 20px 0 0' }} onClick={logoutFunction}>Logout</Button> :
                        <Button variant='contained' sx={{ float: 'right', m: '30px 20px 0 0' }} onClick={() => navigate('/login')}>Login</Button>
                    }
                    <TextField
                        sx={{
                            width: '50%', m: '20px', float: 'right', '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white'
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        placeholder='Search'
                        fullWidth
                        value={searchText}
                        onChange={handleSearch}
                    />

                </Box>
                <Dialog
                    fullWidth
                    maxWidth='sm'
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent >
                        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' bgcolor='white' >
                            <TextField sx={{ mb: '10px', mt: '10px' }} label='Name' name='name' value={values.username} onChange={handleChange} />
                            <TextField sx={{ mb: '10px' }} value={values.password} name='description' label='description' onChange={handleChange} />
                            <TextField sx={{ mb: '10px' }} value={values.password} name='videoSrc' label='Video link' onChange={handleChange} />
                            <TextField sx={{ mb: '10px' }} value={values.password} name='imageSrc' label='Image link' onChange={handleChange} />
                            <Button onClick={handleClick} variant='contained'>Create</Button>
                        </Box>
                    </DialogContent>
                </Dialog>
                <Box sx={{ float: 'right' }} mt='-10px' height='100%' width='100%'>
                    <Box m='20px' sx={{ float: 'right' }}>
                        <Button onClick={sortFunction} variant='contained' endIcon={isSort ? <ArrowDownward /> : <ArrowUpward />}>Sort </Button>
                    </Box>
                    {Boolean(Object.keys(loginData).length) &&
                        <Box m='20px 0px 20px 0' sx={{ float: 'right' }}>
                            <Button onClick={() => setOpen(true)} variant='contained'> Add Movie </Button>
                        </Box>}
                    <Box p='50px' bgcolor='grey'>
                        <Movies searchVal={searchVal} searchText={searchText} sortVal={sortVal} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
