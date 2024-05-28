import React, { useEffect } from 'react';
import { Container, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      history.push("/auth");
    }
  }, [history]);

  return (
    <div className="">
      <Container className="text-center flex flex-col justify-center align-center">
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          w="100%"
          m="40px 0 15px 0"
          textAlign="center"
        >
          <h1 className="md:text-6xl text-white">
            Chat<span className="md:text-8xl" style={{color: "#3182CE" }}>App</span>
          </h1>
        </Box>
        <Box
          className="md:text-xl md:w-400"
          bg="gray.700"
          // w="200%"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.600"
        >
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab width="50%" _selected={{ color: "white", bg: "#3182CE" }}>
                Login
              </Tab>
              <Tab width="50%" _selected={{ color: "white", bg: "#3182CE" }}>
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
