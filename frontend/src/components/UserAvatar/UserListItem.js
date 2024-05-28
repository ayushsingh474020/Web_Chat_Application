import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user,handleFunction}) => {
  return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    _hover={{
        background:"#3182CE",
        color:"white"
    }}
    width="100%"
    display="flex"
    alignItems="center"
    color="white"
    bg="gray.700"
    px={3}
    py={2}
    mb={2}
    borderRadius="lg"
    borderColor="blue"
    justifyContent="center"
    p="15px"
    // alignItems="center"
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={user.name} src={user.pic} />
      <Box>
        <Text m="0px">{user.name}</Text>
        <Text fontSize="xs" m="0px">
            <b>Email:</b>{user.email}
        </Text>
      </Box>
    </Box>
  )
}

export default UserListItem
