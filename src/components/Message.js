import { ListItem, Tooltip } from '@mui/material'

const Message = ({ text, author }) => (
    <ListItem>
      <Tooltip title={`Author: ${author}`} placement="top" arrow followCursor>
        <div>{text}</div>
      </Tooltip>
    </ListItem>
)

export default Message