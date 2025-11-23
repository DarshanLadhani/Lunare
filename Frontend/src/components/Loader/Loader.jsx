import { motion } from "framer-motion";

function Loader({ message = "Loading...", fullscreen = false, size = "md" }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-y-3 text-black/70
      ${fullscreen ? "fixed inset-0 bg-white/70 backdrop-blur-sm z-50" : "py-6"}`}
    >
      <motion.div
        className={`rounded-full border-t-transparent border-black/70 ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8 , ease: "linear" }}
      />
      <p className="font-satoshi-medium text-sm md:text-base">{message}</p>
    </div>
  );
}

export default Loader;
