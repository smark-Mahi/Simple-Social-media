import Skeleton from "./Skeleton";

const SearchSkeleton = () => {
  return (
    <div className="md:flex md:gap-4 md:justify-end md:items-center md:mr-4 hidden md:block">
      <Skeleton classes="title width-25" />
      <Skeleton classes="profile-circle width-50" />
    </div>
  );
};
export default SearchSkeleton;
