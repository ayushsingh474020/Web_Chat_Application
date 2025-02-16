import { Avatar, Tooltip } from '@chakra-ui/react';
import React from 'react';
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from '../Context/chatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages && messages.map((m, i) => (
        <div style={{ display: "flex" }} key={m._id}>
          {(isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id)) && (
            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.pic}
              />
            </Tooltip>
          )}
          <span
            style={{
              backgroundColor: `${m.sender._id === user._id ? "#2B6CB0" : "#38A169"}`,
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
              marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              borderRadius: "20px",
              padding: "5px 15px",
              maxWidth: "75%",
              color: "white"
            }}
          >
            {m.content}
          </span>
        </div>
      ))}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
