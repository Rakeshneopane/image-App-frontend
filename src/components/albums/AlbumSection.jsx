import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Sparkles } from "lucide-react";
import FeaturedAlbum from "./FeaturedAlbum";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllAlbum } from "@/store/slices/albumSlice";

import Photo6 from "../../assets/images/photo1.avif";
import Photo4 from "../../assets/images/photo2.avif";
import Photo5 from "../../assets/images/photo3.avif";
import Photo2 from "../../assets/images/photo4.avif";
import Photo3 from "../../assets/images/photo5.avif";
import Photo1 from "../../assets/images/photo6.avif";

export default function AlbumSection(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { userData : user } = useSelector((state)=> {
        return state.userSlice
    });
    const { albumsData: albums, fetchAlbumsStatus, albumError } = useSelector((state)=>state.albumSlice);
    
    useEffect(()=>{
        const loadAlbum = async()=>{
        if(user && fetchAlbumsStatus === "idle")
            try {
                await dispatch(fetchAllAlbum()).unwrap();
            } catch (error) {
                console.log("error in dashboard fetchAllAlbums dispatch", error);
            }
        }
        loadAlbum();          
    },[user, dispatch, fetchAlbumsStatus]);

    const placeholderAlbums = [
        { _id: 'ph-1', name: '', photoCount: 0, sharedUserIds: [], coverImage: Photo1 },
        { _id: 'ph-2', name: '', photoCount: 0, sharedUserIds: [], coverImage: Photo2 },
        { _id: 'ph-3', name: '', photoCount: 0, sharedUserIds: [], coverImage: Photo3 },
        { _id: 'ph-4', name: '', photoCount: 0, sharedUserIds: [], coverImage: Photo4 },
        { _id: 'ph-5', name: '', photoCount: 0, sharedUserIds: [], coverImage: Photo5 },
        { _id: 'ph-6', name: '', photoCount: 0, sharedUserIds: [], coverImage: Photo6 },
    ];

    if(fetchAlbumsStatus === "loading"){
        return(
            <div  
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
            >
                {[...Array(6)].map((_, i) => (
                    <Skeleton 
                        key={i} 
                        className="h-48 rounded-lg" 
                    />
                ))}
            </div>
        );
    }

     if (fetchAlbumsStatus === "error") {
        return (
            <div className="text-center py-8">
                <p 
                    className="text-red-500 mb-4"
                >
                    Error loading albums: {albumError}
                </p>
                <Button 
                    onClick={() => dispatch(fetchAllAlbum())}
                >
                    Try Again
                </Button>
            </div>
        );
    }
    
    if (!albums || albums.length === 0) {
        return (
            <div className="text-center py-8">
                <p 
                    className="text-gray-500"
                >
                    No albums yet. Upload your first photo!
                </p>
            </div>
        );
    }
    return (
        <div className="p-4 h-full flex flex-col"> 
            <div className="flex items-center justify-between mb-4">
                <h5 className="flex items-center gap-1 font-semibold">
                    <Sparkles className="h-4 w-4"/>
                    Recent Uploads
                </h5>
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={()=> navigate("/albums")}
                >
                    View all 
                    <ArrowRight className="h-4 w-4 ml-1"/>
                </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="w-full md:w-1/2">
                    {albums?.[0] && <FeaturedAlbum 
                            album={albums[0]}
                            onClick={() => navigate(`/album/${albums[0]._id}`)}
                            />}
                </div>
                
                <div className="w-full md:w-1/2">
                    <div className="grid grid-cols-2 gap-3 h-full">
                        
                        {albums?.slice(1, 5).map((album) => (
                            <SmallAlbumCard 
                                key={album._id} 
                                album={album} 
                                className="h-full"  
                                onClick={() => navigate(`/album/${album._id}`)}  
                            />
                        ))}

                        {Array.from({ 
                            length: Math.max(0, 4 - (albums?.slice(1,5).length || 0)) 
                        }).map((_, i) => (
                            <SmallAlbumCard 
                                key={`ph-${i}`}
                                album={placeholderAlbums[i]}
                                onClick={() => {}}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SmallAlbumCard({ album, onClick }) {
    return (
        <Card 
            className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full relative min-h-36"
            onClick={onClick}   
        >
            {/* Image fills entire card */}
            <div className="absolute inset-0 overflow-hidden">
            <img 
                src={album.coverImage || Photo2} 
                alt={album.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110`}
            />
            </div>
            {/* Dark overlay */}
            <div className={`absolute inset-0 transition-opacity duration-300 group-hover:bg-black/55`} />

            {/* Text overlaid at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-2">
                {album.name && (
                    <p className="text-sm font-medium truncate text-white">{album.name}</p>
                )}
                {album.photoCount > 0 && (
                    <p className="text-xs text-white/70">{album.photoCount} photos</p>
                )}
            </div>

            {album.sharedUserIds?.length > 0 && (
                <Badge className="absolute top-2 left-2 text-xs" variant="secondary">
                    Shared
                </Badge>
            )}
        </Card>
    );
}