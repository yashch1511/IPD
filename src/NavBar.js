

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, MessageSquare, TrendingUp, Users, User, ChevronRight } from "lucide-react";
import { db, auth } from "./firebase"; 
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const TeamNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isTeamExpanded, setIsTeamExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(''); // State to hold the current user's name

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const usersList = querySnapshot.docs.map((doc) => doc.data().username);
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const getCurrentUser = async () => {
      const user = auth.currentUser;  // Get the current authenticated user
      console.log("Current authenticated user:", user); // Log the user object for debugging

      if (user) {
        try {
          // Get the user's Firestore document using the user's UID
          const userDocRef = doc(db, "users", user.uid);  // The document ID is the user's UID
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            // Document exists, so fetch the username from Firestore
            const username = docSnap.data().username;
            console.log("Fetched username:", username);  // Log the fetched username for debugging

            // Set the username in the state
            setCurrentUser(username || "Unnamed User");  // Use fallback text if username is not found
          } else {
            // If no document is found, set a default username
            console.log("No user document found for UID:", user.uid);
            setCurrentUser("Unnamed User");
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
          setCurrentUser("Unnamed User");
        }
      } else {
        // If no user is logged in, set as guest
        console.log("No user logged in");
        setCurrentUser("Guest");
      }
    };

    // Wait for Firebase to be initialized
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in, fetching data..."); // Debugging log for login state
        getCurrentUser(); // Fetch user details when logged in
      } else {
        console.log("No user logged in");
        setCurrentUser("Guest"); // Set as Guest when not logged in
      }
    });

    fetchUsers(); // Fetch the list of users
    return () => unsubscribe(); // Cleanup the listener
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav
        className={`h-screen bg-slate-900 border-r border-slate-700 fixed left-0 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo and Toggle */}
          <div className="p-4 flex items-center justify-between border-b border-slate-700">
            {isOpen && (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                TeamSpace
              </span>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-cyan-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Team Members */}
          <div className="flex-1 py-4 overflow-y-auto">
            <div className="mb-4">
              <button
                onClick={() => setIsTeamExpanded(!isTeamExpanded)}
                className="w-full p-4 flex items-center text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
              >
                <Users size={20} />
                {isOpen && (
                  <>
                    <span className="ml-4">Team</span>
                    <ChevronRight
                      size={16}
                      className={`ml-auto transform transition-transform ${
                        isTeamExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </>
                )}
              </button>
              {isOpen && isTeamExpanded && (
                <div className="bg-slate-800/50 py-2">
                  {users.map((user, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 border-l-4 border-transparent hover:border-cyan-500"
                    >
                      <p className="font-medium text-slate-300">{user}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <Link
              to="/Announcements"
              className="w-full p-4 flex items-center text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              <Bell size={20} />
              {isOpen && <span className="ml-4">Announcements</span>}
            </Link>
            <Link
              to="/Chatroom"
              className="w-full p-4 flex items-center text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              <MessageSquare size={20} />
              {isOpen && <span className="ml-4">Chatroom</span>}
            </Link>
            <Link
              to="/Project"
              className="w-full p-4 flex items-center text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              <TrendingUp size={20} />
              {isOpen && <span className="ml-4">Project</span>}
            </Link>
          </div>

          {/* Current User Display */}
          <div className="border-t border-slate-700 p-4 bg-slate-800/50">
            <div className="flex items-center text-slate-300">
              <User size={20} />
              {isOpen && <span className="ml-4 truncate">{currentUser}</span>}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}
      >
        <div className="p-4">
          {/* Placeholder for dynamic content */}
        </div>
      </div>
    </div>
  );
};

export default TeamNavbar;
