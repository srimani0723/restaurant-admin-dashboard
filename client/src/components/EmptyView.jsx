import React from "react";
import { BookDashed } from "lucide-react";

const EmptyView = ({ message = "No Data Available" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <BookDashed size={100} color="orange" className="mb-4 h-50 w-50" />
      <p className="text-orange-500 text-2xl font-bold">{message}</p>
    </div>
  );
};

export default EmptyView;
