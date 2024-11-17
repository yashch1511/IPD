import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
import './Project.css';

const Project = () => {
  const [progressSteps, setProgressSteps] = useState([false, false, false, false]);
  const [projects, setProjects] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [user, setUser] = useState(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  // Fetch project progress from Firestore
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

  // Handle progress column click (for the current project being worked on)
  const handleProgressClick = (index) => {
    const updatedSteps = [...progressSteps];
    updatedSteps[index] = !updatedSteps[index];  // Toggle the step
    setProgressSteps(updatedSteps);
  };

  // Add project progress to Firestore
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
      setProgressSteps([false, false, false, false]); // Reset progress
      setNewDescription(''); // Clear description after submission
    } catch (err) {
      console.error('Error adding project progress:', err);
    }
  };

  // Handle update to an existing project progress
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
    <div className="project-container">
      <h1>Project Progress</h1>
      {user && !user.email.includes('teacher') && (
        <>
          {/* Individual progress bar for the current user */}
          <div className="progress-bar">
            {progressSteps.map((step, index) => (
              <div
                key={index}
                className={`progress-column ${step ? 'active' : ''}`}
                onClick={() => handleProgressClick(index)}
              />
            ))}
          </div>
          <textarea
            placeholder="Add your project progress"
            rows="4"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={handleAddProjectProgress}>Submit Progress</button>
        </>
      )}

      <h2>All Project Progress</h2>
      <div className="project-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-item">
              {/* Progress bar for individual project */}
              <div className="progress-bar">
                {project.steps?.map((step, index) => (
                  <div
                    key={index}
                    className={`progress-column ${step ? 'active' : ''}`}
                    onClick={() => {
                      const updatedSteps = [...project.steps];
                      updatedSteps[index] = !updatedSteps[index];
                      handleUpdateProjectProgress(project.id, updatedSteps);  // Update Firestore
                    }}
                  />
                ))}
              </div>
              <p>
                <strong>Description:</strong> {project.description}
              </p>
              <p>
                <strong>Issued by:</strong> {project.studentId}
              </p>
              <p>
                <strong>Timestamp:</strong>{' '}
                {new Date(project.timestamp?.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No project progress submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Project;
