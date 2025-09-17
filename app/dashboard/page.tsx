'use client';

import React, { useEffect } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function Dashboard() {
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user === null) {
            router.replace('/login');
        }
    }, [user, loading, router]);

    if(loading || !user){
        return null;
    }

    return(
        <div>
            <Header />
            <div>
                Hello {user?.name}
            </div>
        </div>
    );
}