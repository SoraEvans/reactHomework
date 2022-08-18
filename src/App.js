import logo from './logo.svg'
import './style.scss'
import Message from './components/Message'
import { useEffect, useState } from 'react'

function App() {
  const [messageList, setMessageList] = useState([])
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')

  const onChangeText = e => {
    setText(e.target.value)
  }

  const onChangeAuthor = e => {
    setAuthor(e.target.value)
  }

  const submitMessage = e => {
    e.preventDefault()
    setMessageList(prevState => [...prevState, { author, text }])
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
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={submitMessage}>
          <input onChange={onChangeAuthor} value={author} placeholder="Author" />
          <input onChange={onChangeText} value={text} placeholder="Text" />
          <button type="submit">
            SEND
          </button>
        </form>
        {messageList.map(({ text }, n) => <Message text={text} key={text + n} />)}
      </header>
    </div>
  );
}

export default App;
