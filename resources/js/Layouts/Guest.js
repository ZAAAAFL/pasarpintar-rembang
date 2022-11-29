import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="h-auto flex flex-col sm:justify-center items-center py-0 sm:py-6">
            <div className="w-full sm:max-w-md my-6 px-6 py-4 bg-white shadow-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
