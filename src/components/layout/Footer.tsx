
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-warm-200 py-6 bg-warm-50">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-warm-600 text-sm">
          <div className="mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} PhotoKeepsake. All rights reserved.</p>
          </div>
          <div className="flex items-center">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-warm-500 fill-warm-500" />
            <span>for your memories</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
