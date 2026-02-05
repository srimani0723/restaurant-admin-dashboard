import { GlobeX } from "lucide-react";

const ErrorBox = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <GlobeX size={90} color="red" />
      <p className="text-red-500">Error: {message}</p>
    </div>
  );
};

export default ErrorBox;
