import { Box } from '@mui/material'
import TimelineItem from './TimelineItem'
import { SectionBox } from '@/components/SectionBox'
import { useTranslation } from 'react-i18next'

interface RoadmapItem {
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming'
}

export const RoadmapSection = () => {
  const { t } = useTranslation()
  const roadmapItems: RoadmapItem[] = t('roadmap.items', { returnObjects: true })

  return (
    <SectionBox title="Roadmap" >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {roadmapItems.map((item, idx) => (
          <TimelineItem
            key={idx}
            title={item.title}
            description={item.description}
            status={item.status as 'completed' | 'in-progress' | 'upcoming'}
          />
        ))}
      </Box>
    </SectionBox >
  )
}
