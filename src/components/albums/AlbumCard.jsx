import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function AlbumCard(){
    return (
        <>
            <div className="p-10">
                <Button>This is a button</Button>
                <Card> This is a card </Card>
                <Dialog>This is a dialog</Dialog>
                <Input placeholder ="Upload Image"/>
                <Label>This is a label</Label>
                <Badge>This is a badge</Badge>
                <Skeleton>This is a skeleton</Skeleton>
            </div>
        </>
    )
}