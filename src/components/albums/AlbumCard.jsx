import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2, Pencil } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import Photo6 from "../../assets/images/photo1.avif";
import Photo4 from "../../assets/images/photo2.avif";
import Photo5 from "../../assets/images/photo3.avif";
import Photo2 from "../../assets/images/photo4.avif";
import Photo3 from "../../assets/images/photo5.avif";
import Photo1 from "../../assets/images/photo6.avif";

export default function AlbumCard({ album, onClick, onDelete, onEdit }) {
    const isDefault = album.isDefault === true;
    const [isHovered, setIsHovered] = useState(false);

    const photos = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];
    const placeholderImage = photos[album._id.charCodeAt(album._id.length - 1) % photos.length];

    return (
        <Card 
            className="overflow-hidden hover:shadow-2xl shadow-lg transition-all cursor-pointer relative min-h-48"
            onClick={onClick}  
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}  
        >
            {/* Image fills entire card */}
            
            <img 
                src={album.coverImage || placeholderImage} 
                alt={album.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                onError={(e) => { e.target.src = Photo1; }}
            />

            {/* Dark overlay */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'bg-black/55' : 'bg-black/40'}`} />

            {/* Top row — badges */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                <Badge variant={album.sharedUserIds?.length > 0 ? "default" : "secondary"}>
                    {album.sharedUserIds?.length > 0 ? "Shared" : "Private"}
                </Badge>

                {/* Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 bg-black/30 hover:bg-black/50 text-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem onClick={onEdit}>
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        {!isDefault && (
                            <DropdownMenuItem 
                                onClick={onDelete}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Bottom — album info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-sm font-semibold text-white truncate drop-shadow-sm">{album.name}</p>
                {album.description && (
                    <p className="text-xs text-white/70 line-clamp-1 drop-shadow-sm">{album.description}</p>
                )}
                <p className="text-xs text-white/60 mt-0.5  drop-shadow-sm">{album.photoCount || 0} photos</p>
            </div>
        </Card>
    );
}