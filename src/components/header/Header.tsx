import LanguageSwapHeader from "../LanguageSwap"
import "./Header.css"
import logo from "/favicon.png"

export const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__title">
                    <a href="/" className="logo">
                        <img src={logo} alt="Logo" />
                    </a>
                    <h1>Boardify</h1>
                </div>
                <div className="header__language">
                    <LanguageSwapHeader />
                </div>
            </div>
        </header>
    )
}