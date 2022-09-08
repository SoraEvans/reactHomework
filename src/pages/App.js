import '../style.scss'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { addChats, removeChats, sendMessage, botAnswer } from '../redux/slice'
import { getChatList } from '../redux/selectors'
import { ChatsList, ChatForm } from '../components'

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
            botAnswer(`Message sent in chat: ${chatId} from ${author}`)
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
    }, [chatId, chats, navigate])

    return (
        <div className="App">
            <div style={{ flex: 1, textAlign: 'center' }}>
                Selected chat: {chatId || 'none'}
            </div>
            <ChatForm
                chatId={chatId}
                addChat={addChat}
                inputs={inputs}
                errors={errors}
                submitMessage={submitMessage}
            />
            <ChatsList
                chats={chats}
                chatId={chatId}
                deleteChat={deleteChat}
                onNavigateChats={onNavigateChats}
            />
        </div>
    );
}

export default App;
