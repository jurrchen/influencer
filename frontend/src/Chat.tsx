import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { Configuration, OpenAIApi } from "openai";
import { useCallback, useState } from "react";

// send this shit direct to open AI
// how do we maintain state?

type Message = {
  message: string,
  direction: MessageDirection,
};

export default function Chat() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
  });
  
  const openai = new OpenAIApi(configuration);

  const [messages, setMessages] = useState<Message[]>([])

  const appendMessage = useCallback((mess: string, direction: MessageDirection) => {
    setMessages([
      ...messages,
      { message: mess, direction},
    ])
  }, [messages, setMessages])  

  const openAICompletion = async (message: string) => {
    appendMessage(message, 'outgoing')

    const cc = await openai.createChatCompletion({
      // model: "gpt-4",
      model: "gpt-3.5-turbo",
      messages: [
        // {role: "system", content: system},
        {role: "user", content: message}
      ],
    });

    appendMessage(cc.data.choices[0].message?.content || "<error>", 'incoming')
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
                position: "normal",
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
