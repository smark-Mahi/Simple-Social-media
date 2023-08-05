import Skeleton from "./Skeleton";

const SkeletonProfile = () => {
  return (
    <>
      <div className="w-full md:w-[100%] h-screen p-2 ">
        <div className="flex md:justify-evenly md:items-center   ">
          <div className="md:-mt-0 hidden md:block">
            <Skeleton classes="profile-page-img-width" />
          </div>
          <div className=" md:w-[60%] md:h-[150px] flex flex-col justify-between w-full">
            <div className="hidden md:block h-[50px] md:flex md:justify-start md:gap-12">
              <Skeleton classes="text width-10" />
              <Skeleton classes="title width-10" />
            </div>
            <div className="block md:hidden flex justify-center gap-5 h-[70px]">
              <div className="md:hidden">
                <Skeleton classes="profile-circle width-50" />
              </div>
              <div className="md:h-[50px] md:flex md:justify-start md:gap-12">
                <Skeleton classes="text width-10" />
                <Skeleton classes="title width-10" />
              </div>
            </div>
            <div className=" bg-white md:h-[100px] flex flex-col justify-around ">
              <div className="flex justify-around md:flex md:justify-around order-last border-y-2 p-2 md:p-0 md:border-y-0 md:block md:mt-0 mt-4 ">
                <Skeleton classes="text width-10" />
                <Skeleton classes="text width-10" />
                <Skeleton classes="text width-10" />
              </div>
              <div className="md:order-last">
                <Skeleton classes="text width-100" />
              </div>
            </div>
          </div>
        </div>
        <div className="columns-3 md:columns-4 gap-x-px md:h-[920px] md:overflow-auto md:no-scrollbar ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (_: unknown, index: number) => (
              <Skeleton classes="profile-image width-100" key={index} />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SkeletonProfile;
