
import { Button } from "@/components/ui/button";
import { LogOut, Camera } from "lucide-react";

type HeaderProps = {
  username: string;
  onLogout: () => void;
};

export default function Header({ username, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-warm-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Camera className="h-6 w-6 text-warm-600" />
          <h1 className="text-xl font-serif font-medium text-warm-900">PhotoKeepsake</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-warm-700 hidden md:inline-block">Welcome, {username}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout}
            className="border-warm-300 text-warm-700 hover:bg-warm-100"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
