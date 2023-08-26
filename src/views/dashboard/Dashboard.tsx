import { Button } from "components/Button";
import { useRouter } from "next/router";
import React from "react";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <div className="">
        <Button onClick={() => console.log("logout")} variant="destructive">
          Log out
        </Button>
      </div>
      <h2>Hello guys. I am the dashboard</h2>
    </div>
  );
}
