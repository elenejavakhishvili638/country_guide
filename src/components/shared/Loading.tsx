import Skeleton from "@mui/material/Skeleton"
import "./Loading.css"

function Loading() {
    return (
        <div className="loading-column-wrapper">
            <div className="loading-column">
                <Skeleton variant="text" width="55%" height={20} />
                <Skeleton variant="text" width="77%" height={20} />
                <Skeleton variant="text" width="100%" height={20} />
            </div>
            <div className="loading-column">
                <Skeleton variant="text" width="55%" height={20} />
                <Skeleton variant="text" width="77%" height={20} />
                <Skeleton variant="text" width="100%" height={20} />
            </div>
        </div>
    )
}

export default Loading