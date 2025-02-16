import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user/login", { email, password }, config);
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (err) {
      toast({
        title: 'Error Occurred!',
        description: err.response.data.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
    }
  };

  return (
    <div style={{fontSize:"1.2em"}}>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel color="gray.300" fontSize="0.9em">Email</FormLabel>
          <Input
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            bg="gray.600"
            color="white"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel color="gray.300" fontSize="0.9em">Password</FormLabel>
          <InputGroup>
            <Input
              value={password}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.600"
              color="white"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick} bg="#3182CE" color="white">
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          width="100%"
          bg="#3182CE"
          color="white"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
          fontSize="0.9em"
        >
          Login
        </Button>
        <Button
          variant="solid"
          width="100%"
          colorScheme="red"
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          fontSize="0.9em"
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </div>
  );
};

export default Login;
