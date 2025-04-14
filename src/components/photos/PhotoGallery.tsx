
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, Trash2, Grid, List, Image } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Photo = {
  id: string;
  url: string;
  name: string;
  date: string;
};

type PhotoGalleryProps = {
  photos: Photo[];
  onDeletePhoto: (id: string) => void;
};

export default function PhotoGallery({ photos, onDeletePhoto }: PhotoGalleryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    } catch (e) {
      return "Unknown date";
    }
  };
  
  const handleDownload = (photo: Photo) => {
    // Create an anchor element
    const a = document.createElement("a");
    a.href = photo.url;
    a.download = photo.name || "photo.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success("Photo downloaded successfully");
  };
  
  const confirmDelete = (id: string) => {
    setPhotoToDelete(id);
  };
  
  const handleDelete = () => {
    if (photoToDelete) {
      onDeletePhoto(photoToDelete);
      toast.success("Photo deleted successfully");
      setPhotoToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-warm-900">My Photos</h2>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-warm-500 hover:bg-warm-600 text-white" : "border-warm-300 text-warm-700"}
          >
            <Grid size={18} />
            <span className="sr-only">Grid View</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-warm-500 hover:bg-warm-600 text-white" : "border-warm-300 text-warm-700"}
          >
            <List size={18} />
            <span className="sr-only">List View</span>
          </Button>
        </div>
      </div>
      
      {photos.length === 0 ? (
        <Card className="border-warm-200">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Image className="h-16 w-16 text-warm-300 mb-4" />
            <h3 className="text-lg font-medium text-warm-800 mb-2">No photos yet</h3>
            <p className="text-warm-600 mb-4">Upload some photos to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === "grid" ? "photo-grid" : "photo-list"}>
          {photos.map((photo) => (
            <Card 
              key={photo.id} 
              className={`group border-warm-200 overflow-hidden transition-shadow hover:shadow-md ${
                viewMode === "list" ? "flex items-center" : ""
              }`}
            >
              <div className={`${viewMode === "list" ? "w-24 h-24 flex-shrink-0" : "aspect-square w-full"}`}>
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className={`p-3 ${viewMode === "list" ? "flex-1 flex justify-between items-center" : ""}`}>
                <div>
                  <h3 className="font-medium text-warm-800 truncate" title={photo.name}>
                    {photo.name}
                  </h3>
                  <p className="text-xs text-warm-500">{formatDate(photo.date)}</p>
                </div>
                <div className={`flex gap-2 mt-2 ${viewMode === "list" ? "mt-0" : ""}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(photo)}
                    className="border-warm-300 text-warm-700 hover:bg-warm-100"
                  >
                    <Download size={16} />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => confirmDelete(photo.id)}
                    className="border-warm-300 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <AlertDialog open={!!photoToDelete} onOpenChange={(open) => !open && setPhotoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the photo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-warm-300 text-warm-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
