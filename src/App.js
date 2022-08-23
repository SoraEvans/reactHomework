import logo from './logo.svg'
import './style.scss'
import Message from './components/Message'
import {useEffect, useState} from 'react'
import {Box, TextField, Button, List, ListItem, useTheme} from '@mui/material'

const chats = [
    {name: 'chat1', id: 1},
    {name: 'chat2', id: 2},
    {name: 'chat3', id: 3}
]


const errorFields = {author: false, text: false}

function App() {
    const [messageList, setMessageList] = useState([])
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')
    const [errors, setErrors] = useState(errorFields)

    const theme = useTheme()

    const onChangeText = ({target: {value}}) => {
        setText(value)
        if (value) {
            setErrors(prevState => ({...prevState, text: false}))
        } else setErrors(prevState => ({...prevState, text: true}))
    }

    const onChangeAuthor = ({target: {value}}) => {
        setAuthor(value)
        if (value) {
            setErrors(prevState => ({...prevState, author: false}))
        } else setErrors(prevState => ({...prevState, author: true}))
    }

    const submitMessage = (e) => {
        e.preventDefault()
        if (author.length && text.length) {
            setMessageList(prevState => [...prevState, {author, text}])
            setText('')
            setAuthor('')
        }
        if (!author.length) setErrors(prevState => ({...prevState, author: true}))
        if (!text.length) setErrors(prevState => ({...prevState, text: true}))
    }

    useEffect(() => {
        const length = messageList.length
        length && setTimeout(() => alert(`Message sent ${messageList[length - 1].author}`), 1500)
    }, [messageList.length])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    autoComplete="off"
                >
                    <TextField
                        error={errors.author}
                        helperText={errors.author ? 'Please, enter author' : null}
                        autoFocus
                        id="outlined-required"
                        label="Author"
                        onChange={onChangeAuthor}
                        value={author}
                    />
                    <TextField
                        error={errors.text}
                        helperText={errors.text ? 'Please, enter text' : null}
                        id="outlined-required"
                        label="Text"
                        onChange={onChangeText}
                        value={text}
                    />
                    <Button
                        style={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.secondary.main,
                        }}
                        onClick={submitMessage}
                        variant="contained"
                    >
                        SEND
                    </Button>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <List>{messageList.map(({text}, n) => <Message text={text} key={text + n}/>)}</List>
                    <List> {chats.map(({name, id}) => <ListItem key={id} id={id}> {name} </ListItem>)}</List>
                </Box>
            </header>
        </div>
    );
}

export default App;
