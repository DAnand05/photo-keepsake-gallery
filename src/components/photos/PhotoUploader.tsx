
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, X, Type } from "lucide-react";

type PhotoUploaderProps = {
  onUpload: (photos: { id: string; url: string; name: string; date: string; caption: string }[]) => void;
};

export default function PhotoUploader({ onUpload }: PhotoUploaderProps) {
  const [previews, setPreviews] = useState<{ file: File; preview: string; caption: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Create previews for the selected files
      const newPreviews = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        caption: ""
      }));
      
      setPreviews([...previews, ...newPreviews]);
    }
  };
  
  const removePreview = (index: number) => {
    const updatedPreviews = [...previews];
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(updatedPreviews[index].preview);
    
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

  const updateCaption = (index: number, caption: string) => {
    const updatedPreviews = [...previews];
    updatedPreviews[index].caption = caption;
    setPreviews(updatedPreviews);
  };
  
  const handleUpload = () => {
    if (previews.length === 0) {
      toast.error("Please select photos to upload");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      // Convert previews to the expected format for the gallery
      const uploadedPhotos = previews.map((item, index) => ({
        id: `photo-${Date.now()}-${index}`,
        url: item.preview,
        name: item.file.name,
        date: new Date().toISOString(),
        caption: item.caption
      }));
      
      onUpload(uploadedPhotos);
      
      // Clear previews
      setPreviews([]);
      setIsUploading(false);
      
      toast.success(`${uploadedPhotos.length} photo${uploadedPhotos.length !== 1 ? 's' : ''} uploaded successfully`);
    }, 1500);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      
      // Filter for image files
      const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
      
      if (imageFiles.length === 0) {
        toast.error("Please drop image files only");
        return;
      }
      
      // Create previews for the image files
      const newPreviews = imageFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        caption: ""
      }));
      
      setPreviews([...previews, ...newPreviews]);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-dashed border-2 border-warm-300 bg-warm-50 hover:bg-warm-100 transition-colors">
        <CardContent className="p-6">
          <div 
            className="flex flex-col items-center justify-center gap-4 text-center py-8"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-warm-500" />
            <div>
              <h3 className="text-lg font-semibold text-warm-800 mb-1">Drop photos here</h3>
              <p className="text-warm-600 text-sm">or click to browse</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline"
              className="border-warm-400 text-warm-700 hover:bg-warm-200"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Photos
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {previews.map((item, index) => (
              <div key={index} className="relative group rounded-md overflow-hidden border border-warm-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/3 aspect-square">
                    <img 
                      src={item.preview} 
                      alt={`Preview ${index}`} 
                      className="w-full h-full object-cover rounded-md" 
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-warm-800 truncate" title={item.file.name}>
                        {item.file.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removePreview(index)}
                        className="bg-white rounded-full p-1 shadow-md"
                      >
                        <X size={16} className="text-warm-800" />
                      </button>
                    </div>
                    <div>
                      <label htmlFor={`caption-${index}`} className="block text-sm font-medium text-warm-700 mb-1">
                        <Type size={16} className="inline mr-1" />
                        Add a caption
                      </label>
                      <Textarea
                        id={`caption-${index}`}
                        placeholder="Write a caption for this photo..."
                        value={item.caption}
                        onChange={(e) => updateCaption(index, e.target.value)}
                        className="resize-none border-warm-200 focus:border-warm-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
              className="bg-warm-500 hover:bg-warm-600 text-white"
            >
              {isUploading ? "Uploading..." : `Upload ${previews.length} Photo${previews.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
