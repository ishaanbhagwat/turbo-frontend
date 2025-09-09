'use client';

import React, { use, useEffect } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function Dashboard() {
    const {user, signOut, isSignedIn} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!user) router.push('/login');
    }, [user]);

    return(
        <div>
            <Header />
            <div>
                Hello {user?.name!}
            </div>
        </div>
    );
}