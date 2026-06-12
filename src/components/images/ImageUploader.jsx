import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImages } from "@/store/slices/imageSlice";
import { toast } from "sonner";
import { X, Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select, SelectContent, SelectGroup, SelectItem,
    SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export default function ImageUploader({ albumId: propAlbumId, onClose, onSuccess }) {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const { albumsData: albums } = useSelector((state) => state.albumSlice);
    const defaultAlbum = albums?.find(a => a.isDefault === true);

    const [selectedAlbumId, setSelectedAlbumId] = useState(propAlbumId || "");
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [tags, setTags] = useState("");
    const [person, setPerson] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!propAlbumId && !selectedAlbumId && defaultAlbum?._id) {
            setSelectedAlbumId(defaultAlbum._id);
        }
    }, [defaultAlbum, propAlbumId, selectedAlbumId]);

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files);
        const valid = selected.filter(f =>
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type)
        );
        if (valid.length !== selected.length) {
            toast.error("Only jpeg, jpg, png, webp files are allowed");
        }
        setFiles(valid);
        setPreviews(valid.map(f => URL.createObjectURL(f)));
    };

    const removeFile = (index) => {
        setFiles(f => f.filter((_, i) => i !== index));
        setPreviews(p => p.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!files.length) {
            toast.error("Please select at least one image");
            return;
        }
        if (!selectedAlbumId) {
            toast.error("Please select an album");
            return;
        }

        const formData = new FormData();
        files.forEach(f => formData.append("images", f));
        formData.append("albumId", selectedAlbumId); // ← fixed

        if (tags.trim()) {
            formData.append("tags", JSON.stringify(
                tags.split(",").map(t => t.trim()).filter(Boolean)
            ));
        }
        if (person.trim()) {
            formData.append("person", JSON.stringify(
                person.split(",").map(p => p.trim()).filter(Boolean)
            ));
        }
        formData.append("isFavorite", isFavorite.toString());

        setIsLoading(true);
        try {
            await dispatch(uploadImages(formData)).unwrap();
            toast.success("Images uploaded successfully");
            onSuccess?.();
            onClose();
        } catch (error) {
            toast.error(error || "Failed to upload images");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Upload Images</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drop Zone */}
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition mb-4"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImageIcon className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to select images</p>
                    <p className="text-xs text-gray-400 mt-1">jpeg, jpg, png, webp</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {previews.map((src, i) => (
                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                                <img src={src} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => removeFile(i)}
                                    className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3 text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Album selector — only when no albumId prop */}
                {!propAlbumId && (
                    <div className="mb-3">
                        <label className="text-sm font-medium">Album</label>
                        <Select value={selectedAlbumId} onValueChange={setSelectedAlbumId}>
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Select an album" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Albums</SelectLabel>
                                    {albums?.map(album => (
                                        <SelectItem key={album._id} value={album._id}>
                                            {album.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Metadata */}
                <div className="space-y-3 mb-4">
                    <div>
                        <label className="text-sm font-medium">Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
                        <Input
                            placeholder="beach, sunset, travel"
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Person <span className="text-gray-400 font-normal">(comma separated)</span></label>
                        <Input
                            placeholder="John, Jane"
                            value={person}
                            onChange={e => setPerson(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isFavorite"
                            checked={isFavorite}
                            onChange={e => setIsFavorite(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="isFavorite" className="text-sm font-medium">Mark as favorite</label>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={isLoading || !files.length}>
                        <Upload className="w-4 h-4 mr-2" />
                        {isLoading ? "Uploading..." : `Upload${files.length > 0 ? ` (${files.length})` : ""}`}
                    </Button>
                </div>
            </div>
        </div>
    );
}