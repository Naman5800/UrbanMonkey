import { useUser, SignIn } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  console.log("isSignedIn:", isSignedIn, "isLoaded:", isLoaded); // Debugging log

  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading state while Clerk is loading
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SignIn />
      </div>
    );
  }

  return children; // ✅ Render the protected page
};

export default ProtectedRoute;
