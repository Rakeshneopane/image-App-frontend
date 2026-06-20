import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { updateAlbum } from "@/store/slices/albumSlice";
import { toast } from "sonner";

export default function EditAlbumDialog({ album, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(album.name);
  const [description, setDescription] = useState(album.description || "");
  const [isPublic, setIsPublic] = useState(album.isPublic || false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Album name is required");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(updateAlbum({
        albumId: album._id,
        albumUpdateData: { name, description, isPublic }
      })).unwrap();
      toast.success("Album updated successfully");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Failed to update album");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Album</DialogTitle>
          <DialogDescription>
            Update your album details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Album Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter album name"
              required
            />
          </div>
          
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter album description"
              rows={3}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isPublic" className="text-sm font-medium">
              Make album public
            </label>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}