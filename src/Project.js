// import React, { useState, useEffect } from 'react';
// import { db, auth } from './firebase';
// import { collection, addDoc, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
// import './Project.css';

// const Project = () => {
//   const [progressSteps, setProgressSteps] = useState([false, false, false, false]);
//   const [projects, setProjects] = useState([]);
//   const [newDescription, setNewDescription] = useState('');
//   const [user, setUser] = useState(null);

//   // Monitor authentication state
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   // Fetch project progress from Firestore
//   useEffect(() => {
//     const fetchProjects = () => {
//       const q = query(collection(db, 'projectProgress'));
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         setProjects(
//           querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//         );
//       });
//       return unsubscribe;
//     };
//     fetchProjects();
//   }, []);

//   // Handle progress column click (for the current project being worked on)
//   const handleProgressClick = (index) => {
//     const updatedSteps = [...progressSteps];
//     updatedSteps[index] = !updatedSteps[index];  // Toggle the step
//     setProgressSteps(updatedSteps);
//   };

//   // Add project progress to Firestore
//   const handleAddProjectProgress = async () => {
//     if (!user || user.email.includes('teacher')) return;

//     const progressText = progressSteps.every((step) => step)
//       ? 'Task Completed'
//       : `Progress: ${progressSteps.filter((step) => step).length}/4`;

//     try {
//       await addDoc(collection(db, 'projectProgress'), {
//         studentId: user.uid,
//         progress: progressText,
//         steps: progressSteps,
//         timestamp: new Date(),
//         description: newDescription,
//       });
//       setProgressSteps([false, false, false, false]); // Reset progress
//       setNewDescription(''); // Clear description after submission
//     } catch (err) {
//       console.error('Error adding project progress:', err);
//     }
//   };

//   // Handle update to an existing project progress
//   const handleUpdateProjectProgress = async (projectId, updatedSteps) => {
//     const projectRef = doc(db, 'projectProgress', projectId);
//     try {
//       await updateDoc(projectRef, {
//         steps: updatedSteps,
//       });
//     } catch (err) {
//       console.error('Error updating project progress:', err);
//     }
//   };

//   return (
//     <div className="project-container">
//       <h1>Project Progress</h1>
//       {user && !user.email.includes('teacher') && (
//         <>
//           {/* Individual progress bar for the current user */}
//           <div className="progress-bar">
//             {progressSteps.map((step, index) => (
//               <div
//                 key={index}
//                 className={`progress-column ${step ? 'active' : ''}`}
//                 onClick={() => handleProgressClick(index)}
//               />
//             ))}
//           </div>
//           <textarea
//             placeholder="Add your project progress"
//             rows="4"
//             value={newDescription}
//             onChange={(e) => setNewDescription(e.target.value)}
//           />
//           <button onClick={handleAddProjectProgress}>Submit Progress</button>
//         </>
//       )}

//       <h2>All Project Progress</h2>
//       <div className="project-list">
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <div key={project.id} className="project-item">
//               {/* Progress bar for individual project */}
//               <div className="progress-bar">
//                 {project.steps?.map((step, index) => (
//                   <div
//                     key={index}
//                     className={`progress-column ${step ? 'active' : ''}`}
//                     onClick={() => {
//                       const updatedSteps = [...project.steps];
//                       updatedSteps[index] = !updatedSteps[index];
//                       handleUpdateProjectProgress(project.id, updatedSteps);  // Update Firestore
//                     }}
//                   />
//                 ))}
//               </div>
//               <p>
//                 <strong>Description:</strong> {project.description}
//               </p>
//               <p>
//                 <strong>Issued by:</strong> {project.studentId}
//               </p>
//               <p>
//                 <strong>Timestamp:</strong>{' '}
//                 {new Date(project.timestamp?.seconds * 1000).toLocaleString()}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No project progress submitted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Project;






// import React, { useState, useEffect } from 'react';
// import { db, auth } from './firebase';
// import { collection, addDoc, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
// import './Project.css';

// const Project = () => {
//   const [progressSteps, setProgressSteps] = useState([false, false, false, false]);
//   const [projects, setProjects] = useState([]);
//   const [newDescription, setNewDescription] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const fetchProjects = () => {
//       const q = query(collection(db, 'projectProgress'));
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         setProjects(
//           querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//         );
//       });
//       return unsubscribe;
//     };
//     fetchProjects();
//   }, []);

//   const handleProgressClick = (index) => {
//     const updatedSteps = [...progressSteps];
//     updatedSteps[index] = !updatedSteps[index];
//     setProgressSteps(updatedSteps);
//   };

//   const handleAddProjectProgress = async () => {
//     if (!user || user.email.includes('teacher')) return;

//     const progressText = progressSteps.every((step) => step)
//       ? 'Task Completed'
//       : `Progress: ${progressSteps.filter((step) => step).length}/4`;

//     try {
//       await addDoc(collection(db, 'projectProgress'), {
//         studentId: user.uid,
//         progress: progressText,
//         steps: progressSteps,
//         timestamp: new Date(),
//         description: newDescription,
//       });
//       setProgressSteps([false, false, false, false]);
//       setNewDescription('');
//     } catch (err) {
//       console.error('Error adding project progress:', err);
//     }
//   };

//   const handleUpdateProjectProgress = async (projectId, updatedSteps) => {
//     const projectRef = doc(db, 'projectProgress', projectId);
//     try {
//       await updateDoc(projectRef, {
//         steps: updatedSteps,
//       });
//     } catch (err) {
//       console.error('Error updating project progress:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Project Progress</h1>
        
//         {user && !user.email.includes('teacher') && (
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <div className="grid grid-cols-4 gap-3 mb-6">
//               {progressSteps.map((step, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleProgressClick(index)}
//                   className={`
//                     h-16 rounded-lg font-medium transition-all duration-200
//                     ${step ? 
//                       'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' : 
//                       'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }
//                   `}
//                 >
//                   Step {index + 1}
//                 </button>
//               ))}
//             </div>

//             <textarea
//               placeholder="Add your project progress details..."
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               className="w-full p-4 border border-gray-200 rounded-lg mb-4 h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
//             />

//             <button 
//               onClick={handleAddProjectProgress}
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
//             >
//               Submit Progress
//             </button>
//           </div>
//         )}

//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Project Progress</h2>
//         <div className="space-y-6">
//           {projects.length > 0 ? (
//             projects.map((project) => (
//               <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="p-6">
//                   <div className="grid grid-cols-4 gap-3 mb-6">
//                     {project.steps?.map((step, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           const updatedSteps = [...project.steps];
//                           updatedSteps[index] = !updatedSteps[index];
//                           handleUpdateProjectProgress(project.id, updatedSteps);
//                         }}
//                         className={`
//                           h-16 rounded-lg font-medium transition-all duration-200
//                           ${step ? 
//                             'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' : 
//                             'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }
//                         `}
//                       >
//                         Step {index + 1}
//                       </button>
//                     ))}
//                   </div>

//                   <div className="space-y-4 text-gray-600">
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
//                       <p className="text-gray-600">{project.description || 'No description provided'}</p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <h3 className="font-semibold text-gray-700 mb-1">Issued by</h3>
//                         <p className="text-gray-600">{project.studentId}</p>
//                       </div>

//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <h3 className="font-semibold text-gray-700 mb-1">Timestamp</h3>
//                         <p className="text-gray-600">
//                           {new Date(project.timestamp?.seconds * 1000).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
//               No project progress submitted yet.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Project;




import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
import './Project.css';

const Project = () => {
  const [progressSteps, setProgressSteps] = useState([false, false, false, false]);
  const [projects, setProjects] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchProjects = () => {
      const q = query(collection(db, 'projectProgress'));
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
        studentId: user.uid,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
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
                      className={`
                        h-16 rounded-lg font-medium transition-all duration-300
                        ${step ? 
                          'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' : 
                          'bg-slate-700 hover:bg-slate-600 text-slate-300'
                        }
                      `}
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
              projects.map((project) => (
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
                        className={`
                          h-12 rounded-lg font-medium transition-all duration-300
                          ${step ? 
                            'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' : 
                            'bg-slate-700 hover:bg-slate-600 text-slate-300'
                          }
                        `}
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
                        <p className="text-slate-300">{project.studentId}</p>
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
              ))
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