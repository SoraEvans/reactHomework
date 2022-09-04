import './style.scss'
import Message from './components/Message'
import { useEffect, useState } from 'react'
import { Box, TextField, Button, List, ListItem } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { addChats, removeChats, sendMessage } from './redux/slice'
import { getChatList } from './redux/selectors'

const errorFields = { author: false, text: false }

function App() {
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')
    const [errors, setErrors] = useState(errorFields)
    const navigate = useNavigate();
    const { chatId } = useParams();
    const chats = useSelector(getChatList, shallowEqual)
    const dispatch = useDispatch()

    const addChat = () => dispatch(addChats('test'))

    const deleteChat = (id) => {
        dispatch(removeChats(id))
    }

    const onNavigateChats = (n) => {
        navigate(`../chats/${n}`, { replace: true })
    }

    const onChangeText = ({ target: { value } }) => {
        setText(value)
        if (value) {
            setErrors(prevState => ({ ...prevState, text: false }))
        } else setErrors(prevState => ({ ...prevState, text: true }))
    }

    const onChangeAuthor = ({ target: { value } }) => {
        setAuthor(value)
        if (value) {
            setErrors(prevState => ({ ...prevState, author: false }))
        } else setErrors(prevState => ({ ...prevState, author: true }))
    }

    const inputs = [
        {
            label: 'author',
            value: author,
            handle: onChangeAuthor
        },
        {
            label: 'text',
            value: text,
            handle: onChangeText
        }
    ]

    const submitMessage = () => {
        if (author.length && text.length) {
            dispatch(sendMessage({ id: chatId, author, text }))
            setText('')
            setAuthor('')
        }
        if (!author.length) setErrors(prevState => ({ ...prevState, author: true }))
        if (!text.length) setErrors(prevState => ({ ...prevState, text: true }))
    }

    useEffect(() => {
        if (chatId) {
            !chats.find(({ name }) => name === chatId) && navigate(`../404`, { replace: true });
        }
    }, [])

    return (
        <div className="App">
            <div style={{ flex: 1, textAlign: 'center' }}>Selected chat: {chatId || 'none'}</div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
            >
                {inputs.map(({ label, value, handle }) => (
                    <TextField
                        className="form-input"
                        error={errors[label]}
                        helperText={errors[label] ? `Please, enter ${label}` : null}
                        autoFocus
                        id="outlined-required"
                        label={label}
                        onChange={handle}
                        value={value}
                        inputProps={{
                            maxLength: label === 'author' ? 20 : 255,
                        }}
                    />
                ))}
                <Button
                    onClick={submitMessage}
                    variant="contained"
                    disabled={!chatId}
                >
                    SEND
                </Button>
                <Button
                    onClick={addChat}
                    variant="contained"
                >
                    Add Chat
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>
                <List className="chatsList">
                    {chats.map(({ name, id }) => (
                        <Box sx={{ display: 'flex' }}>
                            <ListItem
                                className={chatId === name ? 'selected-chat' : null}
                                onClick={() => onNavigateChats(name)}
                                key={id}
                                id={id}
                            >
                                {name}
                            </ListItem>
                            {chatId !== name && <Button
                                onClick={() => deleteChat(id)}
                                variant="contained"
                            >
                                x
                            </Button>}
                        </Box>
                    ))}
                </List>
                <List className="messagesList">
                    {chats.map(({ name, messages }) => {
                        if (name === chatId) return messages.map(({ text, author }, n) =>
                            <Message text={text} author={author} key={text + n} />
                        )
                    })}
                </List>
            </Box>
        </div>
    );
}

export default App;
