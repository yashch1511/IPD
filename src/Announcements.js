// import React, { useState, useEffect } from 'react';
// import { db, auth } from './firebase';
// import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
// import './Announcements.css';

// const Announcements = () => {
//   const [announcement, setAnnouncement] = useState('');
//   const [announcements, setAnnouncements] = useState([]);
//   const [user, setUser] = useState(null);

//   // Fetch current user's role from Firestore
//   const fetchUserRole = async (userId) => {
//     const userRef = doc(db, 'users', userId); // Assuming users collection contains user data
//     const docSnap = await getDoc(userRef);

//     if (docSnap.exists()) {
//       return docSnap.data().role;
//     } else {
//       console.log("No such document!");
//       return null;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       const querySnapshot = await getDocs(collection(db, 'announcements'));
//       setAnnouncements(querySnapshot.docs.map(doc => doc.data()));
//     };
//     fetchAnnouncements();
//   }, []);

//   const handleAddAnnouncement = async () => {
//     if (user) {
//       const role = await fetchUserRole(user.uid);

//       // Only allow teacher to add announcements
//       if (role === 'teacher') {
//         try {
//           await addDoc(collection(db, 'announcements'), { 
//             content: announcement, 
//             timestamp: new Date(),
//             teacherId: user.uid 
//           });
//           setAnnouncement('');
//         } catch (err) {
//           console.error('Error adding announcement:', err);
//         }
//       } else {
//         console.error('Only teachers can add announcements');
//       }
//     }
//   };

//   return (
//     <div className="announcement-container">
//       <h1>Announcements</h1>
      
//       {/* Only show input and button for teachers */}
//       {user?.email && (
//         <div>
//           <h2>Logged in as: {user.email}</h2>
//           {user.email === 'teacher@example.com' && (
//             <div>
//               <input 
//                 type="text" 
//                 value={announcement} 
//                 onChange={(e) => setAnnouncement(e.target.value)} 
//                 placeholder="New Announcement"
//               />
//               <button onClick={handleAddAnnouncement}>Add Announcement</button>
//             </div>
//           )}
//         </div>
//       )}

//       <ul>
//         {announcements.map((announcement, index) => (
//           <li key={index}>
//             <p><strong>Announcement:</strong> {announcement.content}</p>
//             <p><strong>Teacher ID:</strong> {announcement.teacherId}</p>
//             <p><strong>Timestamp:</strong> {new Date(announcement.timestamp.seconds * 1000).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Announcements;





// import React, { useState, useEffect } from 'react';
// import { db, auth } from './firebase';
// import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';

// const Announcements = () => {
//   const [announcement, setAnnouncement] = useState('');
//   const [announcements, setAnnouncements] = useState([]);
//   const [user, setUser] = useState(null);

//   // Fetch current user's role from Firestore
//   const fetchUserRole = async (userId) => {
//     const userRef = doc(db, 'users', userId);
//     const docSnap = await getDoc(userRef);
    
//     if (docSnap.exists()) {
//       return docSnap.data().role;
//     } else {
//       console.log("No such document!");
//       return null;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       const querySnapshot = await getDocs(collection(db, 'announcements'));
//       setAnnouncements(querySnapshot.docs.map(doc => doc.data()));
//     };
//     fetchAnnouncements();
//   }, []);

//   const handleAddAnnouncement = async () => {
//     if (user) {
//       const role = await fetchUserRole(user.uid);
      
//       if (role === 'teacher') {
//         try {
//           await addDoc(collection(db, 'announcements'), {
//             content: announcement,
//             timestamp: new Date(),
//             teacherId: user.uid
//           });
//           setAnnouncement('');
//         } catch (err) {
//           console.error('Error adding announcement:', err);
//         }
//       } else {
//         console.error('Only teachers can add announcements');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
//       <div className="flex h-screen">
//         {/* Left Sidebar - Add Announcement */}
//         <div className="w-1/3 border-r border-slate-700 p-8 overflow-y-auto">
//           <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
//             Announcements
//           </h1>

//           {user?.email && (
//             <div className="space-y-6">
//               <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
//                 <p className="text-slate-300 mb-4">
//                   Logged in as: <span className="text-cyan-400">{user.email}</span>
//                 </p>

//                 {user.email === 'teacher@example.com' && (
//                   <div className="space-y-4">
//                     <textarea
//                       value={announcement}
//                       onChange={(e) => setAnnouncement(e.target.value)}
//                       placeholder="Type your announcement..."
//                       className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg h-32 
//                         focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-white 
//                         placeholder-slate-400"
//                     />
//                     <button
//                       onClick={handleAddAnnouncement}
//                       className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg 
//                         font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 
//                         shadow-lg shadow-cyan-500/20"
//                     >
//                       Post Announcement
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Side - All Announcements */}
//         <div className="flex-1 p-8 overflow-y-auto">
//           <h2 className="text-2xl font-semibold mb-6 text-cyan-400">All Announcements</h2>
//           <div className="grid grid-cols-1 gap-6">
//             {announcements.length > 0 ? (
//               announcements.map((announcement, index) => (
//                 <div
//                   key={index}
//                   className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700"
//                 >
//                   <div className="space-y-4">
//                     <div className="bg-slate-700/50 rounded-lg p-4">
//                       <p className="text-slate-300">{announcement.content}</p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-slate-700/50 rounded-lg p-4">
//                         <h3 className="font-semibold text-cyan-400 mb-1">Posted by</h3>
//                         <p className="text-slate-300">{announcement.teacherId}</p>
//                       </div>

