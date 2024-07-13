import { Outlet } from "@remix-run/react";

export default function Index() {
    return (
        <main className="p-3">
            <h1 className="text-2xl text-center font-bold font-sans m-3">
                資格とろうくん
            </h1>
            <Outlet />
        </main>
    );
}