// src/components/Chatbot.js
import { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi! I am BookMySeat Assistant. Ask me anything about movies, tickets, seats or snacks.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', text: 'API Key is missing. Please check your .env file.' },
        ]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are a friendly assistant for BookMySeat cinema booking website.
Answer only about movies, tickets, seats, snacks and booking.
Keep answers short, simple and helpful.
Reply only in plain text. Do not use bold, italics, stars, markdown or any special characters.
Write in normal sentences only.

User: ${userMessage}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log('Gemini Response:', data);

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', text: `Error: ${data.error.message}` },
        ]);
      } else {
        const botReply =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Sorry, I could not generate a reply.';

        setMessages((prev) => [...prev, { role: 'bot', text: botReply }]);
      }
    } catch (error) {
      console.error('Chatbot Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Network error. Please try again.' },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Floating Button - moved higher */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-50 w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition"
      >
        {isOpen ? <span className="text-2xl">×</span> : <span className="text-2xl">💬</span>}
      </button>

      {/* Chat Window - moved higher */}
      {isOpen && (
        <div className="fixed bottom-36 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold">BookMySeat Assistant</p>
              <p className="text-xs text-gray-300">Ask about movies & booking</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl">
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-80 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-black text-white rounded-br-sm'
                      : 'bg-white text-black border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl text-sm text-gray-500">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about movies..."
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
