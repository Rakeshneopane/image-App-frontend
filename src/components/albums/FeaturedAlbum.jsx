import { Card } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { ArrowRight, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import Photo1 from "../../assets/images/photo1.avif";

export default function FeaturedAlbum({ album }) {
    const navigate = useNavigate();

    if (!album) {
        return (
            <Card className="overflow-hidden h-full">
                <Skeleton className="h-40 sm:h-48 md:h-56 lg:h-64" />
                <div className="p-3 md:p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </Card>
        );
    }

    return (
        <Card
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full"
            onClick={() => navigate(`/album/${album._id}`)}
        >
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-muted">
                <img
                    src={album.coverImage || Photo1}
                    alt={album.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = Photo1; }}
                />
                <Badge className="absolute top-2 left-2" variant="secondary">
                    Featured
                </Badge>
            </div>
            <div className="p-3 md:p-4">
                <h3 className="font-semibold text-sm md:text-base mb-1 truncate">{album.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {album.description || "No description available"}
                </p>
                <div className="flex items-center justify-between mt-2 md:mt-3">
                    <Badge variant="outline" className="text-[10px] md:text-xs">
                        {album.photoCount || 0} photos
                    </Badge>
                    <Button
                        onClick={(e) => { e.stopPropagation(); navigate(`/album/${album._id}`); }}
                        variant="ghost" size="sm" className="text-xs md:text-sm"
                    >
                        View <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}