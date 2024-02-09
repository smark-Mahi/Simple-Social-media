import { motion } from "framer-motion";
import ChatSidebar from "../../components/ChatSidebar";
import { Avatar, Badge, Box, Stack, Typography, styled } from "@mui/material";
import { BiSend } from "react-icons/bi";
import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { SignUpContext, UserInfo } from "../../Context/SignUPInfoContext";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../api/auth";
import { useAppSelector } from "../../features/store";
import { sendMessageApi } from "../../api/loginauth";
import Skeleton from "../../helpers/skeletons/Skeleton";
import dayjs from "dayjs";
import { socket } from "../../helpers/socket";

export default function Chat() {
  const { show } = useContext(SignUpContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className=" h-screen relative"
    >
      <div
        className={`md:mt-0 mt-20 absolute flex justify-between w-full h-[500px]  md:h-screen`}
      >
        <div className="basis-full hidden sm:block">
          {show ? (
            <>
              <Messages id={0} />
            </>
          ) : (
            <div className="h-screen flex flex-col items-center justify-center">
              <div className="border-2 rounded-full border-slate-500 w-20 h-20 flex justify-center items-center">
                <div className="w-10 h-10 border border-slate-800 rounded-full flex justify-center items-center">
                  <BiSolidMessageRoundedDetail className="text-3xl text-slate-500" />
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-xl text-slate-800">Your messages</p>
                <p className="text-md text-slate-500">
                  send private messages to your friend.
                </p>
                <button className="w-fit h-fit p-1 px-2 bg-slate-600 text-white text-md rounded-md hover:bg-slate-500 ">
                  send message
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="basis-4/12 ">
          <ChatSidebar />
        </div>
      </div>
    </motion.div>
  );
}

export const Messages = ({ id }: { id: number }) => {
  const { show, socketEventFotMessage, isOnline } = useContext(SignUpContext);
  const chatFeed = useRef<HTMLDivElement>(null);
  const auth = useAppSelector((state) => state.user);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.emit("join_chat", {
      chat_id: show?.id,
    });
  }, [socket, show]);

  const handleCompositionStart = () => {
    setIsTyping(true);
  };
  console.log(show, "getchatheader");
  const handleCompositionEnd = () => {
    setIsTyping(false);
  };

  useEffect(() => {
    if (isTyping) {
      socket.emit(
        "start_typing",
        JSON.stringify({
          chat_id: show?.id,
          user_id: auth.id,
          username: "not necessary",
        })
      );
    } else {
      socket.emit(
        "stop_typing",
        JSON.stringify({
          chat_id: show?.id,
          user_id: auth.id,
          username: "not necessary",
        })
      );
    }
  }, [isTyping]);

  console.log(socketEventFotMessage, "istyping");
  const getCurrentTimeLine = (date: string) => {
    // console.log(new Date().getDate());
    // console.log(dayjs(date).date());
    // console.log(dayjs(dayjs()).diff(date, "day"), "diff", date);
    // console.log(dayjs(date).day(), "daynow", date);
    if (dayjs(dayjs()).diff(date, "day") < 7) {
      if (new Date().getDate() === dayjs(date).date()) {
        return "Today";
      }
      if (
        new Date().getDate() !== dayjs(date).date() &&
        dayjs(dayjs()).diff(date, "day") === 0
      ) {
        return "Yesterday";
      }
      if (dayjs(date).day() === 0) {
        return "Sunday";
      }
      if (dayjs(date).day() === 1) {
        return "Moday";
      }
      if (dayjs(date).day() === 2) {
        return "Tuesday";
      }
      if (dayjs(date).day() === 3) {
        return "Wednesday";
      }
      if (dayjs(date).day() === 4) {
        return "Thursday";
      }
      if (dayjs(date).day() === 5) {
        return "Friday";
      }
      if (dayjs(date).day() === 6) {
        return "Saturday";
      }
    } else {
      return dayjs(date).format("MMM D,YYYY");
    }
  };

  const { data, fetchNextPage, error, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["getmessages", show?.id ? show.id : id],
      ({ pageParam = 0 }) =>
        axiosClient.get(`/chat/messages/${show?.id ? show.id : id}`, {
          params: {
            page: pageParam,
          },
        }),
      {
        retry: 2,
        getNextPageParam: (lastPage, pages) => {
          if (pages.length <= lastPage.data.total_pages) {
            // console.log(pages, "page");
            // new Promise((resolve) => setTimeout(resolve, 2000));
            return pages.length - 1 + 1;
          } else {
            return undefined;
          }
        },
      }
    );

  useEffect(() => {
    chatFeed?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [data?.pages]);
  // console.log(show, "show");
  const queryClient = useQueryClient();
  //picker
  const [showEmoji, setShowEmoji] = useState(false);
  const [body, setBody] = useState("");

  function clickEmoji(emojiObject: EmojiClickData) {
    setBody((prevState) => prevState + emojiObject.emoji);
  }
  //React.ChangeEvent<HTMLInputElement>
  const handleBody = (e: any) => {
    setBody(e);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(0.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const isSendersLastmessage = (
    msg: any,
    indexx: number,
    sender_id: number,
    key: number
  ) => {
    // console.log(indexx, msg[indexx]?.content, "id");
    //show profile on every current message
    if (indexx === 0 && sender_id !== auth.id && key === 0) {
      return true;
    }
    // if (
    //   indexx !== msg.length - 1 &&
    //   msg[indexx]?.sender.id !== auth.id &&
    //   msg[indexx - 1]?.sender.id === auth.id &&
    //   msg[indexx + 1]?.sender.id === auth.id
    // ) {
    //   return true;
    // }
    //show profile when last message is senders message and last plus one message is your message but do minus
    if (
      indexx !== msg.length - 1 &&
      msg[indexx]?.sender.id !== auth.id &&
      msg[indexx - 1]?.sender.id === auth.id
    ) {
      return true;
    }
  };

  const isSameTimeLine = (msg: any, indexx: number, key: number) => {
    if (
      msg[indexx + 1] === undefined &&
      data?.pages &&
      key === data.pages.length - 1
    ) {
      // console.log(msg[indexx], indexx, "indexx");
      // console.log(msg[indexx + 1]?.created_at, indexx + 1, "indexx+1");
      // console.log(key, "key");
      return true;
    }
    if (
      msg[indexx + 1] === undefined &&
      data?.pages &&
      key !== data.pages.length - 1 &&
      dayjs(data.pages[key + 1].data?.messages[0]?.created_at).date() ===
        dayjs(msg[indexx]?.created_at).date()
    ) {
      // console.log(key, "notkey");
      // console.log(
      //   dayjs(data.pages[key + 1].data.messages[0].created_at).date(),
      //   dayjs(msg[indexx]?.created_at).date(),
      //   "notdates"
      // );
      //&& dayjs(data.pages[key+1].data.messages[0].created_at).date() !== dayjs(msg[indexx]?.created_at).date()
      return false;
    }
    if (
      dayjs(msg[indexx]?.created_at).date() ===
      dayjs(msg[indexx + 1]?.created_at).date()
    ) {
      return false;
    }
    if (
      dayjs(msg[indexx]?.created_at).date() !==
      dayjs(msg[indexx + 1]?.created_at).date()
    ) {
      // console.log(
      //   msg[indexx],
      //   indexx,
      //   dayjs(msg[indexx]?.created_at).date(),
      //   "indexxlast"
      // );
      // console.log(
      //   msg[indexx + 1],
      //   indexx + 1,
      //   dayjs(msg[indexx + 1]?.created_at).date(),
      //   "indexx+1last"
      // );
      return true;
    }
  };
  //send message
  const sendMessageHandler = async () => {
    setBody("");
    await sendMessageApi({ content: body, chat_id: show?.id as number });
    await queryClient.invalidateQueries(["getmessages", show?.id]);
  };
  return (
    <>
      <Stack
        height={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
      >
        {/* chat header */}
        <Box
          sx={{ height: 90, backgroundColor: "white", width: "100%" }}
          p={1}
          className="border-solid border-b-[0.5px] border-slate-300"
        >
          {show?.users?.map((userInfo: UserInfo) => {
            if (userInfo.id !== auth.id) {
              return (
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  spacing={2}
                  width={"100%"}
                  height={"100%"}
                >
                  <Box>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant={isOnline ? "dot" : "standard"}
                    >
                      {userInfo.profile_photo === "string" ? (
                        <Avatar src="" />
                      ) : (
                        <Avatar src={userInfo.profile_photo} />
                      )}
                    </StyledBadge>
                  </Box>
                  <Stack spacing={0.2}>
                    <Typography variant="subtitle2">
                      {userInfo.username}
                    </Typography>
                    <Typography variant="caption">online</Typography>
                  </Stack>
                </Stack>
              );
            }
          })}
        </Box>
        {/* meaasages */}
        {error ? (
          <p>error</p>
        ) : !data?.pages ? (
          <Box sx={{ width: "100%" }} className=" overflow-hidden  p-2">
            {" "}
            <div className="flex flex-col items-start justify-start">
              <Skeleton classes="title width-5 " />
              <Skeleton classes="title width-10" />
              <Skeleton classes="title width-18" />
              <Skeleton classes="title width-15" />
              <Skeleton classes="title width-5 " />
              <Skeleton classes="title width-10" />
              <Skeleton classes="title width-5 " />
              <Skeleton classes="title width-5 " />
            </div>
            <div className="flex flex-col items-end justify-start">
              <Skeleton classes="title width-5 " />
              <Skeleton classes="title width-10" />
              <Skeleton classes="title width-18" />
              <Skeleton classes="title width-15" />
              <Skeleton classes="title width-5 " />
              <Skeleton classes="title width-10" />
              <Skeleton classes="title width-5 " />
              <Skeleton classes="title width-5 " />
            </div>
          </Box>
        ) : (
          <Box
            sx={{ width: "100%" }}
            className="  p-2 h-screen overflow-auto customScrollbar"
          >
            {isFetchingNextPage ? (
              <div>
                <p className="text-center text-xs font-semibold text-slate-800 pt-4">
                  loading history...
                </p>
              </div>
            ) : hasNextPage ? (
              <div className="flex justify-center items-center">
                <button
                  onClick={() => fetchNextPage()}
                  className="p-2 rounded-md w-fit text-white bg-slate-500 text-xs"
                >
                  Load More
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <button
                  disabled
                  className="p-1 rounded-md w-fit text-white bg-gray-200 text-xs"
                >
                  No More History
                </button>
              </div>
            )}
            <div className="p-2 flex flex-col-reverse" ref={chatFeed}>
              {data.pages.map((page, key: number) =>
                page.data.messages.map((message: any, i: number) => (
                  <div
                    key={message.id}
                    className={`${
                      message.sender.id !== auth.id
                        ? "items-start"
                        : "items-end"
                    } flex flex-col mt-2 `}
                  >
                    {/* {based on current Day condition show this whole div} */}
                    {isSameTimeLine(page.data.messages, i, key) ? (
                      <div className="w-full py-4 flex gap-1 justify-center items-center">
                        <hr className="bg-slate-500 w-2/5" />
                        <p className="text-sm text-slate-500 p-1">
                          {getCurrentTimeLine(message.created_at)}
                        </p>
                        <hr className="bg-slate-500 w-2/5" />
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className={`flex gap-2
                    `}
                    >
                      {isSendersLastmessage(
                        page.data.messages,
                        i,
                        message.sender.id,
                        key
                      ) ? (
                        <Avatar
                          src={message.sender.profile_photo}
                          sx={{ width: 30, height: 30 }}
                        />
                      ) : (
                        message.sender.id !== auth.id && (
                          <div className="ml-8"></div>
                        )
                      )}
                      <div
                        className={`flex  ${
                          message.sender.id !== auth.id
                            ? "bg-slate-400 text-white"
                            : "bg-slate-200"
                        } w-fit rounded-md `}
                      >
                        <div className=" p-2">
                          <p
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                              __html: message.content,
                            }}
                          ></p>
                        </div>
                        <div className="flex justify-end p-1">
                          <p className="text-[10px] self-end">
                            {dayjs(message.created_at).format("HH:mm")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Box>
        )}
        {/* chat footer */}
        <Box p={2} className="h-[165px] bg-white w-full">
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <div className="border rounded-md  border-slate-300 w-full h-36 relative space-y-4">
              <ReactQuill
                placeholder={
                  socketEventFotMessage === "startTyping"
                    ? "Typing..."
                    : "Type your message here..."
                }
                modules={Chat.modules}
                formats={Chat.formats}
                onChange={handleBody}
                value={body}
                style={{
                  height: "90px",
                  width: "100%",
                }}
                onKeyDown={handleCompositionStart}
                onKeyUp={handleCompositionEnd}
              />
              <MdOutlineEmojiEmotions
                onClick={() => setShowEmoji(!showEmoji)}
                className="text-2xl cursor-pointer absolute left-2 "
              />
            </div>
            <Box className="bg-slate-500 relative rounded-full w-8 h-8">
              <BiSend
                className="absolute left-2 top-2 cursor-pointer text-white"
                onClick={sendMessageHandler}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>

      <div className="absolute top-40 border border-slate-200 z-10">
        {showEmoji && (
          <EmojiPicker
            width={400}
            height={400}
            onEmojiClick={clickEmoji}
            previewConfig={{ showPreview: false }}
            autoFocusSearch={false}
          />
        )}
      </div>
    </>
  );
};

Chat.modules = {
  toolbar: [
    // [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    // [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["emoji"],
    // [{ list: "ordered" }, { list: "bullet" }],
    // ["link", "images", "video"],
    // ["clean"],
    // ["code-block"],
  ],
  // "emoji-textarea": true,
  // "emoji-shortname": true,
};
Chat.formats = [
  // "header",
  // "font",
  // "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  // "list",
  // "bullet",
  // "link",
  // "images",
  // "video",
  // "code-block",
];
