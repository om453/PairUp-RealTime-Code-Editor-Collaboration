import Avatar from "react-avatar";

const Client = ({ username }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-secondary rounded-md w-24">
      <Avatar 
        name={username} 
        size={32}
        round={true}
        textSizeRatio={2}
      />
      <span className="text-sm font-medium text-foreground text-center truncate w-full">
        {username}
      </span>
    </div>
  );
};

export default Client;
