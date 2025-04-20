import "./Header.css"
import logo from "@assets/logo.png"

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
            </div>
        </header>
    )
}