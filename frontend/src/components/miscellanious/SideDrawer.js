import { Avatar, Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../../Context/chatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import ChatLoading from '../ChatLoading';
import axios from "axios";
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from "../../config/ChatLogic";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('black', 'gray.700');

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error Occurred',
        description: error.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please enter something',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occurred',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.800"
        color="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
        borderColor="gray.700"
      >
        <Tooltip
          label="Search"
          hasArrow
          placement='bottom-end'
        >
          <Button onClick={onOpen} colorScheme="blue" display="flex" justifyContent="center" alignItems="center">
            <i className="fas fa-search"></i>
            <p style={{margin:"10px"}}>Search</p>
          </Button>
        </Tooltip>

        <h1 className="md:text-4xl text-xl text-white">Chat<span className="md:text-6xl text-2xl" style={{color:"#3182CE"}}>App</span> </h1>

        <div>
          <Menu>
            <MenuButton p={1}>
              {notification.length ? (
                <BellIcon fontSize="2xl" m={1} color="#3182CE" />
              ) : (
                <BellIcon fontSize="2xl" m={1} color="white" />
              )}
            </MenuButton>
            <MenuList bg="gray.800" borderColor="gray.700">
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList bg="gray.800" borderColor="gray.700">
              <ProfileModal user={user}>
                <MenuItem bg="gray.800" color="white">My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem bg="gray.800" color="white" onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="white">
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" marginBottom="10px">
              <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e) => { setSearch(e.target.value) }} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (<ChatLoading />) : (searchResult.map((user) => (
              <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
            )))}
            {loadingChat && <Spinner display="flex" ml="auto" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
