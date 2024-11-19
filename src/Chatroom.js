// import React, { useState, useEffect } from 'react';
// import { db, auth } from './firebase';
// import { collection, query, where, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
// import './Chatroom.css';

// const Chatroom = () => {
//   const [chatrooms, setChatrooms] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const q = query(collection(db, 'chatrooms'));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const chatroomsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setChatrooms(chatroomsData);

//         // Set the messages for the first chatroom by default if exists
//         if (chatroomsData.length > 0) {
//           const firstChatroomId = chatroomsData[0].id;
//           loadMessages(firstChatroomId);
//         }
//       });
//       return unsubscribe;
//     }
//   }, [user]);

//   const loadMessages = (chatroomId) => {
//     const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);
//     const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
//       const messagesData = snapshot.docs.map((doc) => doc.data());
//       setMessages(messagesData);
//     });
//     return unsubscribe;
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim() && user) {
//       try {
//         const chatroomId = chatrooms[0]?.id; // Use the first chatroom or selected chatroom ID
//         if (!chatroomId) return;

//         await addDoc(collection(db, `chatrooms/${chatroomId}/messages`), {
//           userId: user.uid,
//           message: newMessage,
//           timestamp: serverTimestamp(),
//         });

//         setNewMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   return (
//     <div className="chatroom">
//       <h1>Chatroom</h1>
//       <div className="chatbox">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.userId === user?.uid ? 'my-message' : ''}`}>
//             <p>
//               <strong>{msg.userId === user?.uid ? 'You' : msg.userId}</strong>: {msg.message}
//             </p>
//           </div>
//         ))}
//       </div>
//       <textarea
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chatroom;




// import React, { useState, useEffect } from 'react';
// import { db, auth } from './firebase';
// import { collection, query, where, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

// const Chatroom = () => {
//   const [chatrooms, setChatrooms] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const q = query(collection(db, 'chatrooms'));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const chatroomsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setChatrooms(chatroomsData);

//         if (chatroomsData.length > 0) {
//           const firstChatroomId = chatroomsData[0].id;
//           loadMessages(firstChatroomId);
//         }
//       });
//       return unsubscribe;
//     }
//   }, [user]);

//   const loadMessages = (chatroomId) => {
//     const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);
//     const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
//       const messagesData = snapshot.docs.map((doc) => doc.data());
//       setMessages(messagesData);
//     });
//     return unsubscribe;
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim() && user) {
//       try {
//         const chatroomId = chatrooms[0]?.id;
//         if (!chatroomId) return;

//         await addDoc(collection(db, `chatrooms/${chatroomId}/messages`), {
//           userId: user.uid,
//           message: newMessage,
//           timestamp: serverTimestamp(),
//         });

//         setNewMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = timestamp.toDate();
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="h-16 bg-white shadow-sm flex items-center px-6">
//         <div className="flex items-center space-x-4">
//           <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
//             {user?.email?.[0]?.toUpperCase() || 'U'}
//           </div>
//           <h1 className="text-xl font-semibold text-gray-800">Chat Room</h1>
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4">
//         {messages.map((msg, index) => {
//           const isMyMessage = msg.userId === user?.uid;
//           return (
//             <div
//               key={index}
//               className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
//             >
//               <div className="flex flex-col">
//                 <div
//                   className={`max-w-[600px] rounded-2xl px-4 py-2 ${
//                     isMyMessage
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-white shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-baseline mb-1">
//                     <span className={`text-sm font-medium ${isMyMessage ? 'text-blue-100' : 'text-gray-600'}`}>
//                       {isMyMessage ? 'You' : msg.userId}
//                     </span>
//                     <span className={`text-xs ml-2 ${isMyMessage ? 'text-blue-200' : 'text-gray-400'}`}>
//                       {formatTime(msg.timestamp)}
//                     </span>
//                   </div>
//                   <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
//                     {msg.message}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Input Area */}
//       <div className="bg-white border-t border-gray-200 p-4">
//         <div className="max-w-[900px] mx-auto flex gap-3">
//           <textarea
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type a message..."
//             className="flex-1 resize-none rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[50px] max-h-[150px] bg-gray-50"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               className="w-5 h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M2 21l21-9L2 3v7l15 2-15 2v7z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatroom;




// import React, { useState, useEffect } from 'react';
// import { db, auth } from './firebase';
// import { collection, query, where, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

// const Chatroom = () => {
//   const [chatrooms, setChatrooms] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const q = query(collection(db, 'chatrooms'));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const chatroomsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setChatrooms(chatroomsData);

//         if (chatroomsData.length > 0) {
//           const firstChatroomId = chatroomsData[0].id;
//           loadMessages(firstChatroomId);
//         }
//       });
//       return unsubscribe;
//     }
//   }, [user]);

//   const loadMessages = (chatroomId) => {
//     const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);
//     const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
//       const messagesData = snapshot.docs.map((doc) => doc.data());
//       setMessages(messagesData);
//     });
//     return unsubscribe;
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim() && user) {
//       try {
//         const chatroomId = chatrooms[0]?.id;
//         if (!chatroomId) return;

//         await addDoc(collection(db, `chatrooms/${chatroomId}/messages`), {
//           userId: user.uid,
//           message: newMessage,
//           timestamp: serverTimestamp(),
//         });

//         setNewMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = timestamp.toDate();
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
//       {/* Header */}
//       <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg border-b border-purple-100">
//         <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between px-6">
//           <div className="flex items-center space-x-4">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-lg">
//               {user?.email?.[0]?.toUpperCase() || 'U'}
//             </div>
//             <div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 ChatSpace
//               </h1>
//               <p className="text-xs text-gray-500">{messages.length} messages</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">
//               <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
//               Online
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4">
//         <div className="max-w-[1200px] mx-auto space-y-6">
//           {messages.map((msg, index) => {
//             const isMyMessage = msg.userId === user?.uid;
//             return (
//               <div
//                 key={index}
//                 className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} animate-fade-in`}
//               >
//                 {!isMyMessage && (
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-sm font-medium shadow-md mr-2">
//                     {msg.userId[0]?.toUpperCase()}
//                   </div>
//                 )}
//                 <div className="flex flex-col">
//                   <div
//                     className={`max-w-[600px] rounded-2xl px-6 py-3 ${
//                       isMyMessage
//                         ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
//                         : 'bg-white shadow-md border border-purple-100'
//                     }`}
//                   >
//                     <div className="flex items-baseline mb-1">
//                       <span className={`text-sm font-medium ${isMyMessage ? 'text-purple-100' : 'text-purple-600'}`}>
//                         {isMyMessage ? 'You' : msg.userId}
//                       </span>
//                       <span className={`text-xs ml-2 ${isMyMessage ? 'text-purple-200' : 'text-purple-400'}`}>
//                         {formatTime(msg.timestamp)}
//                       </span>
//                     </div>
//                     <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
//                       {msg.message}
//                     </p>
//                   </div>
//                 </div>
//                 {isMyMessage && (
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium shadow-md ml-2">
//                     {user.email[0]?.toUpperCase()}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Input Area */}
//       <div className="bg-white bg-opacity-90 backdrop-blur-lg border-t border-purple-100">
//         <div className="max-w-[1200px] mx-auto p-4">
//           <div className="flex gap-3">
//             <textarea
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Type a message..."
//               className="flex-1 resize-none rounded-2xl border border-purple-200 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[50px] max-h-[150px] bg-white shadow-inner text-gray-700 placeholder-gray-400"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M2 21l21-9L2 3v7l15 2-15 2v7z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Chatroom;




import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy, getDocs } from 'firebase/firestore';

