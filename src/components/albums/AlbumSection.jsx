import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, Images, Sparkles } from "lucide-react";
import FeaturedAlbum from "./FeaturedAlbum";
import { useSelector } from "react-redux";

export default function AlbumSection(){
    const {albumsData: albums} = useSelector((state)=>state.albumSlice);
    
    return (
        <div className="p-4 h-full flex flex-col"> 
            <div className="flex items-center justify-between mb-4">
                <h5 className="flex items-center gap-1 font-semibold">
                    <Sparkles className="h-4 w-4"/>
                    Recent Uploads
                </h5>
                <Button variant="ghost" size="sm">
                    View all 
                    <ArrowRight className="h-4 w-4 ml-1"/>
                </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="w-full md:w-1/2">
                    {albums?.[0] && <FeaturedAlbum album={albums[0]} />}
                </div>
                
                <div className="w-full md:w-1/2">
                    <div className="grid grid-cols-2 gap-3 h-full">
                        {albums?.slice(1, 5).map((album) => (
                            <div key={album._id} className="h-full">
                                <SmallAlbumCard album={album} />
                            </div>
                        ))}
                        {Array.from({ 
                            length: Math.max(0, 4 - (albums?.slice(1,5).length || 0)) 
                        }).map((_, i) => (
                            <Card key={`sk-${i}`} className="overflow-hidden h-full">
                                <Images className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/40" />
                                <Skeleton className="h-full w-full" />
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SmallAlbumCard({ album }) {
    return (
        <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="relative h-28 bg-muted flex-shrink-0">
                {album.coverImage ? (
                    <img 
                        src={album.coverImage} 
                        alt={album.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
                        <Images className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                )}
                {album.shared && (
                    <Badge className="absolute top-2 left-2 text-xs" variant="secondary">
                        Shared
                    </Badge>
                )}
            </div>
            <div className="p-2">
                <p className="text-sm font-medium truncate">{album.name}</p>
                <p className="text-xs text-muted-foreground">{album.photoCount ?? 0} photos</p>
            </div>
        </Card>
    );
}