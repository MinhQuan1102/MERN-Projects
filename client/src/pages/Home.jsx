import React from "react";
import Card from "../components/Card";
import { posts } from "../data";

const Home = () => {
  return (
    <div className="home">
      {posts.map((post) => (
        <Card post={post} key={post.id}/>
      ))}
    </div>
  );
};

export default Home;
