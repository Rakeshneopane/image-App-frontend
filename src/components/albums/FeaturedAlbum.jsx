import { Card } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import Photo1 from "../../assets/images/photo1.avif";
import { useState } from "react";

export default function FeaturedAlbum({ album }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

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
            className="overflow-hidden cursor-pointer hover:shadow-2xl shadow-lg transition-shadow h-full relative min-h-64"
            onClick={() => navigate(`/album/${album._id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image fills entire card */}
            <img
                src={album.coverImage || Photo1}
                alt={album.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
                onError={(e) => { e.target.src = Photo1; }}
            />

            {/* Dark overlay */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'bg-black/55' : 'bg-black/40'}`} />

            {/* Content overlaid */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4">
                <Badge variant="secondary" className="self-start">
                    Featured
                </Badge>

                <div>
                    <h3 className="font-semibold text-sm md:text-base mb-1 truncate text-white drop-shadow-sm">
                        {album.name}
                    </h3>
                    <p className="text-xs md:text-sm text-white/70 line-clamp-2 drop-shadow-sm">
                        {album.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between mt-2 md:mt-3">
                        <Badge variant="outline" className="text-[10px] md:text-xs text-white border-white/50 drop-shadow-sm">
                            {album.photoCount || 0} photos
                        </Badge>
                        <Button
                            onClick={(e) => { e.stopPropagation(); navigate(`/album/${album._id}`); }}
                            variant="ghost" size="sm" className="text-xs md:text-sm text-white hover:text-white hover:bg-white/20"
                        >
                            View <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}