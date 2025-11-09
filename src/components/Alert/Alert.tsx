"use client";

type AlertProps = {
  type?: "success" | "error" | "info";
  children: React.ReactNode;
};

const Alert: React.FC<AlertProps> = ({ type = "info", children }) => {
  const colors = {
    success: "bg-green-50 text-green-800",
    error: "bg-red-50 text-red-800",
    info: "bg-blue-50 text-blue-800",
  };
  return (
    <div
      className={`text-center p-3 rounded font-semibold text-sm md:text-base ${
        colors[type]
      }`}
    >
      {children}
    </div>
  );
}
export default Alert;