import '../style.scss'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addChats, botAnswer, removeChats, sendMessage } from '../redux/slice'
import { ChatsList, ChatForm } from '../components'
import { getChatList, useAuth } from '../redux/selectors'

const errorFields = { author: false, text: false }

const App = () => {
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')
    const [errors, setErrors] = useState(errorFields)
    const messages = useSelector(getChatList)
    const navigate = useNavigate();
    const { chatID } = useParams();
    const isAuth = useAuth().isAuth
    const dispatch = useDispatch()

    const addChat = () => {
        dispatch(addChats('test'))
    }

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
            dispatch(sendMessage({ id: chatID, author, text }))
            botAnswer(`Message sent in chat: ${chatID} from ${author}`)
            setText('')
            setAuthor('')
        }
        if (!author.length) setErrors(prevState => ({ ...prevState, author: true }))
        if (!text.length) setErrors(prevState => ({ ...prevState, text: true }))
    }

    useEffect(() => {
        dispatch({ type: 'FIREBASE_GET_CHATS', payload: { dispatch } });
    }, []);

    useEffect(() => {
        if (chatID) {
            !messages.find(({ name }) => name === chatID) && navigate(`../404`, { replace: true });
        }
    }, [chatID, messages, navigate])

    return (isAuth ?
            <div className="App">
                <div style={{ flex: 1, textAlign: 'center' }}>
                    Selected chat: {chatID || 'none'}
                </div>
                <ChatForm
                    chatId={chatID}
                    addChat={addChat}
                    inputs={inputs}
                    errors={errors}
                    submitMessage={submitMessage}
                />
                <ChatsList
                    chats={messages}
                    chatId={chatID}
                    deleteChat={deleteChat}
                    onNavigateChats={onNavigateChats}
                />
            </div> : <Navigate to="/login" />
    );
}

export default App;
