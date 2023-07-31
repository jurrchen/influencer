import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export default function Chat() {
  return (
    <div style={{height: '800px', width: '300px'}}>
    <MainContainer>
      <ChatContainer>
        <MessageList>
          <Message
            model={{
              type: "custom",
              // payload: <div>Test</div>,
              // message: "Hello my friend",
              // sentTime: "just now",
              // sender: "Joe",
              direction: "incoming",
              position: "single",
            }}
          >
            <Message.CustomContent>
              <div><b>Tes2t</b></div>
            </Message.CustomContent>
          </Message>
        </MessageList>
        <MessageInput placeholder="Type message here" />
      </ChatContainer>
    </MainContainer>
    </div>
  )
}
