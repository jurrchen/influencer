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
import { GlobalSetters, MembershipTier, Section, WebsiteDefinition } from "./lib/types";

// send this shit direct to open AI
// how do we maintain state?


type Message = {
  message: string,
  direction: MessageDirection,
};

export default function Chat(props: {
  setSections: (s: Section[]) => void,
  setMemberships: (m: MembershipTier[]) => void,
  memberships: MembershipTier[],
  website: WebsiteDefinition,
  setGlobals: GlobalSetters,
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const appendMessage = useCallback((mess: string, direction: MessageDirection) => {
    setMessages(prevMessages => ([
      ...prevMessages,
      { message: mess, direction},
    ]))
  } , [setMessages]);

  const openAICompletion = async (message: string) => {
    await appendMessage(message, 'outgoing')

    setLoading(true)
    
    await openAIMessage(message, appendMessage, props.setSections, props.setMemberships, props.setGlobals, props.website, props.memberships);

    setLoading(false)
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
            disabled={loading}
            onSend={(message) => openAICompletion(message)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}
