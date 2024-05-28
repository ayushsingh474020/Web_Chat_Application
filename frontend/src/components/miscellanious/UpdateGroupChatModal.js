import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    useDisclosure,
    Button,
    useToast,
    Box,
    FormControl,
    Input,
    Spinner,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/chatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain,fetchMessages}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [groupChatName,setGroupChatName] = useState()
    const [search,setSearch] = useState()
    const [searchResult,setSearchResult] = useState()
    const [loading,setLoading] = useState(false)
    const [renameLoading,setRenameLoading] = useState(false)

    const {selectedChat,setSelectedChat,user} = ChatState();

    const toast = useToast();

    const handleRemove = async (user1)=>{
      if(selectedChat.groupAdmin._id !== user._id && user1._id!==user._id){
        toast({
          title: 'Only group admin can remove someone',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom"
        })
        return;
      }
      try {
        setLoading(true)

        const config={
          headers:{
              Authorization:`Bearer ${user.token}`
          }
        }

        const {data} = await axios.put("/api/chat/groupremove",{
          chatId:selectedChat._id,
          userId:user1._id
        },config)

        user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        fetchMessages()
        setLoading(false)
      } catch (error) {
        toast({
          title: 'Error Occured',
          description:error.response.data.message,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom"
        })
        setLoading(false);
        return;
      }
    }

    const handleAddUser = async (user1) =>{
      if(selectedChat.users.find((u)=>u._id === user1._id)){
        toast({
          title: 'User Already in the group',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:"bottom"
        })
        return;
      }

      if(selectedChat.groupAdmin._id !== user._id ){
        toast({
          title: 'User not Admin',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom"
        })
        return;
      }

      try {
        setLoading(true)

        const config={
          headers:{
              Authorization:`Bearer ${user.token}`
          }
        }

        const {data} = await axios.put("/api/chat/groupadd",{
          chatId:selectedChat._id,
          userId:user1._id
        },config)

        setSelectedChat(data);
        setFetchAgain(!fetchAgain)
        setLoading(false);
      } catch (error) {
        toast({
          title: 'Error Occured',
          description:error.response.data.message,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom"
        })
        setLoading(false);
        return;
      }
    }

    const handleRename = async ()=>{
        if(!groupChatName){
            return;
        }

        try {
            setRenameLoading(true)

            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.put("/api/chat/rename",
            {
                chatId:selectedChat._id,
                chatName:groupChatName
            },config)

            console.log(data);

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false);
        } catch (error) {
            toast({
                title: 'Error Occured',
                description:error.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            setRenameLoading(false)
        }
        setGroupChatName("")
    }

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
          console.log(data);
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

    return (
      <>
        <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen} />
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader fontSize="2em">{selectedChat.chatName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" flexWrap="wrap" width="100%">
                {selectedChat.users.map((u)=>(
                    <UserBadgeItem key={user._id} user={u} handleFunction={()=>handleRemove(u)} />
                ))}
            </Box>
            <FormControl display="flex">
                <Input placeholder='Chat Name' mb={3} value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} />
                <Button variant="solid" colorScheme='teal' ml={1} isLoading={renameLoading} onClick={handleRename}>Update</Button>
            </FormControl>
            <FormControl display="flex">
                <Input placeholder='Add user to group' mb={1} onChange={(e) => handleSearch(e.target.value)} />
                {/* <Button variant="solid" colorScheme='teal' ml={1} isLoading={renameLoading} onClick={handleRename}>Update</Button> */}
            </FormControl>
            {
              loading ? (
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              ) : (
                searchResult?.slice(0,4).map((user)=>(
                    <UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)} />
                ))
              )
            }
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => handleRemove(user)} colorScheme='red'>
                Leave Group
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default UpdateGroupChatModal;
