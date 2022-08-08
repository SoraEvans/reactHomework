import logo from './logo.svg'
import './style.scss'
import Message from './components/Message'
import {useEffect, useState} from 'react'
import {Box, TextField, Button, List, ListItem} from '@mui/material'

const chats = [
    {name: 'chat1', id: 1},
    {name: 'chat2', id: 2},
    {name: 'chat3', id: 3}
]

function App() {
    const [messageList, setMessageList] = useState([])
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    const onChangeText = (e) => {
        setText(e.target.value)
    }

    const onChangeAuthor = (e) => {
        setAuthor(e.target.value)
    }

    const submitMessage = e => {
        e.preventDefault()
        setMessageList(prevState => [...prevState, {author, text}])
        setText('')
        setAuthor('')
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
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        autoFocus
                        id="outlined-required"
                        label="Author"
                        onChange={onChangeAuthor}
                        value={author}
                    />
                    <TextField
                        id="outlined-required"
                        label="Text"
                        onChange={onChangeText}
                        value={text}
                    />
                    <Button onClick={submitMessage} variant="contained">SEND</Button>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <List>{messageList.map(({text}, n) => <Message text={text} key={text + n}/>)}</List>
                    <List> {chats.map(({name, id}) => <ListItem id={id}> {name} </ListItem>)}</List>
                </Box>
            </header>
        </div>
    );
}

export default App;
