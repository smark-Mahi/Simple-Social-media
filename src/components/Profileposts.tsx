const Profileposts = ({ posts }: any) => {
  return (
    <div className="columns-3 md:columns-4 gap-x-px ">
      {posts.map((item: any, i: number) => (
        <img
          key={i}
          src={item.post.images[0]}
          alt={item.post.owner.username[0]}
          loading="lazy"
          className="mb-0.5"
        />
      ))}
    </div>
  );
};

export default Profileposts;
