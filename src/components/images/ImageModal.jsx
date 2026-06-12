import { useState } from "react";
import { useDispatch } from "react-redux";
import { X, Heart, Download, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { commentImages, toggleImages } from "@/store/slices/imageSlice";
import { toast } from "sonner";

export default function ImageModal({ image, onClose, onToggleFavorite }) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [isCommenting, setIsCommenting] = useState(false);
    const [localComments, setLocalComments] = useState(image?.comments || []);
    const [isFavorite, setIsFavorite] = useState(image?.isFavorite);

    const handleToggleFavorite = async () => {
        try {
            await dispatch(toggleImages({
                imageId: image._id,
                imageData: { isFavorite: !isFavorite }
            })).unwrap();
            setIsFavorite(f => !f);
            toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
            onToggleFavorite?.();
        } catch {
            toast.error("Failed to update favorite");
        }
    };

    const handleAddComment = async () => {
        if (!comment.trim()) return;
        setIsCommenting(true);
        try {
            const result = await dispatch(commentImages({
                imageId: image._id,
                comments: { comment: comment.trim() }
            })).unwrap();
            setLocalComments(result.image.comments);
            setComment("");
            toast.success("Comment added");
        } catch {
            toast.error("Failed to add comment");
        } finally {
            setIsCommenting(false);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(image.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = image.name || "image.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download started");
        } catch {
            toast.error("Failed to download");
        }
    };
    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Image */}
                <div className="bg-black flex items-center justify-center md:w-2/3 min-h-64">
                    <img
                        src={image.url}
                        alt={image.name}
                        className="max-w-full max-h-[90vh] object-contain"
                    />
                </div>

                {/* Sidebar */}
                <div className="md:w-1/3 flex flex-col p-4 overflow-y-auto">
                    
                    {/* Name */}
                    <h3 className="font-semibold text-base truncate mb-1">{image.name}</h3>

                    {/* Actions */}
                    <div className="flex gap-2 mb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleToggleFavorite}
                            className="flex-1"
                        >
                            <Heart className={`w-4 h-4 mr-1 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                            {isFavorite ? "Unfavorite" : "Favorite"}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                            className="flex-1"
                        >
                            <Download className="w-4 h-4 mr-1" /> Download
                        </Button>
                    </div>

                    {/* Tags */}
                    {image.tags?.length > 0 && (
                        <div className="mb-4">
                            <p className="text-xs font-medium text-gray-500 mb-1">Tags</p>
                            <div className="flex flex-wrap gap-1">
                                {image.tags.map((tag, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Person */}
                    {image.person?.length > 0 && (
                        <div className="mb-4">
                            <p className="text-xs font-medium text-gray-500 mb-1">People</p>
                            <div className="flex flex-wrap gap-1">
                                {image.person.map((p, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                        {p}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="mb-4 text-xs text-gray-400 space-y-1">
                        {image.size && <p>Size: {(image.size / 1024).toFixed(1)} KB</p>}
                        {image.createdAt && <p>Uploaded: {new Date(image.createdAt).toLocaleDateString()}</p>}
                    </div>

                    {/* Comments */}
                    <div className="flex-1 flex flex-col">
                        <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" /> Comments ({localComments.length})
                        </p>

                        <div className="flex-1 overflow-y-auto space-y-2 mb-3 max-h-40">
                            {localComments.length === 0 ? (
                                <p className="text-xs text-gray-400">No comments yet</p>
                            ) : (
                                localComments.map((c, i) => (
                                    <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
                                        {c}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add Comment */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleAddComment()}
                                className="text-sm"
                            />
                            <Button
                                size="icon"
                                onClick={handleAddComment}
                                disabled={isCommenting || !comment.trim()}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}