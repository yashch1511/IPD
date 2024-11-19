// // import React, { useState } from 'react';
// // import { Menu, X, Bell, MessageSquare, TrendingUp, Users, User, ChevronRight } from 'lucide-react';

// // const TeamNavbar = () => {
// //   const [isOpen, setIsOpen] = useState(true);
// //   const [isTeamExpanded, setIsTeamExpanded] = useState(false);
  
// //   // Sample team data - this could be passed as props
// //   const teamData = {
// //     mentor: { name: "Dr. Smith", role: "Project Mentor" },
// //     members: [
// //       { name: "John Doe", role: "Team Lead" },
// //       { name: "Jane Smith", role: "Developer" },
// //       { name: "Mike Johnson", role: "Designer" },
// //       { name: "Sarah Wilson", role: "Developer" }
// //     ],
// //     currentUser: "John Doe"
// //   };

// //   return (
// //     <div className="flex">
// //       {/* Main Sidebar */}
// //       <nav className={`h-screen bg-white shadow-lg fixed left-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
// //         <div className="h-full flex flex-col">
// //           {/* Logo and Toggle */}
// //           <div className="p-4 flex items-center justify-between border-b">
// //             {isOpen && <span className="text-xl font-bold text-gray-800">TeamSpace</span>}
// //             <button
// //               onClick={() => setIsOpen(!isOpen)}
// //               className="text-gray-600 hover:text-gray-900"
// //             >
// //               {isOpen ? <X size={24} /> : <Menu size={24} />}
// //             </button>
// //           </div>

// //           {/* Navigation Items */}
// //           <div className="flex-1 py-4 overflow-y-auto">
// //             {/* Team Section */}
// //             <div className="mb-4">
// //               <button 
// //                 onClick={() => setIsTeamExpanded(!isTeamExpanded)}
// //                 className="w-full p-4 flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900"
// //               >
// //                 <Users size={20} />
// //                 {isOpen && (
// //                   <>
// //                     <span className="ml-4">Team</span>
// //                     <ChevronRight 
// //                       size={16} 
// //                       className={`ml-auto transform transition-transform ${isTeamExpanded ? 'rotate-90' : ''}`}
// //                     />
// //                   </>
// //                 )}
// //               </button>

// //               {/* Team Members List */}
// //               {isOpen && isTeamExpanded && (
// //                 <div className="bg-gray-50 py-2">
// //                   <div className="px-4 py-2 border-l-4 border-blue-500">
// //                     <p className="font-semibold text-gray-700">{teamData.mentor.name}</p>
// //                     <p className="text-sm text-gray-500">{teamData.mentor.role}</p>
// //                   </div>
// //                   {teamData.members.map((member, index) => (
// //                     <div key={index} className="px-4 py-2 border-l-4 border-transparent hover:border-blue-500">
// //                       <p className="font-medium text-gray-700">{member.name}</p>
// //                       <p className="text-sm text-gray-500">{member.role}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Other Navigation Items */}
// //             <button className="w-full p-4 flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900">
// //               <Bell size={20} />
// //               {isOpen && <span className="ml-4">Announcements</span>}
// //             </button>

// //             <button className="w-full p-4 flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900">
// //               <MessageSquare size={20} />
// //               {isOpen && <span className="ml-4">Chatroom</span>}
// //             </button>

// //             <button className="w-full p-4 flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900">
// //               <TrendingUp size={20} />
// //               {isOpen && <span className="ml-4">Progress</span>}
// //             </button>
// //           </div>

// //           {/* User Profile at Bottom */}
// //           <div className="border-t p-4">
// //             <div className="flex items-center text-gray-600">
// //               <User size={20} />
// //               {isOpen && <span className="ml-4 truncate">{teamData.currentUser}</span>}
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Main Content Area - Add your page content here */}
// //       <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
// //         <div className="p-4">
// //           {/* Your main content goes here */}
// //           <h1 className="text-2xl font-bold text-gray-800">Main Content Area</h1>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeamNavbar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X, Bell, MessageSquare, TrendingUp, Users, User, ChevronRight } from 'lucide-react';

// const TeamNavbar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isTeamExpanded, setIsTeamExpanded] = useState(false);

