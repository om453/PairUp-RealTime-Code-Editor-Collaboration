import {v4 as uuid} from 'uuid';
import {useState} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const [roomId , setRoomId] = useState('');
  const [userName , setuserName] = useState('');
  const navigate = useNavigate();

  // Create New Room
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid();
    // console.log(id);
    setRoomId(id);
    toast.success('New Room Created');
  };


// Join Room
const joinRoom = () => {
  if(!roomId || !userName){
    return toast.error('Please fill all the fields');
  }
  navigate(`/editor/${roomId}`,  // Navigate to the editor page
  {
    state: { username: userName }
  });
};

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      {/* Form Container */}


      <div className="p-8 bg-card text-card-foreground shadow-lg w-96 rounded-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            width={200}
            height={100}
            src="/src/assets/images/logo-removebg-preview.png"
            alt="Logo"
            className="object-contain" 
          />
        </div>

        {/* Title */}
        <h4 className="text-foreground text-base mb-6">
          Paste invitation room id here
        </h4>

        {/* Input Fields */}
        <div>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            type="text"
            placeholder="ROOM ID"
            className="w-full p-2 mb-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          <input
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            type="text"
            placeholder="User Name"
            className="w-full p-2 mb-6 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />

          {/* Join Button */}
          <button 
            onClick={joinRoom}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2 px-4 rounded-md transition"
          >
            Join
          </button>

          {/* Create New Room Link */}
          <span className="block text-center text-muted-foreground text-sm mt-4">
            If you don't have a room id, create one &nbsp;
            <a
              onClick={createNewRoom}
              href="#"
              className="text-primary hover:underline font-semibold"
            >
              New Room
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
