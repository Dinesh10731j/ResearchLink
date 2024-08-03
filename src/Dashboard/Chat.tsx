import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DarkModeContext } from '../context/DarkmodeContext';
import io from 'socket.io-client';

interface ChatMessage {
  message: string;
}

const socket = io();

const Chat: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ChatMessage>();
  const [messages, setMessages] = useState<string[]>([]);
  const context = useContext(DarkModeContext);

  if (context === null) {
    throw new Error('DarkModeContext must be used within a DarkModeProvider');
  }

  const { darkMode } = context;

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage: SubmitHandler<ChatMessage> = (data) => {
    if (data.message.trim() !== '') {
      socket.emit('chat message', data.message);
      reset();
    }
  };

  return (
    <div className={`flex flex-col h-screen mt-10 max-w-lg mx-auto border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`p-4 border-b ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-3 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} self-end`}>
            <p className="text-sm">{msg}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(sendMessage)} className={`flex p-4 border-t ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <input
          type="text"
          {...register('message', { required: true })}
          placeholder="Type a message"
          className={`flex-1 p-2 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'} focus:border-blue-500`}
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
