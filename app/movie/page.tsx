import React from 'react';
import { getServerSession } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

const AllMoviePage = async () => {
    const session = await getServerSession();
    if (!session) {
        redirect(`/sign-in?callbackUrl=${encodeURIComponent('/movie')}`);
    }

    return (
        <div>
            movie section
        </div>
    );
};

export default AllMoviePage;
