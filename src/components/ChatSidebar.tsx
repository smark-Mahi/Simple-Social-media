import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createChatApi,
  getAllUniqueUsersForSearchApi,
  getChatListApi,
} from "../api/loginauth";
import { useAppSelector } from "../features/store";
import { SignUpContext } from "../Context/SignUPInfoContext";
import ChatListSkeleton from "../helpers/skeletons/ChatListSkeleton";
import { useNavigate } from "react-router-dom";

type Anchor = "right";

const ResponsiveLayout = styled(Stack)(({ theme }) => ({
  // [theme.breakpoints.up("md")]: {
  //   height: "100vh",
  // },
  [theme.breakpoints.down("md")]: {
    height: "550px",
  },
}));

const Responsiveness = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "320px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
  },
}));

const Chat = () => {
  const { setShow } = useContext(SignUpContext);
  const [search, setSearch] = useState<string>("");
  const queryClient = useQueryClient();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const allFollowedAccounts = useQuery({
    queryKey: ["createchat"],
    queryFn: getAllUniqueUsersForSearchApi,
  });

  //Searching Accounts
  const filterSearchResult =
    allFollowedAccounts.data &&
    allFollowedAccounts.data.data.filter((item: any) =>
      item.username.toLowerCase().startsWith(search && search?.toLowerCase())
    );

  const { data, error } = useQuery({
    queryKey: ["chatlist"],
    queryFn: getChatListApi,
  });

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
      setSearch("");
    };

  const list = (anchor: Anchor) => (
    <Box sx={{ width: "auto" }} p={4} role="presentation">
      <Typography className="text-slate-500">Search Users</Typography>
      <Box marginTop={"10px"} className="flex flex-col">
        <div className="flex justify-around">
          <div>
            <SearchIcon />{" "}
            <input
              onChange={handleChange}
              placeholder="search... "
              className="bg-transparent outline-0"
            />
          </div>
          {search.trim() ? (
            <button
              className="w-fit h-fit px-2 p-1 text-center bg-slate-500 text-white hover:bg-slate-600 rounded-md"
              onClick={async () => {
                const chatId = await createChatApi(filterSearchResult[0].id);
                await queryClient.invalidateQueries(["chatlist"]);
                setState({ right: false });
                console.log(chatId.data.id, "vhat_id");
                setShow(chatId.data.id);
              }}
            >
              Go
            </button>
          ) : (
            ""
          )}
        </div>
        {search && search.trim() && filterSearchResult.length >= 1 ? (
          <div className={`p-2  `}>
            {filterSearchResult.map((searchItems: any) => (
              <div className="text-sm w-full m-2 h-[30px] p-1  hover:bg-slate-500 bg-white hover:underline rounded-sm cursor-pointer">
                {" "}
                {searchItems.username}
              </div>
            ))}
          </div>
        ) : filterSearchResult.length === 0 && search.trim() ? (
          <div className={`p-2 `}>
            <p className="text-sm m-2 h-[30px] p-1 hover:bg-slate-500 bg-white text-red-500 underline rounded-sm cursor-pointer">
              No User Found
            </p>
          </div>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {error ? (
        <p>error</p>
      ) : !data ? (
        <Responsiveness
          sx={{
            position: "relative",
            width: { md: 320, lg: "auto" },
            backgroundColor: "white",
          }}
          className="border-solid border-l-[0.5px] border-slate-300 h-screen"
        >
          <Stack
            direction="column"
            spacing={2.4}
            p={4}
            sx={{ flexGrow: 1, overflow: "auto", height: "100%" }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((_: unknown, index: number) => (
              <ChatListSkeleton key={index} />
            ))}
          </Stack>
        </Responsiveness>
      ) : (
        <Responsiveness
          sx={{
            width: { md: 320, lg: "auto" },
            backgroundColor: "white",
          }}
          className={` border-solid border-l-[0.5px] border-slate-300`}
        >
          <ResponsiveLayout p={3} spacing={1} sx={{ height: { lg: "100vh" } }}>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                sx={{ display: { md: "block", sm: "none" } }}
              >
                chats
              </Typography>

              <Tooltip title="Search" arrow>
                <Button>
                  <BsSearch
                    className="text-xl"
                    onClick={toggleDrawer("right", true)}
                  />
                </Button>
              </Tooltip>
            </Stack>
            <Divider />
            <Stack
              direction="column"
              spacing={2.4}
              sx={{ flexGrow: 1 }}
              className="customScrollbar h-screen overflow-auto "
            >
              <ChatCards chatlist={data.data} />
            </Stack>
          </ResponsiveLayout>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </Responsiveness>
      )}
    </>
  );
};

const ChatCards = ({ chatlist }: any) => {
  const { setShow } = useContext(SignUpContext);
  const navigate = useNavigate();
  const [windowWidth, setWindoWidth] = useState(window.innerWidth);

  const handleWindowWidth = () => {
    setWindoWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowWidth);

    return () => {
      window.removeEventListener("resize", handleWindowWidth);
    };
  }, [windowWidth]);

  const auth = useAppSelector((state) => state.user);
  console.log(chatlist, "chatlist");
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
    <>
      {chatlist.map((chats: any) =>
        chats.users.map((chat: any) => {
          return (
            auth.id !== chat.id && (
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  backgroundColor: "white",
                }}
                p={2}
                className="border-slate-200 border-solid border-b cursor-pointer "
                onClick={() => {
                  setShow(chats);
                  windowWidth <= 680
                    ? navigate(`/chat/chat/${chat.id}`)
                    : setShow(chats);
                }}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack direction="row" spacing={2}>
                    {/* <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    > */}
                    {chat.profile_photo === "string" ? (
                      <Avatar src="" />
                    ) : (
                      <Avatar src={chat.profile_photo} />
                    )}

                    {/* </StyledBadge> */}
                    <Stack spacing={0.3}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: { md: "block", sm: "none" },
                        }}
                      >
                        {chat.username}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: { md: "block", sm: "none" },
                        }}
                      >
                        xxxx
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* <Stack spacing={2} alignItems="center">
                    <Typography
                      sx={{
                        fontWeight: 600,
                        display: { md: "block", sm: "none" },
                      }}
                      variant="caption"
                    >
                      9:36
                    </Typography>
                    <Badge
                      color="primary"
                      badgeContent={2}
                      sx={{
                        display: { md: "block", sm: "none" },
                      }}
                    ></Badge>
                  </Stack> */}
                </Stack>
              </Box>
            )
          );
        })
      )}
    </>
  );
};

export default Chat;
