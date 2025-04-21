import { Box } from '@mui/material'
import TimelineItem from './TimelineItem'
import { SectionBox } from '@/components/SectionBox'

const roadmapItems = [
  {
    title: 'Support for additional file types',
    description: 'Add support for PDF, audio, and docs.',
    status: 'in-progress',
  },
  {
    title: 'Media search and tagging system',
    description: 'Implement search and tagging for media files.',
    status: 'upcoming',
  },
  {
    title: 'Plugin API for custom extensions',
    description: 'Enable third-party plugins to extend functionality.',
    status: 'completed',
  },
  {
    title: 'Markdown note support for contextual boards',
    description: 'Support for markdown syntax in notes.',
    status: 'upcoming',
  },
]

export const RoadmapSection = () => (
  <SectionBox title="Roadmap">
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
  </SectionBox>
)
