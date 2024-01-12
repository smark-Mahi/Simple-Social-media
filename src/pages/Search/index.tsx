import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../helpers/skeletons/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import FadeLoader from "react-spinners/FadeLoader";
import { motion } from "framer-motion";
import { axiosClient } from "../../api/auth";

const Search = () => {
  const navigate = useNavigate();

  const [search, setSearch] = React.useState<string | null>(null);

  const { data, fetchNextPage, error, hasNextPage } = useInfiniteQuery(
    ["getdata"],
    ({ pageParam = 0 }) =>
      axiosClient.get("/posts/", {
        params: {
          post_limit: 10,
          skip: pageParam,
        },
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.length === 10) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const s =
    data &&
    data.pages
      .map((page: any) =>
        page.data
          .reduce((acc: any, item: any) => {
            if (acc.length >= 1) {
              if (
                !acc.find((items: any) => items.owner_id == item.post.owner_id)
              ) {
                acc.push(item.post);
              }
            } else {
              acc.push(item.post);
            }
            return acc;
          }, [])
          .filter((item: any) =>
            item.owner.username
              .toLowerCase()
              .startsWith(search && search?.toLowerCase())
          )
      )
      .reduce((postarray: any, specificarray: any, i: any) => {
        console.log(specificarray, i);
        if (postarray.length >= 1 && specificarray.length === 1) {
          if (
            !postarray.find(
              (objs: any) => objs && objs.owner_id === specificarray[0].owner_id
            )
          ) {
            postarray.push(specificarray[0]);
          }
        } else {
          postarray.push(specificarray[0]);
        }
        return postarray;
      }, [])
      .filter(
        (item: any) =>
          item &&
          item.owner.username
            .toLowerCase()
            .startsWith(search && search?.toLowerCase())
      );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="mt-14 bg-white"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="relative text-gray-600 focus-within:text-gray-400 m-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline cursor-pointer"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                className="w-6 h-6 "
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            className="w-[250px] py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 "
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {search && search?.trim().length > 1 ? (
          <div className="p-2 w-[250px] -mt-2 z-20">
            {s.map((searchItems: any) => (
              <div
                className="text-sm w-full m-2 h-[30px] p-1 pl-2 hover:bg-slate-500 rounded-sm cursor-pointer"
                onClick={() => navigate(`/posts/user/${searchItems.owner_id}`)}
              >
                {" "}
                {searchItems.owner.username}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        {search && search.trim().length > 1 && s.length === 0 && (
          <p>No user Found</p>
        )}
      </div>
      {error ? (
        <p>error</p>
      ) : !data?.pages ? (
        <div className="columns-3 md:columns-6 gap-x-px ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_: unknown, index: number) => (
            <Skeleton classes="image width-100" key={index} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          className="grid place-items-center"
          dataLength={data.pages && data.pages.length}
          next={() => fetchNextPage()}
          hasMore={hasNextPage as boolean}
          loader={<FadeLoader height={5} width={2} />}
          style={{ width: "100%" }}
        >
          <div className="columns-3 md:columns-6 gap-x-px ">
            {data.pages.map((page: any) =>
              page.data ? (
                page.data.map((images: any, i: number) => (
                  <img
                    key={i}
                    src={images.post.images[0]}
                    onClick={() => navigate(`/posts/${images.post.id}`)}
                    className="cursor-pointer mb-0.5"
                  />
                ))
              ) : (
                <Skeleton classes="image width-100" />
              )
            )}
          </div>
        </InfiniteScroll>
      )}
    </motion.div>
  );
};

export default Search;
