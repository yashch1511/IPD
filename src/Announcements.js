


import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc, setDoc, query, orderBy } from 'firebase/firestore';

const Announcements = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch user role from Firestore or create a new user document if not found
  const fetchUserRole = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      console.log('Fetched user role from Firestore:', role);  // Log the role fetched
      return role;
    } else {
      console.log("No such document! Creating new user document.");
      try {
        // Check if the logged-in user is a teacher based on the email
        const role = user?.email === 'teacher@example.com' ? 'teacher' : 'student';
        await setDoc(userRef, { role });
        console.log('User document created with role:', role);  // Log the created role
        return role;
      } catch (error) {
        console.error('Error creating user document:', error);
        return null;
      }
    }
  };

  // Fetch announcements from Firestore, sorted by timestamp (newest first)
  const fetchAnnouncements = async () => {
    const q = query(collection(db, 'announcements'), orderBy('timestamp', 'desc'));  // Sort by timestamp descending
    const querySnapshot = await getDocs(q);
    
    // Fetching the usernames for each announcement
    const announcementsData = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const userRef = doc(db, 'users', data.teacherId); // Fetch user document for teacherId
        const userSnap = await getDoc(userRef);
        let username = "Unknown"; // Default fallback if username doesn't exist
        if (userSnap.exists()) {
          const userData = userSnap.data();
          username = userData.name || "No Name"; // Fallback if 'name' field doesn't exist
        } else {
          console.log("User document not found for teacherId:", data.teacherId);
        }

        return { ...data, username }; // Include the username in the announcement data
      })
    );

    console.log("Fetched Announcements with Usernames:", announcementsData); // Log fetched data for debugging
    setAnnouncements(announcementsData); // Set the announcements with usernames
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchAnnouncements(); // Fetch announcements initially
  }, []);

  const handleAddAnnouncement = async () => {
    if (user) {
      const role = await fetchUserRole(user.uid);
      console.log('User role when posting announcement:', role);  // Log the role during posting

      if (role === 'teacher') {
        try {
          // Add new announcement to Firestore
          await addDoc(collection(db, 'announcements'), {
            content: announcement,
            timestamp: new Date(),
            teacherId: user.uid
          });

          setAnnouncement(''); // Clear the input field

          // After adding the new announcement, fetch the updated announcements list
          fetchAnnouncements();
        } catch (err) {
          console.error('Error adding announcement:', err);
        }
      } else {
        console.error('Only teachers can add announcements');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 -ml-8">
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
                    <p className="text-slate-300">{announcement.username}</p> {/* Display username */}
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
