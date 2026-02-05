import { LoaderCircle } from "lucide-react";

const Loader = ({
  size = 30,
  color = "teal",
  strokeWidth = 3,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <LoaderCircle
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={`animate-spin ${className}`}
      />
    </div>
  );
};

export default Loader;
