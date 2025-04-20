import { Outlet } from 'react-router';
import { Header } from "@components/header";
import { Footer } from '@components/footer';

export const Layout = () => {
    return (
        <>
            <Header />
            <main className="app__container">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}