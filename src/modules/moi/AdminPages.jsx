import React from "react";
import { useParams } from 'react-router-dom';
import ManageUsers from "./ManageUsers";
import CreateNewUsers from "./CreateNewUser";
import ManagePartners from "./ManagePartners";
import RemilttanceReprt from "./RemilttanceRequest";
const AdminPages = (props) => {
    const params = useParams();
    return (
        <div className="card p-4">
            {
                params.page === "manageUsers" &&
                <ManageUsers />
            }
            {
                params.page === "createNewUser" &&
                <CreateNewUsers />
            }
            {
                params.page === "managePartners" &&
                <ManagePartners />
            }
            {
                params.page === "remilttanceRequest" &&
                <RemilttanceReprt />
            }
        </div>
    );
}

export default AdminPages;