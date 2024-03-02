import Singlepost from "./SinglePost";
import SkeletonPost from "../helpers/skeletons/SkeletonPost";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import FadeLoader from "react-spinners/FadeLoader";
import { motion } from "framer-motion";

export default function UnAuthorizePosts() {
  const { data, fetchNextPage, error, hasNextPage } = useInfiniteQuery(
    ["getdata"],
    ({ pageParam = 0 }) =>
      axios.get("https://flickz-server.csproject.org/posts/general", {
        params: {
          post_limit: 10,
          skip: pageParam,
        },
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage, "lasp");
        if (lastPage.data.length === 10) {
          // new Promise((resolve) => setTimeout(resolve, 2000));
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  return (
    <>
      {error ? (
        <p>error</p>
      ) : !data?.pages ? (
        <div className="p-4 grid place-items-center md:p-20 gap-5 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_: unknown, index: number) => (
            <SkeletonPost key={index} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          className="grid place-items-center overflow-auto no-scrollbar"
          dataLength={data.pages && data.pages.length}
          next={() => fetchNextPage()}
          hasMore={hasNextPage as boolean}
          loader={<FadeLoader height={5} width={2} />}
          style={{ width: "100%" }}
        >
          <motion.div
            variants={variants}
            initial="hidden"
            animate="show"
            className="p-4  grid place-items-center md:p-20 gap-5 "
          >
            {data.pages.map((page: any) =>
              page.data.map((item: any) => <Singlepost items={item} />)
            )}
          </motion.div>
        </InfiniteScroll>
      )}
    </>
  );
}
