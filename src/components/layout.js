import Navbar from "./navbar";
import { useAuth } from "../context/useAuth";

export default function Layout({ children }) {
    const { user } = useAuth();
    return (
        <div>
            <Navbar userType={user.user_type} />
            <main className="p-4">{children}</main>
        </div>
    );
}