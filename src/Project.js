




import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, query, updateDoc, doc, orderBy, getDocs } from 'firebase/firestore';

const Project = () => {
  const [progressSteps, setProgressSteps] = useState([false, false, false, false]);
  const [projects, setProjects] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [user, setUser] = useState(null);
  const [usernames, setUsernames] = useState({}); // To store the username by studentId

  // Listen to user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  // Fetch all usernames for the system
  useEffect(() => {
    const fetchUsernames = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const usersData = snapshot.docs.reduce((acc, doc) => {
        const userData = doc.data();
        acc[userData.uid] = userData.username;
        return acc;
      }, {});
      setUsernames(usersData);
    };

    fetchUsernames();
  }, []);

  // Fetch projects with sorted timestamps (newest first)
  useEffect(() => {
    const fetchProjects = () => {
      const q = query(collection(db, 'projectProgress'), orderBy('timestamp', 'desc')); // Order by timestamp descending
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setProjects(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
      return unsubscribe;
    };
    fetchProjects();
  }, []);

  const handleProgressClick = (index) => {
    const updatedSteps = [...progressSteps];
    updatedSteps[index] = !updatedSteps[index];
    setProgressSteps(updatedSteps);
  };

  const handleAddProjectProgress = async () => {
    if (!user || user.email.includes('teacher')) return;

    const progressText = progressSteps.every((step) => step)
      ? 'Task Completed'
      : `Progress: ${progressSteps.filter((step) => step).length}/4`;

    try {
      await addDoc(collection(db, 'projectProgress'), {
        studentId: user.uid,  // Store user UID here
        progress: progressText,
        steps: progressSteps,
        timestamp: new Date(),
        description: newDescription,
      });
      setProgressSteps([false, false, false, false]);
      setNewDescription('');
    } catch (err) {
      console.error('Error adding project progress:', err);
    }
  };

  const handleUpdateProjectProgress = async (projectId, updatedSteps) => {
    const projectRef = doc(db, 'projectProgress', projectId);
    try {
      await updateDoc(projectRef, {
        steps: updatedSteps,
      });
    } catch (err) {
      console.error('Error updating project progress:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white -ml-8">
      <div className="flex h-screen">
        {/* Left Sidebar - Current Progress */}
        <div className="w-1/3 border-r border-slate-700 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Project Progress
          </h1>

          {user && !user.email.includes('teacher') && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-4 text-cyan-400">Current Progress</h2>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {progressSteps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => handleProgressClick(index)}
                      className={`h-16 rounded-lg font-medium transition-all duration-300
                        ${step ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' : 
                          'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                    >
                      Step {index + 1}
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Describe your progress..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg mb-4 h-32 
                    focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-white 
                    placeholder-slate-400"
                />

                <button
                  onClick={handleAddProjectProgress}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg 
                    font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 
                    shadow-lg shadow-cyan-500/20"
                >
                  Submit Progress
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - All Projects */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">All Project Progress</h2>
          <div className="grid grid-cols-1 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => {
                const studentUsername = usernames[project.studentId] || 'Loading...'; // Get username
                return (
                  <div key={project.id} className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {project.steps?.map((step, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const updatedSteps = [...project.steps];
                            updatedSteps[index] = !updatedSteps[index];
                            handleUpdateProjectProgress(project.id, updatedSteps);
                          }}
                          className={`h-12 rounded-lg font-medium transition-all duration-300
                            ${step ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' : 
                              'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                        >
                          Step {index + 1}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <h3 className="font-semibold text-cyan-400 mb-2">Description</h3>
                        <p className="text-slate-300">{project.description || 'No description provided'}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <h3 className="font-semibold text-cyan-400 mb-1">Issued by</h3>
                          <p className="text-slate-300">{studentUsername}</p> {/* Display username */}
                        </div>

                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <h3 className="font-semibold text-cyan-400 mb-1">Timestamp</h3>
                          <p className="text-slate-300">
                            {new Date(project.timestamp?.seconds * 1000).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-800/50 rounded-xl p-8 text-center text-slate-400 backdrop-blur-sm border border-slate-700">
                No project progress submitted yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
