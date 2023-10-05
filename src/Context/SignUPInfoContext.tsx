import React, {
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";

type Message = {
  messgae: string;
};

type SignUpInfo = {
  email: string;
  password: string;
  confirmpassword: string;
  fullName: string;
  userName: string;
  about: string;
};

export type UserInfo = {
  id: number;
  username: string;
  full_name: string;
  profile_photo: string;
};

type GetChatHeader = {
  id: number;
  users: UserInfo[];
};

const initState: SignUpInfo = {
  email: "",
  password: "",
  confirmpassword: "",
  userName: "",
  fullName: "",
  about: "",
};

export type SignUpInfoContextType = {
  signUpInfo: SignUpInfo;
  setSignUpInfo: React.Dispatch<React.SetStateAction<SignUpInfo>>;
  images: string | null;
  show: GetChatHeader | null;
  notificationOpen: boolean;
  setImages: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setOpened: React.Dispatch<React.SetStateAction<Message | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShow: React.Dispatch<React.SetStateAction<GetChatHeader | null>>;
  error: string | null;
  loading: boolean;
  opened: Message | null;
  setNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContextState = {
  signUpInfo: {
    email: "",
    password: "",
    confirmpassword: "",
    userName: "",
    fullName: "",
    about: "",
  },
  setSignUpInfo: (signUpInfo: SignUpInfo) => signUpInfo,
  images: null,
  setImages: (images: string) => images,
  error: null,
  loading: false,
  opened: null,
  show: null,
  notificationOpen: false,
  setError: (error: string | null) => error,
  setOpened: (opened: string | null) => opened,
  setLoading: (loading: boolean) => !loading,
  setShow: (show: GetChatHeader | null) => show,
  setNotificationOpen: (nottificationOpen: boolean) => !nottificationOpen,
} as SignUpInfoContextType;

export const SignUpContext = createContext(defaultContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

const SignUPInfoContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>(initState);
  const [images, setImages] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<GetChatHeader | null>(null);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);


  return (
    <SignUpContext.Provider
      value={{
        signUpInfo,
        setSignUpInfo,
        images,
        setImages,
        loading,
        setLoading,
        error,
        setError,
        opened,
        setOpened,
        show,
        setShow,
        notificationOpen,
        setNotificationOpen,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useAccountInfo = () => useContext(SignUpContext);

export default SignUPInfoContextProvider;
