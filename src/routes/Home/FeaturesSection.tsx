import { Typography, Grid, Box, Card, CardContent } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { SectionBox } from '@/components/SectionBox'

const features = [
  {
    title: 'Infinite Canvas',
    description: 'Arrange media and notes freely in a boundless space. Perfect for creative brainstorming and visual workflows.',
    icon: <DashboardIcon sx={{ fontSize: 40, color: 'var(--accent-color)' }} />,
  },
  {
    title: 'Drag & Drop',
    description: 'Quickly upload and organize images, videos, and documents using intuitive drag-and-drop gestures.',
    icon: <TouchAppIcon sx={{ fontSize: 40, color: 'var(--accent-color)' }} />,
  },
  {
    title: 'Plugin-Ready',
    description: 'Designed to be extended — easily integrate new tools or build custom functionality.',
    icon: <RocketLaunchIcon sx={{ fontSize: 40, color: 'var(--accent-color)' }} />,
  },
  {
    title: 'Tauri-Powered',
    description: 'Fast, lightweight, and native-feeling performance through Tauri — ideal for power users.',
  },
  {
    title: 'Custom UI',
    description: 'Built with React and MUI. You can restyle and reshape the interface to match your workflow.',
  },
]

export const FeaturesSection = () => (
  <SectionBox title="Features">
    <Grid container spacing={3} justifyContent="center">
      {features.map((feature, idx) => (
        <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} >
          <Card
            sx={{
              height: '100%',
              backgroundColor: '#1e1e22',
              color: 'white',
              border: '1px solid #555',
              borderRadius: 2,
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between', // Ensures equal height
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Box mb={2}>
                {feature.icon && <Box>{feature.icon}</Box>}
              </Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="lightgray">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </SectionBox>
)
