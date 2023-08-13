import { motion } from "framer-motion";

const Chat = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      exit={{ opacity: 0 }}
    >
      <p className="lg:translate-x-1/2 translate-x-24 translate-y-56 text-sm">
        Comming Soon
      </p>
    </motion.div>
  );
};

export default Chat;
