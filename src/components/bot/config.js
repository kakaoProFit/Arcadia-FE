import { createChatBotMessage } from 'react-chatbot-kit'
import botHeader from './botHeader'

const botName = '아르카디아'
const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
  },
  customComponents: {
    // Replaces the default header
    header: botHeader,
    // Replaces the default bot avatar botAvatar: (props) => <BotAvatar {...props}
    // />, Replaces the default bot chat message container botChatMessage: (props)
    // => <BotChatMessage {...props} />, Replaces the default user icon userAvatar:
    // (props) => <UserAvatar {...props} />, Replaces the default user chat message
    // userChatMessage: (props) => <UserChatMessage {...props} />,
  },
}

export default config
