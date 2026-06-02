import { Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Search, Upload, User, Menu, X, Camera, House, Image, Images, ArrowRight  } from "lucide-react";

export default function FeaturedAlbum ({ album }) {
    return (
        <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full">
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-muted">
                {album.coverImage ? (
                    <img 
                        src={album.coverImage} 
                        alt={album.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
                        <Images className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/40" />
                    </div>
                )}
                {album.featured && (
                    <Badge className="absolute top-2 left-2" variant="secondary">
                        Featured
                    </Badge>
                )}
            </div>
            <div className="p-3 md:p-4">
                <h3 className="font-semibold text-sm md:text-base mb-1 truncate">{album.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {album.description || "No description available"}
                </p>
                <div className="flex items-center justify-between mt-2 md:mt-3">
                    <Badge variant="outline" className="text-[10px] md:text-xs">
                        {album.photoCount ?? 0} photos
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                        View <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};