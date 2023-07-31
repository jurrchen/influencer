import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { useCallback, useState } from "react";
import openAIMessage from "./lib/openai";
import { Section } from "./lib/types";

// send this shit direct to open AI
// how do we maintain state?


type Message = {
  message: string,
  direction: MessageDirection,
};

export default function Chat(props: {appendSection: (s: Section) => void}) {
  const [messages, setMessages] = useState<Message[]>([]);

  const appendMessage = useCallback((mess: string, direction: MessageDirection) => {
    setMessages([
      ...messages,
      { message: mess, direction},
    ])
  }, [messages, setMessages]);

  const openAICompletion = async (message: string) => {
    await appendMessage(message, 'outgoing')

    await openAIMessage(message, appendMessage, props.appendSection)
  }

  return (
    <div style={{height: '800px', width: '300px'}}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {
              messages.map(({message, direction}) => (
                <Message
                model={{
                  type: "custom",
                  direction,
                  position: "single",
                }}
                >
                  <Message.CustomContent>
                    <div><b>{message}</b></div>
                  </Message.CustomContent>
                </Message>
              ))

            }
          </MessageList>
          <MessageInput 
            placeholder="Type message here" 
            onSend={(message) => openAICompletion(message)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}
