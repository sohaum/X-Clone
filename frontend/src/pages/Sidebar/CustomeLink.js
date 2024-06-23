import { lightBlue } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { useMatch, useResolvedPath } from "react-router-dom";

const CustomeLink  = ({children,to,...props}) => {
    let resolved=useResolvedPath(to);
    let match=useMatch({path:resolved.pathname,end:true});
    return (
        <div>
            <Link
            style={{textDecoration:'none', color:match?'#1DA1F2':'black'}}
            to={to}
            {...props}
            >
                {children}
            </Link>
        </div>
    )
}

export default CustomeLink;