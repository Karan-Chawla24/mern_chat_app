import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/misc/SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }} className="chat-page">
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent="space-between"
        w="100%"
        h="92vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
