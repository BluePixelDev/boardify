import './Home.css'
import Container from '@mui/material/Container';
import { IntroSection } from './IntroSection';
import { FeaturesSection } from './FeaturesSection';
import { RoadmapSection } from './RoadmapSection';

function Home() {
  return (
    <>
      <Container>
        <IntroSection />
        <FeaturesSection />
        <RoadmapSection />
      </Container>
    </>
  )
}

export default Home