//   const teamData = {
//     mentor: { name: "Dr. Smith", role: "Project Mentor" },
//     members: [
//       { name: "John Doe", role: "Team Lead" },
//       { name: "Jane Smith", role: "Developer" },
//       { name: "Mike Johnson", role: "Designer" },
//       { name: "Sarah Wilson", role: "Developer" },
//     ],
//     currentUser: "John Doe",
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <nav className={`h-screen bg-white shadow-lg fixed left-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
//         <div className="h-full flex flex-col">
//           {/* Logo and Toggle */}
//           <div className="p-4 flex items-center justify-between border-b">
//             {isOpen && <span className="text-xl font-bold text-gray-800">TeamSpace</span>}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-600 hover:text-gray-900"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Navigation Items */}
//           <div className="flex-1 py-4 overflow-y-auto">
//             {/* Team Section */}
//             <div className="mb-4">
//               <button
//                 onClick={() => setIsTeamExpanded(!isTeamExpanded)}
//                 className="w-full p-4 flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               >
//                 <Users size={20} />
//                 {isOpen && (
//                   <>
//                     <span className="ml-4">Team</span>
//                     <ChevronRight
//                       size={16}
//                       className={`ml-auto transform transition-transform ${isTeamExpanded ? 'rotate-90' : ''}`}
//                     />
//                   </>
//                 )}
//               </button>

//               {/* Team Members */}
//               {isOpen && isTeamExpanded && (
//                 <div className="bg-gray-50 py-2">
//                   <div className="px-4 py-2 border-l-4 border-blue-500">
//                     <p className="font-semibold text-gray-700">{teamData.mentor.name}</p>
//                     <p className="text-sm text-gray-500">{teamData.mentor.role}</p>
//                   </div>
//                   {teamData.members.map((member, index) => (
//                     <div key={index} className="px-4 py-2 border-l-4 border-transparent hover:border-blue-500">
//                       <p className="font-medium text-gray-700">{member.name}</p>
//                       <p className="text-sm text-gray-500">{member.role}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Navigation Links */}
//             <Link to="/Announcements" className="w-full p-4 flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//               <Bell size={20} />
//               {isOpen && <span className="ml-4">Announcements</span>}
//             </Link>

//             <Link to="/Chatroom" className="w-full p-4 flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//               <MessageSquare size={20} />
//               {isOpen && <span className="ml-4">Chatroom</span>}
//             </Link>

//             <Link to="/Project" className="w-full p-4 flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//               <TrendingUp size={20} />
//               {isOpen && <span className="ml-4">Project</span>}
//             </Link>
//           </div>

//           {/* User Profile */}
//           <div className="border-t p-4">
//             <div className="flex items-center text-gray-600">
//               <User size={20} />
//               {isOpen && <span className="ml-4 truncate">{teamData.currentUser}</span>}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content Area */}
//       <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
//         <div className="p-4">
//           {/* Content is rendered dynamically via routes */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamNavbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, MessageSquare, TrendingUp, Users, User, ChevronRight } from 'lucide-react';

const TeamNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isTeamExpanded, setIsTeamExpanded] = useState(false);
  
  const teamData = {
    mentor: { name: "Dr. Smith", role: "Project Mentor" },
    members: [
      { name: "John Doe", role: "Team Lead" },
      { name: "Jane Smith", role: "Developer" },
      { name: "Mike Johnson", role: "Designer" },
      { name: "Sarah Wilson", role: "Developer" }
    ],
    currentUser: "John Doe"
  };

  return (
    <div className="flex">
      {/* Main Sidebar */}
      <nav className={`h-screen bg-slate-900 border-r border-slate-700 fixed left-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full flex flex-col">
          {/* Logo and Toggle */}
          <div className="p-4 flex items-center justify-between border-b border-slate-700">
            {isOpen && <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">TeamSpace</span>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-cyan-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4 overflow-y-auto">
            {/* Team Section */}
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
                      className={`ml-auto transform transition-transform ${isTeamExpanded ? 'rotate-90' : ''}`}
                    />
                  </>
                )}
              </button>

              {/* Team Members List */}
              {isOpen && isTeamExpanded && (
                <div className="bg-slate-800/50 py-2">
                  <div className="px-4 py-2 border-l-4 border-cyan-500">
                    <p className="font-semibold text-cyan-400">{teamData.mentor.name}</p>
                    <p className="text-sm text-slate-400">{teamData.mentor.role}</p>
                  </div>
                  {teamData.members.map((member, index) => (
                    <div key={index} className="px-4 py-2 border-l-4 border-transparent hover:border-cyan-500">
                      <p className="font-medium text-slate-300">{member.name}</p>
                      <p className="text-sm text-slate-400">{member.role}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <Link to="/Announcements" className="w-full p-4 flex items-center text-slate-300 hover:bg-slate-800 hover:text-cyan-400">
              <Bell size={20} />
              {isOpen && <span className="ml-4">Announcements</span>}
            </Link>

            <Link to="/Chatroom" className="w-full p-4 flex items-center text-slate-300 hover:bg-slate-800 hover:text-cyan-400">
              <MessageSquare size={20} />
              {isOpen && <span className="ml-4">Chatroom</span>}
            </Link>

            <Link to="/Project" className="w-full p-4 flex items-center text-slate-300 hover:bg-slate-800 hover:text-cyan-400">
              <TrendingUp size={20} />
              {isOpen && <span className="ml-4">Project</span>}
            </Link>
          </div>

          {/* User Profile at Bottom */}
          <div className="border-t border-slate-700 p-4 bg-slate-800/50">
            <div className="flex items-center text-slate-300">
              <User size={20} />
              {isOpen && <span className="ml-4 truncate">{teamData.currentUser}</span>}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-4">
          {/* Content is rendered dynamically via routes */}
        </div>
      </div>
    </div>
  );
};

export default TeamNavbar;