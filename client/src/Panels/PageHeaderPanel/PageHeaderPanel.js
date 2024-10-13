import React, { useEffect, useState } from "react";
import "./PageHeaderPanel.css";
import EndPoint from "../../Endpoint";
import { useLocation  } from 'react-router-dom';

const PageHeaderPanel = () => {
    const location = useLocation();
    const [headerContent, setHeaderContent] = useState("");

    useEffect(() => {
        switch (location.pathname) {
            case EndPoint.path.Admin:
                setHeaderContent("Admin");
                break;
            case EndPoint.path.CreateThread:
                setHeaderContent("Create new thread");
                break;
            case EndPoint.path.ForumMain:
                setHeaderContent("Forum");
                break;
            case EndPoint.path.Profile:
                setHeaderContent("Your Profile");
                break;
            case EndPoint.path.Grade:
                setHeaderContent("Grades");
                break;
            case EndPoint.path.Category:
                setHeaderContent("Categories");
                break;        
            default:
                setHeaderContent("\u200B");
        }
    }, [location]);
    

    return (
        <React.Fragment>
            <div className="pageheaderpanel">
                {headerContent}
            </div>
        </React.Fragment>
    );
};

export default PageHeaderPanel;
