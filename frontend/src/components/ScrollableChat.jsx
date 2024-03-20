import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chatLogics";
import { Avatar, Text, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <div style={{ maxHeight: "505px", overflowY: "auto" }}>
      <ScrollableFeed>
        {messages &&
          messages.map((message, i) => (
            <div key={message._id} style={{ display: "flex" }}>
              {(isSameSender(messages, message, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={message.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={message.sender.name}
                    src={message.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  // borderRadius: "20px",
                  borderRadius: isSameUser(messages, message, i)
                  ? "20px 20px 0 20px"
                  : "20px 20px 20px 0",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(
                    messages,
                    message,
                    i,
                    user._id
                  ),
                  marginTop: isSameUser(messages, message, i) ? 3 : 10,
                }}
              >
                {message.content}
                <Text fontSize="xs" color="gray.500" ml={12} mt={-1}>
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
