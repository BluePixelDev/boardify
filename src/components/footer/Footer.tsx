import "./Footer.css"
import { Box, Typography, Link, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTranslation } from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <Box className="footer__contacts" sx={{ padding: "1rem", display: "flex", justifyContent: "center", gap: 2 }}>
                <IconButton
                    component={Link}
                    href="mailto:kacirek.ondrej@post.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                >
                    <EmailIcon />
                </IconButton>
                <IconButton
                    component={Link}
                    href="https://www.linkedin.com/in/ondřej-kačírek/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                >
                    <LinkedInIcon />
                </IconButton>
                <IconButton
                    component={Link}
                    href="https://github.com/bluepixeldev"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                >
                    <GitHubIcon />
                </IconButton>
            </Box>
            <div className="footer__bottom">
                <Typography variant="body2">
                    © {new Date().getFullYear()} {t("footer.copyright")}
                </Typography>
            </div>
        </footer>
    );
};
