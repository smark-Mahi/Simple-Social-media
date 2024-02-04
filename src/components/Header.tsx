import { useState } from "react";
import { getAllUniqueUsersForSearchApi } from "../api/loginauth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SearchSkeleton from "../helpers/skeletons/SearchSkeleton";
import { useAppSelector } from "../features/store";
import { getProfileApi } from "../api/loginauth";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data, error } = useQuery({
    queryKey: ["search"],
    queryFn: getAllUniqueUsersForSearchApi,
  });

  const auth = useAppSelector((state) => state.user);

  const profileData = useQuery({
    queryKey: ["profile", auth.id],
    queryFn: () => getProfileApi(auth.id),
  });

  const filterSearchResult =
    data &&
    data.data.filter((item: any) =>
      item.username.toLowerCase().startsWith(search && search?.toLowerCase())
    );

  return (
    <>
      {error ? (
        <p>error</p>
      ) : !data ? (
        <SearchSkeleton />
      ) : (
        <div className="hidden md:block sticky top-0 z-20  ">
          <div className="  flex justify-end items-center h-[60px] border-b-[1px] border-slate-300 rounded-b-3xl bg-white">
            <div className="flex flex-col">
              <div>
                <div
                  className={`fixed top-0 right-16 text-gray-600 focus-within:text-gray-400  w-[450px] m-2 `}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="submit"
                      className="p-1 focus:outline-none focus:shadow-outline"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    className="w-[400px] py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900  "
                    placeholder="Search Account..."
                    onChange={handleChange}
                  />
                </div>
              </div>
              {search && search.trim() && filterSearchResult.length >= 1 ? (
                <div
                  className={`p-2 w-[400px]  mt-24 ${
                    profileData.data?.User.profile_photo ? "mr-12" : "mr-28"
                  }  `}
                >
                  {filterSearchResult.map((searchItems: any) => (
                    <div
                      className="text-sm w-full m-2 h-[30px] p-1  bg-slate-500 hover:bg-white hover:underline rounded-sm cursor-pointer"
                      onClick={() => navigate(`/posts/user/${searchItems.id}`)}
                    >
                      {" "}
                      {searchItems.username}
                    </div>
                  ))}
                </div>
              ) : filterSearchResult.length === 0 ? (
                <div
                  className={`p-2 w-[400px]  mt-24 ${
                    profileData.data?.User.profile_photo ? "mr-12" : "mr-28"
                  }  `}
                >
                  <p className="text-sm w-full m-2 h-[30px] p-1 hover:bg-slate-500 bg-white text-red-500 underline rounded-sm cursor-pointer">
                    No User Found
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            {profileData.data?.User.profile_photo ? (
              <img
                src={profileData.data?.User.profile_photo}
                alt="i"
                className="w-[50px] h-[50px] rounded-full"
                style={{ border: "1px solid black", marginRight: "30px" }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

