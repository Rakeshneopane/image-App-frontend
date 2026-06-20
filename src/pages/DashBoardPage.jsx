import { useState } from "react";
import { useSelector } from "react-redux";

import AlbumSection from "../components/albums/AlbumSection.jsx"
import ImageUploader from "@/components/images/ImageUploader.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Upload } from "lucide-react";

export const DashBoardPage = () => {
    console.log("DashboardPage rendered"); 
    
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    
    const { userData : user } = useSelector((state)=> {
        return state.userSlice
    });

    return (
        <div className="h-full flex flex-col bg-gradient-to-br bg-gray-100 w-full">
            {user ? (
                <div className="p-4 flex-shrink-0">
                    <div className="flex justify-between items-center">
                    <div>
                    <h1 className="font-bold text-xl tracking-tight text-foreground">
                        Welcome Back, {user.name.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Here's what's happening with your photos
                    </p>
                </div>

                <Button onClick={() => setUploadModalOpen(true)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                </div>
                </div>
            ) : (
                <p>Loading... user is gone</p>
            )}

            <div className="flex-1 min-h-0">
                <AlbumSection />
            </div>
            {uploadModalOpen && (
                <ImageUploader
                    onClose={() => setUploadModalOpen(false)}
                    onSuccess={() => setUploadModalOpen(false)}
                />
            )}
        </div>
    );
};
  