import { Button } from "components/Button";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import React from "react";

export default function Dashboard() {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <div>
      <div className="">
        <Button onClick={handleLogout} variant="destructive">
          Log out
        </Button>
      </div>
      <h2>Hello guys. I am the dashboard</h2>
    </div>
  );
}
