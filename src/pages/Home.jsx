import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  // console.log(posts);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {status
                  ? "No posts available at the moment."
                  : "Login to read posts"}
                {/* <div className="max-w-3xl mx-auto py-10 animate-pulse">
    <div className="h-64 bg-gray-300 rounded-xl mb-6"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
</div> */}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) =>
            post.status === "active" ? (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ) : null,
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
