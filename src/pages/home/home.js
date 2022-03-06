import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Box, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { pink, grey } from '@mui/material/colors';
import NotFound from '../../components/notFound';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { v4 } from 'uuid';
import {useTodoState , useTodoDispatch , setTodoList} from './../../context/TodoContext'




function Home() {

    const {TodoList} = useTodoState();
    const todoDispatch = useTodoDispatch();


    const [newTask, setNewTask] = useState('')
    const [errText, setErrText] = useState('')
    // const [tasks, setTasks] = useState([])
    const [numCecked, setNumCecked] = useState(0)

    console.log('11111');

    // setTasks([...TodoList])
 

    const inpElement = useRef();

    const addNewTaskHandler = () => {
        if (newTask === '') {
            setErrText('can not empty filde ...')
        }
        else {
            setErrText('')
            // setTasks([...tasks, { id: v4(), name: newTask, checked: false }])
            setTodoList(todoDispatch , [...TodoList, { id: v4(), name: newTask, checked: false }] )
            setNewTask('');
            inpElement.current.focus();
        }
    }
    // -----1234 ---

    const deletItemHandler = (id) => {
        const newTasksList = TodoList.filter(task => task.id !== id)
        // setTasks([...newTasksList])
        setTodoList(todoDispatch , [...newTasksList] )
    }

    const handelChecked = (e, id) => {

        const editedTaskList = TodoList.map(task => {
            return task.id !== id ? task : { ...task, checked: e.target.checked }
        })
        // setTasks([...editedTaskList])
        setTodoList(todoDispatch , [...editedTaskList] )
    }

    useEffect(() => {
        setNumCecked(0)
        TodoList.map(TodoList => {
            if (TodoList.checked === true) {
                setNumCecked(prev => prev + 1)
            }
        })
    }, [TodoList])



    return (
        <div>
            <Container maxWidth="lg" sx={{ py: 5, px: 1 }}>
                <Box display="flex" justifyContent={'center'}>
                    <Paper elevation={7} sx={{ position: 'relative', pb: 8, width: 450, maxWidth: '100%', minHeight: 450, overflow: 'hidden' }}>
                        <Box py={2} sx={{ bgcolor: pink[400] }}>
                            <Typography variant="h6" color="white" textAlign={'center'}>ToDo List</Typography>
                        </Box>
                        <Box p={2}>
                            <Grid container >
                                <Grid item xs>
                                    <TextField
                                        error
                                        fullWidth
                                        inputRef={inpElement}
                                        helperText={errText}
                                        size='small'
                                        variant="standard"
                                        label="Add new task"
                                        color="primary"
                                        id=""
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        focused
                                    />
                                </Grid>
                                <Grid item xs="auto" pl={2} alignItems={'bottom'} sx={{ paddingTop: '3px' }}>
                                    <Button onClick={addNewTaskHandler} color="primary" size='large' variant="outlined">Add</Button>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box p={2}>
                            {
                                TodoList.length === 0 ? <NotFound />
                                    : <FormGroup>
                                        {TodoList.map((task) => (
                                            <Box display={'flex'} justifyContent="space-between" alignItems={"center"} key={task.id}>
                                                <FormControlLabel className={task.checked === true ? 'checked' : ''} control={<Checkbox checked={task.checked === true ? true : false} onChange={(e) => handelChecked(e, task.id)} />} label={task.name} />
                                                <DeleteForeverIcon sx={{ cursor: 'pointer' }} onClick={() => deletItemHandler(task.id)} />
                                            </Box>
                                        ))}
                                    </FormGroup>
                            }
                        </Box>

                        <Box py={2} px={2} sx={{ width: '100%', bgcolor: grey[100], position: 'absolute', bottom: 0, left: 0, boxSizing: 'border-box' }} display="flex" justifyContent={"space-between"}>
                            <div>Tasks: {TodoList.length}</div>
                            <Link to={`/information`}>
                                <Button variant="outlined" size="small">
                                    view info
                                </Button>
                            </Link>
                            <div>Done: {numCecked} </div>
                        </Box>
                    </Paper>
                </Box>

            </Container>
        </div>
    )
}

export default Home