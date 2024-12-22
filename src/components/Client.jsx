import Avatar from "react-avatar";

const Client = ({ username }) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-secondary rounded-md w-full">
      <Avatar 
        name={username} 
        size="32" 
        className="rounded-full"
        textSizeRatio={2}
      />
      <span className="text-sm font-medium text-foreground">{username}</span>
    </div>
  );
};

export default Client;
