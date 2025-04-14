
import { useState, useEffect } from "react";
import { toast } from "sonner";
import AuthForm from "@/components/auth/AuthForm";
import ProfileSection from "@/components/profile/ProfileSection";
import PhotoUploader from "@/components/photos/PhotoUploader";
import PhotoGallery from "@/components/photos/PhotoGallery";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Types
type User = {
  username: string;
  bio: string;
  avatar: string;
};

type Photo = {
  id: string;
  url: string;
  name: string;
  date: string;
};

// Default user data
const defaultUser: User = {
  username: "photo_lover",
  bio: "I love capturing beautiful moments and sharing them with the world.",
  avatar: ""
};

// Sample photos
const samplePhotos: Photo[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Summer Vacation",
    date: "2023-06-15T15:32:00Z",
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1567351344546-effdded342f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Family Gathering",
    date: "2023-07-22T09:12:00Z",
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1623944893329-b7dff6b9b8c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Birthday Party",
    date: "2023-08-10T18:45:00Z",
  },
];

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  
  // Check for existing session on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      
      // Load user data from localStorage if available
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      // Load photos from localStorage if available
      const storedPhotos = localStorage.getItem("photos");
      if (storedPhotos) {
        setPhotos(JSON.parse(storedPhotos));
      }
    }
  }, []);
  
  // Save user data to localStorage when it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, isAuthenticated]);
  
  // Save photos to localStorage when they change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("photos", JSON.stringify(photos));
    }
  }, [photos, isAuthenticated]);
  
  const handleLogin = (userData: { username: string; password: string }) => {
    // In a real app, we would validate credentials with a backend
    setIsAuthenticated(true);
    setUser({ ...user, username: userData.username }); // Update username from login
    localStorage.setItem("isAuthenticated", "true");
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully");
  };
  
  const handleUpdateProfile = (updatedProfile: User) => {
    setUser(updatedProfile);
  };
  
  const handlePhotoUpload = (newPhotos: Photo[]) => {
    setPhotos(prevPhotos => [...newPhotos, ...prevPhotos]);
  };
  
  const handleDeletePhoto = (id: string) => {
    setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-warm-50 p-4">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-serif font-bold text-warm-900 mb-2">PhotoKeepsake</h1>
          <p className="text-warm-700">Your personal photo gallery</p>
        </div>
        <AuthForm onLogin={handleLogin} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-warm-50">
      <Header username={user.username} onLogout={handleLogout} />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 space-y-8">
        <ProfileSection user={user} onUpdateProfile={handleUpdateProfile} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PhotoUploader onUpload={handlePhotoUpload} />
          </div>
          
          <div className="lg:col-span-2">
            <PhotoGallery photos={photos} onDeletePhoto={handleDeletePhoto} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
