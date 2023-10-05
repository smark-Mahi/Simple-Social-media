import { motion } from "framer-motion";

const Profileposts = ({ posts }: any) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="columns-3 md:columns-4 gap-x-px absolute"
    >
      {posts.map((item: any, i: number) => (
        <img
          key={i}
          src={item.post.images[0]}
          alt={item.post.owner.username[0]}
          loading="lazy"
          className="mb-0.5"
        />
      ))}
    </motion.div>
  );
};

export default Profileposts;
