import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, query, where, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import './Chatroom.css';

const Chatroom = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'chatrooms'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatroomsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChatrooms(chatroomsData);

        // Set the messages for the first chatroom by default if exists
        if (chatroomsData.length > 0) {
          const firstChatroomId = chatroomsData[0].id;
          loadMessages(firstChatroomId);
        }
      });
      return unsubscribe;
    }
  }, [user]);

  const loadMessages = (chatroomId) => {
    const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => doc.data());
      setMessages(messagesData);
    });
    return unsubscribe;
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && user) {
      try {
        const chatroomId = chatrooms[0]?.id; // Use the first chatroom or selected chatroom ID
        if (!chatroomId) return;

        await addDoc(collection(db, `chatrooms/${chatroomId}/messages`), {
          userId: user.uid,
          message: newMessage,
          timestamp: serverTimestamp(),
        });

        setNewMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div className="chatroom">
      <h1>Chatroom</h1>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.userId === user?.uid ? 'my-message' : ''}`}>
            <p>
              <strong>{msg.userId === user?.uid ? 'You' : msg.userId}</strong>: {msg.message}
            </p>
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatroom;
