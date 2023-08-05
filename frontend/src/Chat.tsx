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
import { GlobalSetters, GlobalsDelta, MembershipTier, Product, ProductWizard, Section, UserInfo, WebsiteDefinition } from "./lib/types";
import { Spinner } from "react-bootstrap";

// send this shit direct to open AI
// how do we maintain state?


type Message = {
  message: string,
  direction: MessageDirection,
  sender?: string
};

export default function Chat(props: {
  setSections: (s: Section[]) => void,
  setMemberships: (m: MembershipTier[]) => void,
  setProducts: (p: Product[]) => void,
  memberships: MembershipTier[],
  products: Product[],
  userInfo: UserInfo,
  website: WebsiteDefinition,
  setGlobals: GlobalSetters,
  setGlobalsBatch: (g: GlobalsDelta) => void,
  setUserInfo: (u: UserInfo) => void,
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [wizardState, setWizardState] = useState<string | null>(null);

  const [productWizard, setProductWizard] = useState<ProductWizard>({
    type: null,
    title: null,
    colors: null,
    slogan: null,
  });  

  const appendMessage = useCallback((mess: string, direction: MessageDirection, sender?: string) => {
    console.warn(mess, sender)
    setMessages(prevMessages => ([
      ...prevMessages,
      { message: mess, direction, sender},
    ]))
  } , [setMessages]);

  const openAICompletion = async (message: string) => {
    await appendMessage(message, 'outgoing')

    setLoading(true)
    
    await openAIMessage(
      wizardState,
      productWizard,
      message, 
      appendMessage, 
      props.setSections, 
      props.setMemberships, 
      props.setProducts, 
      props.setGlobals,
      props.setGlobalsBatch,
      setWizardState,
      setProductWizard,
      props.setUserInfo,
      props.website, 
      props.memberships,
      props.products,
      props.userInfo,
    );

    setLoading(false)
  }

  return (
    <div style={{height: '100vh', width: '300px'}}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {
              messages.map(({message, direction, sender}) => (
                <Message
                model={{
                  type: "custom",
                  direction,
                  position: "single",
                  sender,
                }}
                >
                  { sender && <Message.Header sender={sender} />}
                  <Message.CustomContent>
                    <div><b>{message}</b></div>
                  </Message.CustomContent>
                </Message>
              ))

            }
            {loading && <Message
              model={{
                type: "custom",
                direction: 'incoming',
                position: "single",
              }}
            >
              <Message.CustomContent>
                <Spinner />
              </Message.CustomContent>
            </Message>}
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
