import { motion } from "framer-motion";
import ChatSidebar from "../../components/ChatSidebar";
import { Avatar, Badge, Box, Stack, Typography, styled } from "@mui/material";
import { BiSend } from "react-icons/bi";
import { useState } from "react";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const Chat = () => {
  const GetMessages = [
    {
      id: 1,
      way: "incoming",
      msg: "Assalamulaikum",
      profile: <Avatar />,
    },
    {
      id: 1,
      way: "incoming",
      msg: "khryt se?",
      profile: <Avatar />,
    },
    {
      id: 1,
      way: "incoming",
      msg: "ky bhai huwa kaaam?",
      profile: <Avatar />,
    },
    {
      id: 1,
      msg: "walekumassalam",
    },
    {
      id: 1,
      msg: "Alhumdullilah",
    },
    {
      id: 1,
      msg: "qhtam pe hi shaam tk hojata inshallah...",
    },
  ];
  //picker
  const [showEmoji, setShowEmoji] = useState(false);
  const [body, setBody] = useState("");
  function clickEmoji(emojiData: EmojiClickData, e: MouseEvent) {
    console.log(emojiData, "e");
    setBody((prevState) => prevState + emojiData.emoji);
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
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className=" h-screen relative "
    >
      <div className="absolute flex justify-between w-full">
        <div className="basis-full">
          <Stack height={"100%"}>
            {/* chat header */}
            <Box
              sx={{ height: 100, backgroundColor: "white", width: "100%" }}
              p={2}
            >
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
                    variant="dot"
                  >
                    <Avatar />
                  </StyledBadge>
                </Box>
                <Stack spacing={0.2}>
                  <Typography variant="subtitle2">Rahman</Typography>
                  <Typography variant="caption">online</Typography>
                </Stack>
              </Stack>
            </Box>
            {/* meaasages */}
            <Box
              sx={{ width: "100%" }}
              className=" overflow-auto no-scrollbar  h-[350px] p-2"
            >
              {GetMessages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.way ? "items-start" : "items-end"
                  } flex flex-col mt-2`}
                >
                  <div
                    className={`flex gap-2 
                    `}
                  >
                    {message.way && message.profile}
                    <div
                      className={`${
                        message.way === "incoming"
                          ? "bg-slate-400 text-white"
                          : "bg-slate-200"
                      } w-fit rounded-md p-2`}
                    >
                      <p className="text-xs">{message.msg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Box>
            {/* chat footer */}
            <Box p={2} className="h-[165px] bg-white w-full">
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <div className="border rounded-md  border-slate-300 w-full h-36 relative space-y-4">
                  <ReactQuill
                    placeholder="Type your message here..."
                    modules={Chat.modules}
                    formats={Chat.formats}
                    onChange={handleBody}
                    value={body}
                    style={{
                      height: "90px",
                      width: "100%",
                    }}
                  />
                  <MdOutlineEmojiEmotions
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="text-2xl cursor-pointer absolute left-2 "
                  />
                </div>
                <Box className="bg-slate-500 relative rounded-full w-8 h-8">
                  <BiSend className="absolute left-2 top-2 cursor-pointer text-white" />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </div>
        <div className="bsis-4/12">
          <ChatSidebar />
        </div>
      </div>
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
    </motion.div>
  );
};

Chat.modules = {
  toolbar: [
    // [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    // [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    // [{ list: "ordered" }, { list: "bullet" }],
    // ["link", "images", "video"],
    // ["clean"],
    // ["code-block"],
  ],
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


export default Chat;
