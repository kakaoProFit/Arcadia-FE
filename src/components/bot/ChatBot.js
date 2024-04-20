'use client';

import ChatBot from 'react-chatbot-kit'
import config from './config'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import Image from 'next/image';


import React, { useState } from 'react'
import { IconButton, Box } from '@mui/material'
import "react-chatbot-kit/build/main.css";
import "../../styles/chatbot.css";

export default function TestChatBot() {
    const [Bot, setBot] = useState(false);

    const toggleChatBot = () => {
      setBot(!Bot);
    };
    return (
    <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
    {Bot && (
    <ChatBot
      config={config}
      actionProvider={ActionProvider}
      messageParser={MessageParser}/>
    )}
    <IconButton onClick={toggleChatBot}>
      <Image
        src='/images/logo_transparent.png'
        width={75}
        height={75}
        alt='Arcadia Logo'/>
    </IconButton>
  </Box>
    );
}