import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectToken } from "../auth/authSlice";
import PostForm from "./PostForm";

// Main Page for activities
export default function PostPage(){
    const token = useSelector(selectToken);

    return (
        <>
        {token && <PostForm/>}
        <h1>Posts</h1>
        <Posts />
        </>
    )
}