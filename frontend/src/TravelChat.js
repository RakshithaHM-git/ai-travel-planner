import React, { useState } from "react";
import places from "./places.json"; // make sure places.json is in the same folder

function TravelChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to handle user input
  const handleSend = () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    
    // Add user message first
    setMessages(prev => [...prev, userMessage]);

    // AI reply
    const aiReply = getAIReply(input);
    
    // Add AI reply
    setMessages(prev => [...prev, userMessage, { sender: "ai", text: aiReply }]);
    setInput("");
  };

  // Function to filter places
  const getAIReply = (query) => {
    let type = null;

    // Determine the type user asked
    const q = query.toLowerCase();
    if (q.includes("temple")) type = "temple";
    else if (q.includes("beach")) type = "beach";
    else if (q.includes("mountain") || q.includes("hill")) type = "mountain";

    if (type) {
      const filtered = places.filter(p => p.type === type);
      if (filtered.length === 0) return "Sorry, no places found for that type.";
      
      // Pick a random place to avoid repetition
      const place = filtered[Math.floor(Math.random() * filtered.length)];
      return `Try visiting ${place.name}. Budget: ${place.budget}. Info: ${place.description}`;
    }

    return "I can help you find temples, beaches, or mountains. Try asking for one!";
  };

  return (
    <div style={{ width: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      <div style={{ border: "1px solid gray", padding: "10px", height: "400px", overflowY: "scroll", marginBottom: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Ask me about a place..." 
        style={{ width: "80%", padding: "5px" }} 
      />
      <button onClick={handleSend} style={{ width: "18%", padding: "5px", marginLeft: "2%" }}>Send</button>
    </div>
  );
}

export default TravelChat;