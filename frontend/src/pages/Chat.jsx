import DashboardLayout from "../layouts/DashboardLayout";

import { useEffect, useRef, useState } from "react";

import {
  FiSend,
  FiImage,
  FiTrash2,
  FiMenu,
  FiX,
  FiMic,
  FiPlus,
} from "react-icons/fi";

import ReactMarkdown from "react-markdown";

import toast from "react-hot-toast";

function Chat() {
  // =========================================
  // STATES
  // =========================================

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [chatHistory, setChatHistory] = useState([]);

  const [historyOpen, setHistoryOpen] = useState(false);

  const [listening, setListening] = useState(false);

  const [chatId, setChatId] = useState(crypto.randomUUID());

  // =========================================
  // USER
  // =========================================

  const user = JSON.parse(localStorage.getItem("user"));

  const userEmail = user?.email || "guest@agromind.ai";

  // =========================================
  // AUTO SCROLL
  // =========================================

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =========================================
  // FETCH CHAT HISTORY
  // =========================================

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(
        `https://agromind-ai-q13r.onrender.com/get-chat-history/${userEmail}`,
      );

      const data = await response.json();

      setChatHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  // =========================================
  // LOAD CHAT
  // =========================================

  const loadChat = async (selectedChatId) => {
    try {
      const response = await fetch(
        `https://agromind-ai-q13r.onrender.com/get-chats/${selectedChatId}`,
      );

      const data = await response.json();

      setMessages(data);

      setChatId(selectedChatId);

      setHistoryOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================================
  // NEW CHAT
  // =========================================

  const createNewChat = () => {
    setChatId(crypto.randomUUID());

    setMessages([]);

    setInput("");

    setSelectedImage(null);

    setHistoryOpen(false);
  };

  // =========================================
  // DELETE CHAT
  // =========================================

  const deleteChat = async (selectedChatId) => {
    try {
      await fetch(
        `https://agromind-ai-q13r.onrender.com/delete-chat/${selectedChatId}`,
        {
          method: "DELETE",
        },
      );

      fetchChatHistory();

      toast.success("Chat deleted");
    } catch (error) {
      console.error(error);
    }
  };

  // =========================================
  // VOICE INPUT
  // =========================================

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Voice recognition not supported");

      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-US";

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setInput(transcript);
    };

    recognition.onerror = () => {
      setListening(false);

      toast.error("Voice recognition failed");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  // =========================================
  // SEND MESSAGE
  // =========================================

  const sendMessage = async () => {
    if (!input.trim() && !selectedImage) {
      return;
    }

    const userMessage = {
      sender: "user",

      text: input || "🌾 Analyze this crop disease",
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    const formData = new FormData();

    formData.append("message", input);

    formData.append("chat_id", chatId);

    formData.append("user_email", userEmail);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    setInput("");

    try {
      const response = await fetch(
        "https://agromind-ai-q13r.onrender.com/chat",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,

        {
          sender: "ai",
          text: data.reply,
        },
      ]);

      fetchChatHistory();
    } catch (error) {
      console.error(error);

      toast.error("Failed to get response");
    } finally {
      setLoading(false);

      setSelectedImage(null);
    }
  };

  // =========================================
  // UI
  // =========================================

  return (
    <DashboardLayout>
      <div
        className="
          flex
          h-screen
          overflow-hidden
        "
      >
        {/* =====================================
            MAIN CHAT
        ===================================== */}

        <div
          className="
            flex-1
            flex
            flex-col
            min-w-0
            h-screen
          "
        >
          {/* HEADER */}

          <div
            className="
              border-b
              border-white/10
              px-6
              py-5
              flex
              items-center
              justify-between
              shrink-0
            "
          >
            <div>
              <h1
                className="
                  text-3xl
                  md:text-4xl
                  font-black
                "
              >
                🤖 AgroMind AI
              </h1>

              <p className="text-gray-400 mt-1">Smart Farming Assistant 🌱</p>
            </div>

            {/* MOBILE HISTORY BUTTON */}

            <button
              onClick={() => setHistoryOpen(true)}
              className="
                xl:hidden
                text-3xl
              "
            >
              <FiMenu />
            </button>
          </div>

          {/* CHAT BODY */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-4
              md:px-8
              py-6
              scrollbar-thin
              scrollbar-thumb-green-500
              scrollbar-track-transparent
            "
          >
            <div
              className="
                max-w-4xl
                mx-auto
                space-y-6
              "
            >
              {/* EMPTY STATE */}

              {messages.length === 0 && (
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    min-h-[50vh] md:min-h-[70vh]
                    px-4 pt-6 pb-24
                  "
                >
                  <div className="text-center max-w-2xl mx-auto">
                    <h2
                      className="
text-3xl
sm:text-4xl
md:text-5xl
md:text-5xl
leading-tight
font-black
mb-4
px-4
"
                    >
                      🌱 Welcome to AgroMind AI
                    </h2>

                    <p
                      className="
                        text-gray-400
                        text-base md:text-lg px-2
                      "
                    >
                      Start a smart farming conversation.
                    </p>
                  </div>
                </div>
              )}

              {/* MESSAGES */}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`
                      flex
                      ${msg.sender === "user" ? "justify-end" : "justify-start"}
                    `}
                >
                  <div
                    className={`
                        max-w-[85%]
                        rounded-3xl
                        px-6
                        py-5
                        leading-relaxed
                        break-words

                        ${
                          msg.sender === "user"
                            ? `
                              bg-green-500
                              text-black
                            `
                            : `
                              bg-white/[0.05]
                              border
                              border-white/10
                            `
                        }
                      `}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {/* LOADING */}

              {loading && (
                <div
                  className="
      flex
      justify-start
    "
                >
                  <div
                    className="
        bg-white/[0.05]
        border
        border-white/10
        rounded-3xl
        px-6
        py-5
        flex
        items-center
        gap-3
      "
                  >
                    {/* DOT 1 */}

                    <span
                      className="
          w-3
          h-3
          rounded-full
          bg-green-400
          animate-bounce
        "
                    />

                    {/* DOT 2 */}

                    <span
                      className="
          w-3
          h-3
          rounded-full
          bg-green-400
          animate-bounce
        "
                      style={{
                        animationDelay: "0.2s",
                      }}
                    />

                    {/* DOT 3 */}

                    <span
                      className="
          w-3
          h-3
          rounded-full
          bg-green-400
          animate-bounce
        "
                      style={{
                        animationDelay: "0.4s",
                      }}
                    />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* IMAGE PREVIEW */}

          {selectedImage && (
            <div
              className="
                px-6
                pb-3
              "
            >
              <div className="max-w-4xl mx-auto">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="preview"
                  className="
                    w-32
                    rounded-2xl
                    border
                    border-white/10
                  "
                />
              </div>
            </div>
          )}

          {/* INPUT */}

          <div
            className="
              border-t
              border-white/10
              p-4
              shrink-0
              bg-[#050816]
              backdrop-blur-xl
            "
          >
            <div className="max-w-5xl mx-auto">
              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-white/[0.04]
                  border
                  border-white/10
                  rounded-3xl
                  px-4
                  py-3
                "
              >
                {/* INPUT */}

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Ask anything about farming..."
                  className="
                    flex-1
                    bg-transparent
                    outline-none
                    text-lg
                    text-white
                    placeholder:text-gray-500
                    px-2
                  "
                />

                {/* MIC */}

                <button
                  onClick={startListening}
                  className={`
                    w-12
                    h-12
                    rounded-2xl
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-xl
                    transition-all
                    duration-300
                    hover:scale-110

                    ${
                      listening
                        ? `
                          bg-red-500
                          text-white
                        `
                        : `
                          bg-white/[0.05]
                          hover:bg-red-500
                          hover:text-white
                        `
                    }
                  `}
                >
                  <FiMic />
                </button>

                {/* IMAGE */}

                <label
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-white/[0.05]
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    text-xl
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-blue-500
                    hover:text-white
                  "
                >
                  <FiImage />

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </label>

                {/* SEND */}

                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-green-500
                    hover:bg-green-400
                    hover:scale-110
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    text-black
                    text-xl
                  "
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            HISTORY PANEL
        ===================================== */}

        <div
          className={`
            fixed
            xl:relative
            top-0
            right-0
            h-screen
            w-[320px]
            bg-[#081120]
            border-l
            border-white/10
            z-50
            transition-transform
            duration-300
            flex
            flex-col

            ${
              historyOpen
                ? "translate-x-0"
                : "translate-x-full xl:translate-x-0"
            }
          `}
        >
          {/* HEADER */}

          <div
            className="
              p-5
              border-b
              border-white/10
              flex
              items-center
              justify-between
            "
          >
            <h2
              className="
                text-2xl
                font-black
              "
            >
              💬 Chats
            </h2>

            <button
              onClick={() => setHistoryOpen(false)}
              className="
                xl:hidden
                text-3xl
              "
            >
              <FiX />
            </button>
          </div>

          {/* NEW CHAT */}

          <div className="p-5">
            <button
              onClick={createNewChat}
              className="
                w-full
                bg-green-500
                hover:bg-green-400
                hover:scale-[1.02]
                transition-all
                duration-300
                text-black
                font-bold
                py-4
                rounded-2xl
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <FiPlus />
              New Chat
            </button>
          </div>

          {/* CHAT HISTORY */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-5
              pb-5
              space-y-3
              scrollbar-thin
              scrollbar-thumb-green-500
              scrollbar-track-transparent
            "
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className="
                    bg-white/[0.04]
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    gap-3
                    hover:bg-white/[0.06]
                    transition
                  "
              >
                <button
                  onClick={() => loadChat(chat.chat_id)}
                  className="
                      flex-1
                      text-left
                      truncate
                    "
                >
                  {chat.title || "New Chat"}
                </button>

                <button
                  onClick={() => deleteChat(chat.chat_id)}
                  className="
                      text-red-400
                      hover:text-red-300
                      transition
                    "
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chat;
