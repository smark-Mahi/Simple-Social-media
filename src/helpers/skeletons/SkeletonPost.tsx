import Skeleton from "./Skeleton";

const SkeletonPost = () => {
  return (
    <div className="post md:w-[60%]  w-[90%] lg:w-[50%]">
      <div className="flex gap-2 justify-center items-center">
        <Skeleton classes="profile-circle width-50" />
        <Skeleton classes="title width-50" />
      </div>
      <Skeleton classes="image width-100" />
      <Skeleton classes="text width-25" />
      <Skeleton classes="text width-50" />
      <Skeleton classes="text width-50" />
      <Skeleton classes="text width-100" />
    </div>
  );
};
export default SkeletonPost;
