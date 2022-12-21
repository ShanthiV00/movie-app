import React, { useState } from 'react'
import { Box, Typography, Card, Grid, Dialog, DialogContent, Button, TextField, } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieData } from '../../redux/actions';

export default function Index({ searchVal, searchText, sortVal }) {
    const { loginData, movieData } = useSelector((state) => state)
    const dispatch = useDispatch()

    const [values, setValues] = useState({id:'', name: '', description: '', videoSrc: '', imageSrc: '' })
    const [open, setOpen] = useState(false)
    const [editIndex, setEditIndex] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = () => {
        const data = [...movieData]
        let findInd = data.findIndex(d => d.id === values.id)
        data[findInd] = values
        dispatch(addMovieData(data))
        setOpen(false);
    }

    const handleDelete = (i) => {
        const data = [...movieData]
        data.splice(i, 1)
        dispatch(addMovieData(data))

    }

    const handleEdit = (d, i) => {
        setOpen(true);
        setEditIndex(i)
        setValues(d)
    }

    const cardData = searchText ? searchVal : sortVal?.length ? sortVal : movieData

    return (
        <>
            <Grid container spacing={3}>
                {cardData.map((d, i) => {
                    return <Grid item key={i} xs={4}>
                        <Card >
                            <Box mt='0px'>
                                <video width="100%" height="230" controls poster={d.imageSrc}>
                                    <source src={d.videoSrc} type="video/mp4" />
                                    <source src="movie.ogg" type="video/ogg" />
                                    Your browser does not support the video tag.
                                </video>

                            </Box>
                            <h3 style={{ padding: '0 0 0 15px' }}  >{d.name}</h3>
                            <Typography p='0 0 10px 15px'>{d.description}</Typography>
                            {Boolean(Object.keys(loginData).length) &&
                                <Box sx={{ float: 'right' }} p='0 15px 15px 15px'>
                                    <EditIcon sx={{ pr: '20px', cursor: 'pointer' }} onClick={() => handleEdit(d, i)} />
                                    <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(i)} />
                                </Box>
                            }
                        </Card>
                    </Grid>
                })}
            </Grid>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent >
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' bgcolor='white' >
                        <TextField sx={{ mb: '10px' }} value={values.name} name='name' label='Name' onChange={handleChange} />
                        <TextField sx={{ mb: '10px' }} value={values.description} name='description' label='Description' onChange={handleChange} />
                        <TextField sx={{ mb: '10px', mt: '10px' }} label='Video Link' name='videoSrc' value={values.videoSrc} onChange={handleChange} />
                        <TextField sx={{ mb: '10px', mt: '10px' }} label='Image Link' name='imageSrc' value={values.imageSrc} onChange={handleChange} />
                        <Button onClick={handleSubmit} variant='contained'>Change</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>

    )
}