const Chatroom = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [usernames, setUsernames] = useState({});  // Store usernames by userId

  // Listen to user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  // Fetch chatrooms and load messages
  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'chatrooms'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatroomsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChatrooms(chatroomsData);

        // Load messages for the first chatroom
        if (chatroomsData.length > 0) {
          const firstChatroomId = chatroomsData[0].id;
          loadMessages(firstChatroomId);
          fetchAllUsernames();  // Fetch all usernames for the entire system once
        }
      });
      return unsubscribe;
    }
  }, [user]);

  // Fetch all usernames from 'users' collection
  const fetchAllUsernames = async () => {
    try {
      console.log('Fetching all usernames...');
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const usersData = snapshot.docs.map((doc) => doc.data());
      const usernamesMapping = {};
      
      // Map userId to username
      usersData.forEach(user => {
        usernamesMapping[user.uid] = user.username;  // Fix user ID key as 'uid'
      });

      console.log('Usernames fetched:', usernamesMapping);
      setUsernames(usernamesMapping);  // Store usernames in the state
    } catch (err) {
      console.error('Error fetching usernames:', err);
    }
  };

  // Load messages for the selected chatroom
  const loadMessages = (chatroomId) => {
    const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);

    // Order messages by timestamp (ascending)
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => doc.data());
      console.log('Messages loaded:', messagesData);
      setMessages(messagesData);  // Set messages directly as they are ordered
    });
    return unsubscribe;
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && user) {
      try {
        const chatroomId = chatrooms[0]?.id;
        if (!chatroomId) return;

        await addDoc(collection(db, `chatrooms/${chatroomId}/messages`), {
          userId: user.uid,  // Store user UID in the message
          message: newMessage,
          timestamp: serverTimestamp(),
        });

        setNewMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render the messages
  return (
    <div className="h-screen min-w-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 -ml-8">
      {/* Header */}
      <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                ChatSpace
              </h1>
              <p className="text-xs text-slate-400">{messages.length} messages</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></span>
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {messages.map((msg, index) => {
            const isMyMessage = msg.userId === user?.uid;
            const username = usernames[msg.userId] || 'Loading...';  // Use username or loading text if not fetched yet
            console.log('Rendering message:', msg);
            return (
              <div
                key={index}
                className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {!isMyMessage && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium mr-2">
                    {username[0]?.toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <div
                    className={`max-w-[600px] rounded-xl px-6 py-3 ${isMyMessage ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-slate-800/50 border border-slate-700 text-slate-300'}`}
                  >
                    <div className="flex items-baseline mb-1">
                      <span className={`text-sm font-medium ${isMyMessage ? 'text-slate-100' : 'text-cyan-400'}`}>
                        {isMyMessage ? 'You' : username}  {/* Display username */}
                      </span>
                      <span className={`text-xs ml-2 ${isMyMessage ? 'text-slate-200' : 'text-slate-400'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
                {isMyMessage && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium ml-2">
                    {user.email[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-900/95 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-[1200px] mx-auto p-4">
          <div className="flex gap-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 resize-none rounded-xl border border-slate-700 p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-h-[50px] max-h-[150px] bg-slate-800/50 text-slate-300 placeholder-slate-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
