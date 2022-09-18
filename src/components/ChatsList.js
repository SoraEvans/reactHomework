import { Box, Button, List, ListItem } from '@mui/material'
import Message from './Message'

const ChatsList = ({ chats, chatId, onNavigateChats, deleteChat }) => (
    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>
        <List className="chatsList">
            {chats.map(({ name, id }) => (
                <ListItem
                    className={chatId === name ? 'selected-chat' : null}
                    onClick={() => onNavigateChats(name)}
                    id={id}
                    key={id}
                >
                    <span style={{ marginRight: 16 }}>{name}</span>
                    {chatId !== name && <Button
                        onClick={() => deleteChat(id)}
                        variant="contained"
                    >
                        x
                    </Button>}
                </ListItem>
            ))}
        </List>
        <List className="messagesList">
            {chats.map(({ name, messages }) => {
                if (name === chatId) {
                    return messages?.map(({ text, author }, n) =>
                        <Message text={text} author={author} key={text + n} />
                    )
                } else return false
            })}
        </List>
    </Box>
)

export default ChatsList