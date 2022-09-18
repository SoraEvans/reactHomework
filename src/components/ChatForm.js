import { Box, Button, TextField } from '@mui/material'

const ChatForm = ({ inputs, errors, submitMessage, chatId, addChat }) => (
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
                id={label}
                label={label}
                key={label}
                aria-labelledby={label}
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
)

export default ChatForm