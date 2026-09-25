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
  const messagesContainerRef = useRef(null);

  // Smoothly scroll to latest message
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setInput('');

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: 'API Key is missing. Please check your .env file.',
          },
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
                    text: `
You are BookMySeat Assistant, an AI assistant for a movie ticket booking website.

The user can ask about movies, movie stories, actors, directors, tickets, seats, theatres, shows or snacks.

For movie questions:
Give accurate and natural information about the movie.
If the movie has already been released, talk about the actual movie.
Do not automatically call a movie "upcoming".
Do not invent a story, actors, director, release date or other movie information.
If you are not sure about a specific fact, do not make it up.

Keep the answer short and attractive.
Give only 2 or 3 simple sentences.

After describing a movie, add:
"Ready to watch? Book your seat now!"

For general booking questions, answer shortly and clearly.

Do not use markdown.
Do not use bullet points.
Do not use headings.
Do not use stars.
Do not use special formatting.

User message:
${userMessage}
                    `,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: 'Sorry, I could not process your request. Please try again.',
          },
        ]);
      } else {
        const botReply =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Sorry, I could not generate a reply.';

        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: botReply.trim(),
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Network error. Please try again.',
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-50 w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition"
      >
        {isOpen ? (
          <span className="text-2xl">×</span>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>

      {/* Chat Window */}

      {isOpen && (
        <div className="fixed bottom-36 right-6 z-50 w-80 sm:w-96 h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">

          {/* Header */}

          <div className="bg-black text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="font-semibold">
                BookMySeat Assistant
              </p>

              <p className="text-xs text-gray-300">
                Ask about movies & booking
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl hover:text-gray-300 transition"
            >
              ×
            </button>
          </div>

          {/* Messages */}

          <div
            ref={messagesContainerRef}
            className="flex-1 min-h-0 p-4 overflow-y-auto scroll-smooth space-y-3 bg-gray-50"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#9ca3af #f3f4f6',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-black text-white rounded-br-sm'
                      : 'bg-white text-black border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  {msg.text}

                  {/* Book Button */}

                  {msg.role === 'bot' &&
                    index > 0 &&
                    !msg.text.includes('API Key') &&
                    !msg.text.includes('Network error') &&
                    !msg.text.includes('could not') && (
                      <button
                        onClick={() => {
                          window.location.href = '/movies';
                        }}
                        className="mt-3 w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                      >
                        Book a Seat
                      </button>
                    )}
                </div>
              </div>
            ))}

            {/* Loading */}

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

          <div className="p-3 border-t border-gray-200 flex gap-2 bg-white flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
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
