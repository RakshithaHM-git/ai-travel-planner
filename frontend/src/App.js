import React, { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [chat, setChat] = useState("");
  const [reply, setReply] = useState("");

  // 🔍 Search function
  const searchPlace = () => {
    const input = location.trim();
    if (!input) return;

    // Generate dynamic sample data
    setData({
      temple: [
        {
          name: `${input} Temple`,
          description: `Famous temple in ${input}`,
          view: `${input} Temple`,
        },
        {
          name: `${input} Old Temple`,
          description: `Historic temple in ${input}`,
          view: `${input} Old Temple`,
        },
      ],
      beach: [
        {
          name: `${input} Beach`,
          description: `Popular beach near ${input}`,
          view: `${input} Beach`,
        },
      ],
      adventure: [
        {
          name: `${input} Hills`,
          description: `Adventure activities in ${input}`,
          view: `${input} Hills`,
        },
        {
          name: `${input} Trekking Point`,
          description: `Best trekking place in ${input}`,
          view: `${input} Trekking Point`,
        },
      ],
    });

    setSelectedPlace(null); // reset 360° view
  };

  // 🤖 AI Chat function
  const askAI = () => {
    const msg = chat.toLowerCase();
    if (msg.includes("temple")) {
      setReply("Try visiting temples from the results above 🛕");
    } else if (msg.includes("beach")) {
      setReply("Beaches are perfect for relaxing 🌊");
    } else if (msg.includes("adventure")) {
      setReply("Adventure trips include hills, trekking, and more 🧗");
    } else {
      setReply("Ask about temples, beaches, or adventure 😊");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🌍 AI Travel Planner</h1>

      {/* 🔍 Search */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter location (Goa, Mysore...)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: 10,
            width: "250px",
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={searchPlace}
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* 📍 Results */}
      {data &&
        ["temple", "beach", "adventure"].map((category) => (
          <div key={category}>
            <h2 style={{ textTransform: "capitalize" }}>{category}</h2>

            {data[category].map((place, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  padding: 15,
                  marginBottom: 10,
                  borderRadius: 10,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                <h4>{place.name}</h4>
                <p>{place.description}</p>

                <button
                  onClick={() => setSelectedPlace(place.view)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                >
                  View 360°
                </button>
              </div>
            ))}
          </div>
        ))}

      {/* 🌐 360° View / Map */}
      {selectedPlace && (
        <div style={{ marginTop: 20 }}>
          <h3>📍 Location / 360° View</h3>
          <iframe
            title="map"
            width="100%"
            height="400"
            src={`https://www.google.com/maps?q=${selectedPlace}&output=embed`}
            style={{ borderRadius: 10 }}
          ></iframe>
        </div>
      )}

      {/* 🤖 AI Chat */}
      <div style={{ marginTop: 30 }}>
        <h2>AI Chat 🤖</h2>

        <input
          type="text"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          placeholder="Ask something..."
          style={{
            padding: 10,
            width: "250px",
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={askAI}
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            backgroundColor: "purple",
            color: "white",
            border: "none",
            borderRadius: 5,
          }}
        >
          Ask
        </button>

        <p style={{ marginTop: 10, fontWeight: "bold" }}>{reply}</p>
      </div>
    </div>
  );
}

export default App;