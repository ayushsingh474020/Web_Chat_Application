import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    FormControl,
    Input,
    Box,
  } from '@chakra-ui/react'
import { ChatState } from '../../Context/chatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName,setGroupChatName] = useState();
    const [selectedUsers,setSelectedUsers] = useState([]);
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([])
    const [loading,setLoading] = useState(false)

    const toast = useToast();

    const {user,chats,setChats} = ChatState(); 

    const handleSearch = async (query) => {
        setSearch(query)
        if(!query){
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers:{
                  Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.get(`/api/user?search=${search}`,config)
            // console.log(data);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: 'Error Occured',
                description:error.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            return;
        }
    }

    const handleSubmit = async () => {
        if(!selectedUsers || !groupChatName){
            toast({
                title: 'Please fill all fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            return;
        }

        try {
            const config = {
                headers:{
                  Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.post("/api/chat/group",
            {
                name:groupChatName,
                users:JSON.stringify(selectedUsers.map((u)=>u._id))
            },config)

            setChats([data,...chats]);
            onClose()
            toast({
                title: 'New group Created',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            return;

        } catch (error) {
            toast({
                title: 'Failed to create the Chat!',
                description:error.description.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            return;
        }
    }

    const handleGroup = (userToAdd)=> {
        if(selectedUsers.includes(userToAdd)){
            toast({
                title: 'Already Added',
                description:"User Already in the Group",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            return;
        }
        setSelectedUsers([...selectedUsers,userToAdd]);
    }

    const handleDelete = (delUser) => {
        setSelectedUsers(
            selectedUsers.filter((sel) => sel._id !== delUser._id)
        );
    }

    return (
      <>
        <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            >Create Group Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
              <FormControl>
                <Input placeholder='Chat Name' mb={3} onChange={(e)=>setGroupChatName(e.target.value)}/>
              </FormControl>
              <FormControl>
                <Input placeholder='Add Users' mb={1} onChange={(e)=>handleSearch(e.target.value)}/>
              </FormControl>
              <Box display="flex" width="100%" flexWrap="wrap" >
                {selectedUsers?.map((u)=>(
                    <UserBadgeItem key={user._id} user={u} handleFunction={()=>handleDelete(u)}/>
                ))}
              </Box>
              {loading?<div>Loading</div>:(
                searchResult?.slice(0,4).map((user)=>(
                    <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)} />
                ))
              )}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' onClick={handleSubmit}>
                Create Chat
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default GroupChatModal
