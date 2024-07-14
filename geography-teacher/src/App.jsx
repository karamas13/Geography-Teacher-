import { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';
import send from './assets/send.png';
import avatar1 from './assets/avatar1.jpg';
import avatar2 from './assets/avatar2.jpg';
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  Pin
} from "@vis.gl/react-google-maps";

const API_KEY = `${import.meta.env.VITE_OPENAI_KEY}`;
const MAPS_KEY = `${import.meta.env.VITE_GOOGLE_MAPS_KEY}`;
const MAP_ID = `${import.meta.env.VITE_MAP_ID}`;

const App = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am an AI Geography Teacher! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

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
      "model": "gpt-4o",
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

  const MapHandler = ({ place, marker }) => {
    const map = useMap();

    useEffect(() => {
      if (!map || !place || !marker) return;

      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else if (place.geometry?.location) {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }

      marker.position = place.geometry?.location;
    }, [map, place, marker]);
    return null;
  };

  const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
      if (!places || !inputRef.current) return;

      const options = {
        fields: ["geometry", "name", "formatted_address"],
      };

      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
      if (!placeAutocomplete) return;

      placeAutocomplete.addListener("place_changed", () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);

    return (
      <div className="autocomplete-container">
        <input ref={inputRef} placeholder="Search for places..." className="w-full lg:w-[25em] p-3 rounded-lg shadow-md bg-[#333] mt-16 lg:mt-2 text-white" />
      </div>
    );
  };

  return (
    <div className="App min-h-screen bg-gradient-to-bl from-teal-500 to-sky-700 font-mono scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 overflow-y-scroll scrollbar-thin">
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-center w-full">
        <img src={logo} alt="Geography Teacher" className="h-24 w-auto" />
        <h1 className="text-3xl lg:text-4xl font-bold text-white mt-4 sm:mt-0">Geography Teacher</h1>
      </div>
      <div className="lg:h-[42.5em] h-[37.5em] overflow-y-auto bg-blue-100 p-4 rounded-lg mx-auto w-full max-w-4xl lg:max-w-5xl scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 overflow-y-scroll scrollbar-thin">
        {messages.map((message, i) => (
          <div key={i} className={`flex ${message.sender === "ChatGPT" ? 'justify-start' : 'justify-end'} mb-2 items-center`}>
            {message.sender === "ChatGPT" && <img src={avatar1} alt="avatar" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full mr-2" />}
            <div className={`bg-${message.sender === "ChatGPT" ? 'blue-200' : 'blue-500'} text-${message.sender === "ChatGPT" ? 'black' : 'white'} p-2 lg:p-4 rounded-lg max-w-xs lg:max-w-sm`}>
              {message.message}
            </div>
            {message.sender === "user" && <img src={avatar2} alt="avatar" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full ml-2" />}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-2 items-center">
            <img src={avatar1} alt="avatar" className="w-8 h-8 lg:w-12 lg:h-12 rounded-full mr-2" />
            <div className="bg-blue-200 text-black p-2 lg:p-4 rounded-lg max-w-xs lg:max-w-sm ">
              Geography Teacher is typing...
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex w-full max-w-4xl lg:max-w-5xl mx-auto">
        <input
          type="text"
          className="flex-grow p-2 lg:p-2 rounded-l-lg border border-gray-300"
          placeholder="Send a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              handleSendRequest(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button
          className="bg-blue-500 text-white p-2 lg:p-3 rounded-r-lg"
          onClick={() => {
            const input = document.querySelector('input[type="text"]');
            if (input.value.trim()) {
              handleSendRequest(input.value);
              input.value = '';
            }
          }}
        >
          <img src={send} className='h-6' />
        </button>
      </div>
      <footer className="mt-4 text-center text-white">
        Geography Teacher is programmed to strictly answer Geography related questions.<br />
        Geography Teacher can make mistakes. Check important info.
      </footer>
      <div className='mb-10 mt-10'>
        <APIProvider apiKey={MAPS_KEY}>
          <Map
            mapId={MAP_ID}
            defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            className='h-[92vh] lg:w-full w-[90%] max-w-4xl lg:max-w-5xl mx-auto'
            minZoom={2}
            options={{
              restriction: {
                latLngBounds: {
                  north: 85,
                  south: -85,
                  west: -180,
                  east: 180,
                },
                strictBounds: true,

              }}}
          >
            <AdvancedMarker ref={markerRef} position={null} />
            <MapControl position={ControlPosition.TOP}>
              <div className="autocomplete-control">
                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
              </div>
            </MapControl>
            <MapHandler place={selectedPlace} marker={marker} />
          </Map>
        </APIProvider>
      </div>
      <div className='h-1 w-1 mx-auto'></div>
    </div>
  );
};

export default App;
