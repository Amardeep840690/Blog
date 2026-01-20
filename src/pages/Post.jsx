import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post?.UserId === userData?.userData?.$id;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      service.deletepost(post.$id).then((status) => {
        if (status) {
          service.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <article className="max-w-4xl mx-auto">
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
            {isAuthor && (
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgcolor="bg-green-600" className="hover:bg-green-700">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgcolor="bg-red-600"
                  className="hover:bg-red-700"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Published on {post.$createdAt.slice(0,10)}</span>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed">
                {parse(post.content)}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/all-posts"
              className="inline-flex items-center px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to all posts
            </Link>
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}