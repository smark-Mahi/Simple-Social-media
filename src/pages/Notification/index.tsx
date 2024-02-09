import { motion } from "framer-motion";

const Notification = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      exit={{ opacity: 0 }}
    >
      <div className="h-screen p-2 mt-20">
        <p className="text-4xl font-semibold text-slate-600">Notications</p>
        <div className="mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          laboriosam asperiores sunt perferendis iste facilis dicta suscipit
          consectetur vel. Aliquam, alias deserunt perspiciatis mollitia ullam
          voluptas voluptatem? Rerum, voluptatibus vitae!
        </div>
      </div>
    </motion.div>
  );
};

export default Notification;
