import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { imageAPI } from "../api/image";

export function ImageUploader({ images = [], onImagesChange, maxImages = 10 }) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState(images);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + previews.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Max size is 5MB`);
          return null;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`);
          return null;
        }

        const result = await imageAPI.uploadImage(file);
        return result.data;
      });

      const results = await Promise.all(uploadPromises);
      const uploadedImages = results.filter((r) => r !== null);

      const newPreviews = [...previews, ...uploadedImages];
      setPreviews(newPreviews);
      onImagesChange(newPreviews);

      toast.success(`${uploadedImages.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = async (index) => {
    const imageToRemove = previews[index];
    
    try {
      if (imageToRemove.fileId) {
        await imageAPI.deleteImage(imageToRemove.fileId);
      }

      const newPreviews = previews.filter((_, i) => i !== index);
      setPreviews(newPreviews);
      onImagesChange(newPreviews);

      toast.success("Image removed");
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove image");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-[#111827]">
          Images ({previews.length}/{maxImages})
        </h3>
        {previews.length < maxImages && (
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-[#2563EB] hover:bg-[#1E40AF] text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Images"}
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {previews.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.thumbnailUrl || image.url}
                alt={`Preview ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg border border-[#E5E7EB]"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#2563EB] text-white text-xs rounded">
                  Cover
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center">
          <ImageIcon className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
          <p className="text-[#6B7280] mb-2">No images uploaded</p>
          <p className="text-sm text-[#9CA3AF]">
            Click "Upload Images" to add photos
          </p>
        </div>
      )}

      <p className="text-sm text-[#6B7280]">
        Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
      </p>
    </div>
  );
}
