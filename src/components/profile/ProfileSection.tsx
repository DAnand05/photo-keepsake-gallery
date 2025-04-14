
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { User, Edit, Check } from "lucide-react";

type ProfileSectionProps = {
  user: {
    username: string;
    bio: string;
    avatar: string;
  };
  onUpdateProfile: (profile: { username: string; bio: string; avatar: string }) => void;
};

export default function ProfileSection({ user, onUpdateProfile }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      username,
      bio,
      avatar: avatarUrl
    });
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <Card className="w-full border-warm-200 shadow-md overflow-hidden bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-warm-500">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback className="bg-warm-200 text-warm-800">
                <User size={36} />
              </AvatarFallback>
            </Avatar>
            
            {isEditing && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-warm-500 hover:bg-warm-600 text-white"
                  >
                    <Edit size={14} />
                    <span className="sr-only">Change avatar</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change profile picture</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex justify-center">
                      <Avatar className="w-32 h-32 border-2 border-warm-500">
                        <AvatarImage src={avatarUrl} alt={username} />
                        <AvatarFallback className="bg-warm-200 text-warm-800">
                          <User size={48} />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                      <Label htmlFor="avatar">Upload picture</Label>
                      <Input 
                        id="avatar" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange} 
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <div className="flex-1 space-y-3 text-center sm:text-left">
            {isEditing ? (
              <>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-warm-200"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="border-warm-200 resize-none"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-warm-900">{username}</h2>
                <p className="text-warm-700 max-w-md">{bio || "No bio yet."}</p>
              </>
            )}
            
            <div className="pt-2">
              {isEditing ? (
                <Button 
                  onClick={handleSaveProfile} 
                  className="bg-warm-500 hover:bg-warm-600 text-white"
                >
                  <Check size={16} className="mr-1" />
                  Save Changes
                </Button>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline" 
                  className="border-warm-300 text-warm-700 hover:bg-warm-50"
                >
                  <Edit size={16} className="mr-1" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
