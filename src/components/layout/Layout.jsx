export default function Layout({leftComponent, rightComponent}){
    return(
        <div className="flex flex-row">
            <div className="w-1/2">
                {leftComponent}
            </div>
            <div className="w-1/2 overflow-x-auto">
                <div className="grid grid-cols-2 gap-4">
                    {rightComponent}
                </div>
            </div>
        </div>
    )
}