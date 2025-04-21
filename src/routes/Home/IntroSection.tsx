import { Typography, Box, Link, Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { SectionBox } from '@/components/SectionBox'
import showcaseHero from '@/assets/showcase_hero.png'
import { useTranslation } from 'react-i18next'

export const IntroSection = () => {
    const { t } = useTranslation()

    return (
        <SectionBox title={t('home.title')}>
            <Typography variant="body1" color="white">
                <span dangerouslySetInnerHTML={{ __html: t('home.description') }} />
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
                        {t('home.view_on_github')}
                    </Button>
                </Link>
            </Box>
        </SectionBox>
    )
}
