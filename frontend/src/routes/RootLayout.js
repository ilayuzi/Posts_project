import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";

function RootLayout({ title, showNewPostButton}){
    // Outlet is a place holder where the nested routes can render their content
    return(
        <>
        <MainHeader title={title} showNewPostButton={showNewPostButton}/>
        <Outlet/>
        </>
    )
}

export default RootLayout