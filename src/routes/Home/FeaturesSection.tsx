import { Typography, Grid, Box, Card, CardContent } from '@mui/material'
import { SectionBox } from '@/components/SectionBox'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { FeatureItem } from '@/i18n'

export const FeaturesSection = () => {
  const { t } = useTranslation()
  const features: FeatureItem[] = t('home.features.items', { returnObjects: true })

  return (
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
                  {feature.icon && (
                    <Icon
                      icon={feature.icon}
                      style={{ fontSize: '40px', color: 'var(--accent-color)' }}
                    />
                  )}
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
}