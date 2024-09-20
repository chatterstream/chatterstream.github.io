import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ThemeController from "../components/ThemeController";

const socket = io("http://localhost:4000");

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/");
    }

    console.log("Connecting to WebSocket...");
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("receive_message", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from WebSocket server");
    };
  }, [navigate]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      socket.emit("send_message", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div>
      <header className="flex py-3">
        <h2 className="text-2xl font-bold ms-3">Welcome to the chat room!</h2>
        <ThemeController />
      </header>
      <div className="chat-box p-4 rounded-lg bg-base-200">
        <div className="message-container overflow-y-auto h-80">
          {messages.map((msg, index) => (
            <div key={index} className="chat chat-end">
              <div className="chat-bubble">{msg}</div>
            </div>
          ))}
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            className="grow w-full"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn btn-sm"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            😊
          </button>
          <button className="btn btn-sm" onClick={handleSendMessage}>
            Send
          </button>
        </label>
        {showEmojiPicker && (
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        )}
      </div>
      <div className="flex justify-center mt-3">
        <button className="btn btn-outline btn-error" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Chat;
