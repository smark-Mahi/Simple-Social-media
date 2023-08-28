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
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

type Anchor = "right";

const Chat = () => {
  const [state, setState] = useState({
    right: false,
  });

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    border: "0.5px solid #708090",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#A9B2BC",
      color: "white",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "18ch",
        "&:focus": {
          width: "24ch",
        },
      },
    },
  }));

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
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: "auto" }}
      p={4}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography className="text-slate-500">Search Users</Typography>
      <Box marginTop={"10px"}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon className="text-slate-500" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: 320,
        backgroundColor: "white",
      }}
      className="border-solid border-l-[0.5px] border-slate-300"
    >
      <Stack p={3} spacing={1} sx={{ height: "100vh" }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Typography variant="h6">chats</Typography>

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
          sx={{ flexGrow: 1, overflow: "auto", height: "100%" }}
        >
          <ChatCards />
          <ChatCards />
          {/* <ChatCards />
          <ChatCards />
          <ChatCards />
          <ChatCards />
          <ChatCards />
          <ChatCards />
          <ChatCards />
          <ChatCards />
          <ChatCards /> */}
        </Stack>
      </Stack>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </Box>
  );
};

const ChatCards = () => {
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
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "white",
      }}
      p={2}
      className="border-slate-200 border-solid border-b"
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar />
          </StyledBadge>
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">Rahman</Typography>
            <Typography variant="caption">xxxx</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            9:36
          </Typography>
          <Badge color="primary" badgeContent={2}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chat;
