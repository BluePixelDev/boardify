import { Typography, Box, Link, Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { SectionBox } from '@/components/SectionBox'
import showcaseHero from '@/assets/showcase_hero.png'

export const IntroSection = () => (
    <SectionBox title="Welcome to Boardify!">
        <Typography variant="body1" color="white">
            <strong>Boardify</strong> is your infinite digital board for organizing media — ideal for moodboards,
            research collections, and visual planning. Built with <strong>React</strong> & <strong>Tauri</strong> for speed and flexibility.
        </Typography>

        <Box mt={5} textAlign="center">
            <img
                src={showcaseHero}
                alt="Boardify Showcase"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
            />
        </Box>

        <Box mt={5} textAlign="center">
            <Link
                href="https://github.com/your-org/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
            >
                <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    sx={{
                        color: 'white',
                        borderColor: '#666',
                        '&:hover': {
                            borderColor: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                >
                    View on GitHub
                </Button>
            </Link>
        </Box>
    </SectionBox>
)
