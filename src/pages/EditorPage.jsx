import { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { ThemeToggle } from "../components/ThemeToggle";
import { initSocket } from "../socket.js";
import { ACTIONS } from "../Actions";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from '../assets/images/logo-removebg-preview.png';

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation(); // location is uesd to get the state passed from the previous page
  const { roomId } = useParams(); // useParams is used to get the parameters passed in the URL
  const codeRef = useRef(null);
  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        
        socketRef.current.on("connect_error", (err) => {
          console.error("Socket connection error:", err);
          toast.error("Socket connection failed, try again later.");
          reactNavigator("/");
        });

        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        // Set up JOINED event listener
        socketRef.current.on(
          ACTIONS.JOINED,
          ({ clients, username, socketId }) => {
            if (username !== location.state?.username) {
              toast.success(`${username} joined the room.`);
            }
            setClients(clients);

            // Sync the code with the new user
            socketRef.current.emit(ACTIONS.SYNC_CODE, {
              code: codeRef.current,
              socketId,
            });
          }
        );

        // Set up DISCONNECTED event listener
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
          });
        });    
      } catch (err) {
        console.error("Socket initialization error:", err);
        toast.error("Failed to connect to the server");
        reactNavigator("/");
      }
    };
    init();

     // Clean up function to disconnect the socket and remove event listeners
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  // Function to leave the room
  async function copyRoomId() {
    try {
        await navigator.clipboard.writeText(roomId);
        console.log(roomId)
        toast.success('Room ID has been copied to your clipboard');
    } catch (err) {
        toast.error('Could not copy the Room ID');
        console.error(err);
    }
}

function leaveRoom() {
  reactNavigator('/');
}

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4 z-50 bg-background/80 p-2 rounded-md shadow-md">
        <ThemeToggle />
      </div>

      <div className="w-64 bg-card text-card-foreground flex flex-col shadow-lg">
        <div className="p-4 flex-1">
          <div className="flex items-center gap-2 mb-8">
            <img
              className="w-96 h-15"
              src={Logo}
              alt="logo"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Connected</h3>
            <div className="flex flex-wrap gap-3">
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <button className="w-full bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary/90 transition font-bold" onClick={copyRoomId}>
            Copy ROOM ID
          </button>
          <button className="w-full bg-destructive text-destructive-foreground py-2 px-4 rounded-md hover:bg-destructive/90 transition font-bold" onClick={leaveRoom}>
            Leave
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 h-screen overflow-hidden">
        <div className="h-full w-full rounded-lg border bg-card shadow-sm">
          <Editor 
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
