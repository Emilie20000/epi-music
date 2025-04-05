import React, { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, Route, Routes } from "react-router-dom";
import UserTabs from "../user/UserTabs";
import UserCard from "../Cart/UserCard";
import UserOrdersList from "./UserOrdersList";
import UserAddressBook from "./UserAddressBook";
import AddressForm from "../forms/AddressForm";
import AddressEditForm from "../forms/AddressEditForm";
import { useTheme } from "../../context/ThemeContext";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const textColor = isDark ? "text-slate-200" : "text-black";

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUser(userData);
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cart_price");
        localStorage.removeItem("cart_promo_total");
        localStorage.removeItem("cart_quantity");
        localStorage.removeItem("cart_shipping_costs");
        localStorage.removeItem("orderId");
        navigate("/login");
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className={`text-2xl font-bold mb-6 text-center ${textColor}`}>Profil Utilisateur</h1>
            <UserTabs />
            <Routes>
                <Route
                    path="user-card"
                    element={
                        <>
                            <UserCard user={user} />
                            <button
                                onClick={handleLogout}
                                className="mt-4 p-2 bg-red-500 text-white rounded flex items-center justify-center"
                            >
                                <IoLogOutOutline size={24} className="mr-2" />
                                Se Déconnecter
                            </button>
                        </>
                    }
                />
                <Route path="orders" element={<UserOrdersList />} />
                <Route path="address-book" element={<UserAddressBook />} />
                <Route path="address-book/create" element={<AddressForm />} />
                <Route path="address-book/edit/:id" element={<AddressEditForm />} />
            </Routes>
        </div>
    );
};

export default UserProfile;