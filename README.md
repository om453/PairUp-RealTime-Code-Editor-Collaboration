# PairUp

## Description
PairUp is a Real-Time Collaborative Code Editor that enables developers to write and edit code simultaneously in a shared environment. Built with a React frontend and Node.js backend, the project leverages WebSocket-based synchronization using Socket.IO to ensure instant updates and seamless collaboration.

## Features

### Real-Time Collaboration
- Instant code synchronization across all connected users.
- Live user presence indicators.
- Real-time notifications for user join/leave events.

### Code Editor Features
- Syntax highlighting for JavaScript.
- Auto-completion for brackets and tags.
- Line numbers and wrapping.
- Dark/Light theme support.

### Room Management
- UUID-based unique room generation.
- Clipboard support for easy room ID sharing.
- User session management for persistent experiences.

### User Interface
- Clean and modern design using TailwindCSS.
- Responsive layout for optimal performance across devices.
- Theme switching capability.
- Toast notifications for user feedback.

## Technology Used
- **Frontend:** React, CodeMirror, TailwindCSS.
- **Backend:** Node.js, Express, Socket.IO.
- **State Management:** React Context API, useState, useRef.
- **Real-Time Communication:** WebSocket via Socket.IO.
- **UI/UX Design:** TailwindCSS, Toast notifications.
- **Other:** UUID for room generation.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/om453/PairUp-RealTime-Code-Editor-Collaboration
   cd pairup
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the backend server:
   ```bash
   npm run server:dev
   # or
   yarn run server:dev
   ```

4. Start the frontend:
   ```bash 
   npm run dev     
   # or
   yarn run dev     
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Contact Information
For any inquiries or feedback, please feel free to create an issue on the project's GitHub repository.

- **Email:** om.patel200212@gmail.com
- **GitHub:** [https://github.com/om453](https://github.com/om453)

