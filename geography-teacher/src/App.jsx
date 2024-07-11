import { useState, useEffect }  from 'react';
import logo from './assets/logo.png'
import send from './assets/send.png'
import avatar1 from './assets/avatar1.jpg'
import avatar2 from './assets/avatar2.jpg'


const API_KEY = `${process.env.OPENAI_KEY}`;

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
        { role: "system", content: "You are an artificial intelligence geography teacher and STRICTLY answer questions ONLY related to geography. In the case you are asked something that is not at least remotely related to geography you politely refuse to answer." },
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
    <div className="mb-4 flex flex-row items-center justify-center w-full">
      <img src={logo} alt="Geography Teacher" className="h-24 w-auto" />
      <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white">Geography Teacher</h1>
    </div>
    <div className="h-[42.5em] overflow-y-auto bg-blue-100 p-4 rounded-lg mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 4k:max-w-8xl 8k:max-w-9xl">
      {messages.map((message, i) => (
        <div key={i} className={`flex ${message.sender === "ChatGPT" ? 'justify-start' : 'justify-end'} mb-2 items-center`}>
          {message.sender === "ChatGPT" && <img src={avatar1} alt="avatar" className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full mr-2" />}
          <div className={`bg-${message.sender === "ChatGPT" ? 'blue-200' : 'blue-500'} text-${message.sender === "ChatGPT" ? 'black' : 'white'} p-2 lg:p-4 rounded-lg max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-lg`}>
            {message.message}
          </div>
          {message.sender === "user" && <img src={avatar2} alt="avatar" className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full ml-2" />}
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start mb-2 items-center">
          <img src={avatar1} alt="avatar" className="w-8 h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 rounded-full mr-2" />
          <div className="bg-blue-200 text-black p-2 lg:p-4 rounded-lg max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-lg">
            Geography Teacher is typing...
          </div>
        </div>
      )}
    </div>
    <div className="mt-4 flex w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 4k:max-w-8xl 8k:max-w-9xl mx-auto">
      <input
        type="text"
        className="flex-grow p-2 lg:p-4 rounded-l-lg border border-gray-300"
        placeholder="Send a message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            handleSendRequest(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <button
        className="bg-blue-500 text-white p-2 lg:p-4 rounded-r-lg"
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
    <footer className="mt-4 text-center text-white mb-1">
      Geography Teacher is programmed to strictly answer Geography related questions.<br />
      Geography Teacher can make mistakes. Check important info.
    </footer>
  </div>
  );
}

export default App;


