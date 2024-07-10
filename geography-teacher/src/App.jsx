import { useState, useEffect }  from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import logo from './assets/logo.png'
import send from './assets/send.png'
import avatar1 from './assets/avatar1.jpg'
import avatar2 from './assets/avatar2.jpg'

const API_KEY =""

const App = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am an AI Geography Teacher! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "You are a geography teacher and only answer questions related to geography" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
<div className="App min-h-screen bg-gradient-to-bl from-teal-500 to-sky-700 font-mono">
        <div className="mb-4 flex flex-row items-center justify-center w-screen">
          <img src={logo} alt="Geography Teacher" className=" h-[100px] w-auto" />
          <h1 className="text-3xl font-bold text-white">Geography Teacher</h1>
        </div>  
        <div className="h-[42.5em] overflow-y-auto bg-blue-100 p-4 rounded-lg w-[42.5em] mx-auto">
          {messages.map((message, i) => (
            <div key={i} className={`flex ${message.sender === "ChatGPT" ? 'justify-start' : 'justify-end'} mb-2 items-center`}>
              {message.sender === "ChatGPT" && <img src={avatar1} alt="avatar" className="w-12 h-12 rounded-full mr-2" />}
              <div className={`bg-${message.sender === "ChatGPT" ? 'blue-200' : 'blue-500'} text-${message.sender === "ChatGPT" ? 'black' : 'white'} p-2 rounded-lg max-w-xs`}>
                {message.message}
              </div>
              {message.sender === "user" && <img src={avatar2} alt="avatar" className="w-12 h-12 rounded-full ml-2" />}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-2 items-center">
              <img src={avatar1} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
              <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                Geography Teacher is typing...
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex w-[40em] mx-auto">
          <input
            type="text"
            className="flex-grow p-2 rounded-l-lg border border-gray-300"
            placeholder="Send a message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                handleSendRequest(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r-lg"
            onClick={() => {
              const input = document.querySelector('input[type="text"]');
              if (input.value.trim()) {
                handleSendRequest(input.value);
                input.value = '';
              }
            }}
          >
            Send
          </button>
        </div>
      <footer className="mt-4 text-center text-white">
        Geography Teacher is programmed to strictly answer Geography related questions.
      </footer>
    </div>
  );
}

export default App;


//<div className="overflow-x-hidden font-mono  scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-screen left-0  bg-gradient-to-bl from-sky-500 to-teal-700 w-screen overflow-x-hidden lg:h-[fit-content] md:min-h-screen">
//<div className='mx-auto border-2 border-red-600 w-[41.5em] h-[50em]'>
//  <MainContainer className='font-mono'>
//    <ChatContainer className='font-mono'>       
//      <MessageList className=''
//        scrollBehavior="smooth" 
//        typingIndicator={isTyping ? <TypingIndicator content="Geography Teacher is typing" /> : null}
//      >
//        {messages.map((message, i) => {
//          console.log(message)
//          return <Message key={i} model={message} />
//        })}
//      </MessageList>
//      <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />        
//    </ChatContainer>
//  </MainContainer>
//</div>
//</div>