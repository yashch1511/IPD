import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import './Announcements.css';

const Announcements = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch current user's role from Firestore
  const fetchUserRole = async (userId) => {
    const userRef = doc(db, 'users', userId); // Assuming users collection contains user data
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

      // Only allow teacher to add announcements
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
    <div className="announcement-container">
      <h1>Announcements</h1>
      
      {/* Only show input and button for teachers */}
      {user?.email && (
        <div>
          <h2>Logged in as: {user.email}</h2>
          {user.email === 'teacher@example.com' && (
            <div>
              <input 
                type="text" 
                value={announcement} 
                onChange={(e) => setAnnouncement(e.target.value)} 
                placeholder="New Announcement"
              />
              <button onClick={handleAddAnnouncement}>Add Announcement</button>
            </div>
          )}
        </div>
      )}

      <ul>
        {announcements.map((announcement, index) => (
          <li key={index}>
            <p><strong>Announcement:</strong> {announcement.content}</p>
            <p><strong>Teacher ID:</strong> {announcement.teacherId}</p>
            <p><strong>Timestamp:</strong> {new Date(announcement.timestamp.seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
