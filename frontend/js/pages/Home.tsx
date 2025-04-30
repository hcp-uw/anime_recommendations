// import { useState, useEffect } from "react";

// import { RestService } from "../api";
import { Container } from "react-bootstrap";


import Brand from "../components/HomeInput/Brand";
import HomeInput from "../components/HomeInput/HomeInput";

const Home = () => {
  return (
    <Container className="py-5">
      <Brand />
      <HomeInput />
    </Container>
  );
};

export default Home;
