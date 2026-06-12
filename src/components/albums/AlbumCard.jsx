import { 
  Card, CardHeader, CardFooter, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, ImageIcon, Trash2, Pencil } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Photo1 from "../../assets/images/photo1.avif";

export default function AlbumCard({ album, onClick, onDelete, onEdit }) {
    const [imageError, setImageError] = useState(false);
    const isDefault = album.isDefault === true;

    return (
        <Card 
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            onClick={onClick}    
        >
            <div className="aspect-video bg-muted flex items-center justify-center">
               {!imageError ? (
                    <img 
                        src={Photo1} 
                        alt={album.name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                )}
            </div>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-base truncate flex-1">
                        {album.name}
                    </CardTitle>
                    <Badge variant={album.sharedUserIds?.length > 0 ? "default" : "secondary"} className="ml-2">
                        {album.sharedUserIds?.length > 0 ? "Shared" : "Private"}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2 text-xs">
                    {album.description || "No description"}
                </CardDescription>
            </CardHeader>            
            <CardFooter className="text-xs text-muted-foreground flex justify-between items-center">
                <span>{album.photoCount || 0} photos</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
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
            </CardFooter>
        </Card>
    );
}