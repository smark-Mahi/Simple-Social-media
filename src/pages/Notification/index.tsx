import { motion } from "framer-motion";

const Notification = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      exit={{ opacity: 0 }}
    >
      <div className="h-screen p-2 mt-16">
        <p className="text-4xl font-semibold text-blue-900">Notications</p>
        <div className="mt-4">No Notification yet</div>
      </div>
    </motion.div>
  );
};

export default Notification;
