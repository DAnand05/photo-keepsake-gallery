
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50 p-4">
      <div className="text-center max-w-md">
        <Camera className="h-16 w-16 text-warm-500 mx-auto mb-4" />
        <h1 className="text-5xl font-serif font-bold text-warm-900 mb-4">404</h1>
        <p className="text-xl text-warm-700 mb-6">Oops! We couldn't find the page you're looking for.</p>
        <Button asChild className="bg-warm-500 hover:bg-warm-600 text-white">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
