import React from "react";
import { Link, useLocation } from "react-router-dom";

const UserTabs = () => {
    const location = useLocation();
    const tabs = [
        { name: "Mes Informations", path: "/profile/user-card" },
        { name: "Mes Commandes", path: "/profile/orders" },
        { name: "Carnet d'Adresses", path: "/profile/address-book" },
    ];

    return (
        <div className="flex space-x-4 mb-4" role="tablist" aria-label="Navigation par onglets du profil utilisateur">
            {tabs.map((tab) => {
                const isSelected = location.pathname === tab.path;
                return (
                    <Link
                        key={tab.name}
                        to={tab.path}
                        role="tab"
                        aria-selected={isSelected ? "true" : "false"}
                        className={`p-2 ${isSelected ? "bg-gray-200" : "bg-gray-100"} rounded`}
                    >
                        {tab.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default UserTabs;
