import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
      service.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
      setPosts([]);
  }, [status]);
  
  if (!status || posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {status ? "No posts available" : "Welcome to our Blog"}
              </h1>
              <p className="text-gray-600 text-lg">
                {status
                  ? "Be the first to share your thoughts!"
                  : "Please login to read and share amazing posts"
                }
              </p>
            </div>
            {!status && (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">Latest Posts</h1>
          <p className="text-gray-600 text-center">Discover amazing stories and insights</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) =>
            post.status === "active" ? (
              <PostCard key={post.$id} {...post} />
            ) : null,
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
