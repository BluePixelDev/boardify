import { Typography, Box, Card, CardContent, Tooltip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface TimelineItemProps {
    title: string
    description: string
    status: 'completed' | 'in-progress' | 'upcoming'
}

const TimelineItem = ({ title, description, status }: TimelineItemProps) => {
    const getIcon = () => {
        switch (status) {
            case 'completed':
                return <CheckCircleIcon sx={{ color: 'var(--accent-color)', fontSize: 30 }} />
            case 'in-progress':
                return <HourglassEmptyIcon sx={{ color: 'var(--accent-color)', fontSize: 30 }} />
            case 'upcoming':
                return <FiberManualRecordIcon sx={{ color: 'var(--accent-color)', fontSize: 30 }} />
            default:
                return null
        }
    }

    return (
        <Box sx={{ width: '100%', mb: 3, position: 'relative' }}>
            {/* Timeline Line */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '100%',
                    width: 2,
                    backgroundColor: '#555',
                    zIndex: -1,
                }}
            />
            {/* Timeline Item */}
            <Card
                sx={{
                    backgroundColor: '#1e1e22',
                    color: 'white',
                    border: '1px solid #555',
                    borderRadius: 2,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                    mx: 'auto',
                    position: 'relative',
                }}
            >
                <CardContent>
                    {/* Tooltip for status */}
                    <Tooltip title={status === 'completed' ? "Completed" : status === 'in-progress' ? "In Progress" : "Upcoming"}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                backgroundColor: '#1e1e22',
                                borderRadius: '50%',
                                padding: 1,
                                zIndex: 1,
                            }}
                        >
                            {getIcon()}
                        </Box>
                    </Tooltip>

                    {/* Title */}
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="lightgray">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default TimelineItem
