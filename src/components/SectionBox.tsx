import { Paper, Typography } from "@mui/material"

interface SectionBoxProps {
    title: string
    children: React.ReactNode
}

export const SectionBox = ({ title, children }: SectionBoxProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                mt: 4,
                backgroundColor: '#2a2a2e',
                border: '1px solid #444',
                borderRadius: 0,
            }}
        >
            <Typography variant="h4" gutterBottom color="white" fontWeight={600} textAlign={'center'}>
                {title}
            </Typography>

            {children}
        </Paper>
    )
}