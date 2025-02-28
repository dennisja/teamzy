import Link from "next/link";

const TEXT = {
  title: "404",
  description: "Oops! Page not found",
  returnToHome: "Return to Home",
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{TEXT.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{TEXT.description}</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          {TEXT.returnToHome}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