//                       <div className="bg-slate-700/50 rounded-lg p-4">
//                         <h3 className="font-semibold text-cyan-400 mb-1">Timestamp</h3>
//                         <p className="text-slate-300">
//                           {new Date(announcement.timestamp.seconds * 1000).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="bg-slate-800/50 rounded-xl p-8 text-center text-slate-400 backdrop-blur-sm border border-slate-700">
//                 No announcements posted yet.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Announcements;




// import React, { useState, useEffect } from 'react';
// import { db, auth } from './firebase';
// import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';

// const Announcements = () => {
//   const [announcement, setAnnouncement] = useState('');
//   const [announcements, setAnnouncements] = useState([]);
//   const [user, setUser] = useState(null);

//   // Fetch current user's role from Firestore
//   const fetchUserRole = async (userId) => {
//     const userRef = doc(db, 'users', userId);
//     const docSnap = await getDoc(userRef);
    
//     if (docSnap.exists()) {
//       return docSnap.data().role;
//     } else {
//       console.log("No such document!");
//       return null;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       const querySnapshot = await getDocs(collection(db, 'announcements'));
//       setAnnouncements(querySnapshot.docs.map(doc => doc.data()));
//     };
//     fetchAnnouncements();
//   }, []);

//   const handleAddAnnouncement = async () => {
//     if (user) {
//       const role = await fetchUserRole(user.uid);
      
//       if (role === 'teacher') {
//         try {
//           await addDoc(collection(db, 'announcements'), {
//             content: announcement,
//             timestamp: new Date(),
//             teacherId: user.uid
//           });
//           setAnnouncement('');
//         } catch (err) {
//           console.error('Error adding announcement:', err);
//         }
//       } else {
//         console.error('Only teachers can add announcements');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
//       <div className="flex h-screen">
//         {/* Left Sidebar - Add Announcement */}
//         <div className="w-1/3 border-r border-slate-700 p-8 overflow-y-auto">
//           <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
//             Announcements
//           </h1>

//           {user?.email === 'teacher@example.com' && (
//             <div className="space-y-6">
//               <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
//                 <div className="space-y-4">
//                   <textarea
//                     value={announcement}
//                     onChange={(e) => setAnnouncement(e.target.value)}
//                     placeholder="Type your announcement..."
//                     className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg h-32 
//                       focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-white 
//                       placeholder-slate-400"
//                   />
//                   <button
//                     onClick={handleAddAnnouncement}
//                     className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg 
//                       font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 
//                       shadow-lg shadow-cyan-500/20"
//                   >
//                     Post Announcement
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Side - All Announcements */}
//         <div className="flex-1 p-8 overflow-y-auto">
//           <h2 className="text-2xl font-semibold mb-6 text-cyan-400">All Announcements</h2>
//           <div className="grid grid-cols-1 gap-6">
//             {announcements.length > 0 ? (
//               announcements.map((announcement, index) => (
//                 <div
//                   key={index}
//                   className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700"
//                 >
//                   <div className="space-y-4">
//                     <div className="bg-slate-700/50 rounded-lg p-4">
//                       <p className="text-slate-300">{announcement.content}</p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-slate-700/50 rounded-lg p-4">
//                         <h3 className="font-semibold text-cyan-400 mb-1">Posted by</h3>
//                         <p className="text-slate-300">{announcement.teacherId}</p>
//                       </div>

//                       <div className="bg-slate-700/50 rounded-lg p-4">
//                         <h3 className="font-semibold text-cyan-400 mb-1">Timestamp</h3>
//                         <p className="text-slate-300">
//                           {new Date(announcement.timestamp.seconds * 1000).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="bg-slate-800/50 rounded-xl p-8 text-center text-slate-400 backdrop-blur-sm border border-slate-700">
//                 No announcements posted yet.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Announcements;

import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import './Announcements.css';

const Announcements = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUserRole = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().role;
    } else {
      console.log("No such document!");
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const querySnapshot = await getDocs(collection(db, 'announcements'));
      setAnnouncements(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchAnnouncements();
  }, []);

  const handleAddAnnouncement = async () => {
    if (user) {
      const role = await fetchUserRole(user.uid);

      if (role === 'teacher') {
        try {
          await addDoc(collection(db, 'announcements'), {
            content: announcement,
            timestamp: new Date(),
            teacherId: user.uid
          });
          setAnnouncement('');
        } catch (err) {
          console.error('Error adding announcement:', err);
        }
      } else {
        console.error('Only teachers can add announcements');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          Announcements
        </h1>

        {user?.email === 'teacher@example.com' && (
          <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-8">
            <div className="space-y-4">
              <textarea
                placeholder="Type your announcement here..."
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg
                  focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-white 
                  placeholder-slate-400 h-32"
              />
              <button 
                onClick={handleAddAnnouncement}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg 
                  font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 
                  shadow-lg shadow-cyan-500/20"
              >
                Post Announcement
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <div 
                key={index} 
                className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700"
              >
                <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                  <p className="text-slate-300">{announcement.content}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="font-semibold text-cyan-400 mb-1">Posted by</h3>
                    <p className="text-slate-300">{announcement.teacherId}</p>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="font-semibold text-cyan-400 mb-1">Date & Time</h3>
                    <p className="text-slate-300">
                      {new Date(announcement.timestamp.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-800/50 rounded-xl p-8 text-center text-slate-400 backdrop-blur-sm border border-slate-700">
              No announcements posted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;