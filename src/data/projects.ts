import type { Category, Status, Capability, Theme, Quarter } from './categories';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  status: Status;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  tags: string[];
  poweredBy: string[];
  recap2025: string;
  vision2026: string;
  images?: string[];
  featured?: boolean;
  capabilities: Capability[];
  dataFlowsTo: string[];
  buildsOn: string[];
  themes: Theme[];
  techStack: string[];
  quarter: Quarter;
  isRoadmap?: boolean;
  startDate?: string; // Format: YYYY-MM
  endDate?: string;   // Format: YYYY-MM or 'ongoing'
}

export const projects: Project[] = [
  // Commercial Products
  {
    id: 'ralph-tv-broadcaster',
    name: 'Ralph TV Broadcaster',
    tagline: '24/7 Streaming Infrastructure',
    category: 'Commercial Products',
    status: 'Live',
    liveUrl: 'https://broadcaster.ralph.world/?user=brook@ralph.world&pass=admin123!',
    images: ['/screengrabs/Broadcaster1.png', '/screengrabs/Broadcaster2.png', '/screengrabs/Broadcaster3.png', '/screengrabs/Broadcaster4.png'],
    description: 'Cloud-based automated streaming platform with scheduling, multi-platform distribution, asset management, and monitoring dashboard.',
    tags: ['Streaming', 'Automation', 'Cloud', 'PWA'],
    poweredBy: ['Railway', 'FFmpeg', 'HLS', 'YouTube API'],
    recap2025: `Built complete streaming infrastructure from scratch. Features include:
• Automated 24/7 operation without human intervention
• Web-based control panel with live preview and system status
• Asset library with transcoding and categorization
• Weekly scheduling with drag-and-drop interface
• Simultaneous output to YouTube, HLS stream, and custom PWA
• Mobile viewer app with QR code access

Current status: Fully operational, streaming test content. Ready for production programming.`,
    vision2026: `• Launch regular Ralph TV programming (Labs podcast, creator content, live events)
• Add livestream injection via OBS for real-time broadcasts
• Upgrade to 1080p quality
• Implement on-screen graphics, lower thirds, "up next" overlays
• Load testing for scale
• Explore client white-label opportunities`,
    capabilities: ['real-time-streaming', 'cms-systems', 'data-architecture'],
    dataFlowsTo: [],
    buildsOn: [],
    themes: ['entertainment-infrastructure', 'audience-connection'],
    techStack: ['FFmpeg', 'HLS', 'Railway', 'React', 'PostgreSQL'],
    quarter: 'Q4',
    startDate: '2025-10',
    endDate: 'ongoing',
  },
  {
    id: 'ralph-narrativ',
    name: 'Ralph Narrativ',
    tagline: 'AI-Powered Campaign Canvas',
    category: 'Commercial Products',
    status: 'Live',
    liveUrl: 'https://pulseengine-production.up.railway.app/',
    images: ['/screengrabs/Narrativ1.png', '/screengrabs/Narrativ2.png', '/screengrabs/Narrativ3.png'],
    description: 'Transform rough briefs into audience-ready campaigns through AI-orchestrated analysis, live trend integration, and role-specific outputs.',
    tags: ['AI', 'Strategy', 'Content', 'Canvas'],
    poweredBy: ['OpenAI', 'Ralph Knowledge Base', 'Live Trends API'],
    recap2025: `Built end-to-end storytelling platform featuring:
• Brief input with role selection (Strategist, Creative, Creator)
• Live trend signal integration
• Ralph Knowledge Base connection (100+ trend reports)
• Multi-node canvas: Debrief → Opportunities → Narrative Structure → Concept Overview
• Scoring & Enhancements with selectable recommendations
• Wildcard node for contrarian, high-upside ideas with citations
• Project export with sources and prompts

Current status: Functional beta. Knowledge base needs population with Ralph's best work.`,
    vision2026: `• Populate Knowledge Base with winning decks, case studies, key insights
• Roll out to strategy teams across all offices
• Develop client-facing workshop version
• Integrate with Creator Rolodex for talent recommendations
• Explore licensing model for sustained revenue
• Add GWI and Glimpse data integrations when APIs available`,
    capabilities: ['ai-integration', 'trend-intelligence', 'data-architecture'],
    dataFlowsTo: [],
    buildsOn: ['ralph-loves-trends', 'unified-dashboard', 'creator-rolodex'],
    themes: ['brand-storytelling', 'trend-identification', 'data-ownership'],
    techStack: ['OpenAI', 'React', 'Ralph Knowledge Base'],
    quarter: 'Q4',
    startDate: '2025-10',
    endDate: 'ongoing',
  },
  {
    id: 'care-bears-pitch',
    name: 'Care Bears Pitch',
    tagline: 'Forecasting Prototype',
    category: 'Client Work',
    status: 'Sold',
    liveUrl: 'https://carebears.ralph.world/',
    description: 'Rapid prototype demonstrating Ralph\'s data capabilities for Care Bears growth strategy pitch.',
    tags: ['Analytics', 'Forecasting', 'Social', 'Client', 'Pitch'],
    poweredBy: ['GWI Data', 'Social APIs', 'Custom Models'],
    recap2025: `Rapid prototype demonstrating Ralph's data capabilities:
• Integrated 29K+ respondent audience research (Parents, Gifters, Collectors)
• 12 months of Care Bears social performance data
• Competitor benchmarking analysis
• Platform-specific growth multipliers
• AI Strategy Assessment with optimization recommendations
• Interactive controls for scenario modeling

Strong resonance with client and ADD3 partner — positioned as key differentiator.`,
    vision2026: `• Foundation for production dashboard
• Template for future client pitches`,
    capabilities: ['forecasting', 'ai-integration', 'data-architecture'],
    dataFlowsTo: ['care-bears-dashboard'],
    buildsOn: [],
    themes: ['brand-storytelling', 'data-ownership'],
    techStack: ['React', 'GWI', 'OpenAI'],
    quarter: 'Q4',
    startDate: '2025-10',
    endDate: '2025-12',
  },
  {
    id: 'care-bears-dashboard',
    name: 'Care Bears Dashboard',
    tagline: 'Production Forecasting Engine',
    category: 'Client Work',
    status: 'Live',
    isRoadmap: false,
    liveUrl: 'https://cbdash-frontend-production.up.railway.app/',
    images: ['/screengrabs/CareBears1.png', '/screengrabs/CareBears2.png', '/screengrabs/CareBears3.png'],
    description: 'Production-ready forecasting engine with actuals tracking, client login, and improved modeling.',
    tags: ['Analytics', 'Forecasting', 'Social', 'Client', 'Production'],
    poweredBy: ['GWI Data', 'Social APIs', 'Custom Models'],
    recap2025: `Production version built on successful pitch prototype.`,
    vision2026: `Production version upgraded with:
• Actuals tracking
• Improved modeling
• Better AI assessment
• Ralph / client login
• Logging of changes

Future plans:
• Extend model to other client accounts
• Build reusable forecasting framework
• Add real-time data refresh
• Develop as standard pitch tool for social strategy work`,
    capabilities: ['forecasting', 'ai-integration', 'data-architecture'],
    dataFlowsTo: [],
    buildsOn: ['care-bears-pitch'],
    themes: ['brand-storytelling', 'data-ownership'],
    techStack: ['React', 'GWI', 'OpenAI'],
    quarter: 'Q1',
    startDate: '2026-01',
    endDate: 'ongoing',
  },
  {
    id: 'haystack-dashboard',
    name: 'SuperCell HayStack',
    tagline: 'Player Value Intelligence',
    category: 'Client Work',
    status: 'Live',
    liveUrl: 'https://haydaydash-production.up.railway.app/',
    images: ['/screengrabs/HayStack1.png', '/screengrabs/HayStack2.png'],
    description: 'Custom-built campaign intelligence tool for Hay Day 2026 marketing partnership. Model strategic approaches, forecast player value outcomes, and stress-test assumptions before committing budget.',
    tags: ['Gaming', 'Analytics', 'Forecasting', 'Client', 'SuperCell'],
    poweredBy: ['Custom Models', 'Analytics Engine'],
    recap2025: `HayStack is a custom-built campaign intelligence tool designed specifically for Hay Day's 2026 marketing partnership:

• Model different strategic approaches and forecast player value outcomes
• Stress-test assumptions before committing budget
• Turn campaign planning from educated guesswork into scenario-driven decision making
• Distinguish between new player acquisition and lapsed player reactivation
• Apply different cost assumptions, retention curves, and lifetime value calculations

Strategic focus areas:
• Welcome Back to the Farm - re-engage lapsed players
• Balanced Harvest - grow community while celebrating existing players
• New Neighbors - introduce Hay Day to new players
• Digital-First Content - year-long creator partnerships

In pitch phase, demonstrates analytical rigor and strategic thinking — showing creative recommendations are grounded in modeled outcomes, not just instinct.`,
    vision2026: `• Track campaign actuals vs projections through 2026
• Refine player value models with real data
• Template for other gaming client pitches
• Expand to other SuperCell properties`,
    capabilities: ['forecasting', 'data-architecture'],
    dataFlowsTo: [],
    buildsOn: ['care-bears-dashboard'],
    themes: ['data-ownership', 'audience-connection'],
    techStack: ['React', 'Analytics'],
    quarter: 'Q1',
    startDate: '2026-01',
    endDate: 'ongoing',
  },

  // Intelligence Infrastructure
  {
    id: 'creator-rolodex',
    name: 'Creator Rolodex',
    tagline: 'Creator Relationship Management',
    category: 'Intelligence',
    status: 'Testing',
    liveUrl: 'https://ralphodex.up.railway.app/',
    images: ['/screengrabs/Rolodex1.png', '/screengrabs/Rolodex2.png'],
    description: 'Centralized database for creator relationships with AI-powered insights, recommendations, and collaboration scoring.',
    tags: ['CRM', 'Creators', 'AI', 'Database'],
    poweredBy: ['PostgreSQL', 'OpenAI', 'Social APIs'],
    recap2025: `Built complete creator management system:
• Dashboard with stats, recent activity, top performers
• Creator profiles with metrics, tags, notes, contact info
• Search and filter by content type, engagement, audience size
• AI Insights & Recommendations per creator
• Collaboration scoring and brand matching
• Quick add flow for new creators

Currently in testing with Dany. Features in development:
• Auto-pull last 3 posts per creator (needs social media keys)
• META CREATORS filter for campaign criteria matching`,
    vision2026: `• Company-wide rollout as single source of truth for creator relationships
• Export to CSV / Google Sheets integration
• Deeper social media API integration for live metrics
• Connect to Unified Dashboard for trend matching
• Build out agency/management contact layer`,
    capabilities: ['creator-data', 'ai-integration', 'data-architecture'],
    dataFlowsTo: ['unified-dashboard', 'ralph-narrativ'],
    buildsOn: [],
    themes: ['creator-relationships', 'data-ownership'],
    techStack: ['PostgreSQL', 'OpenAI', 'React'],
    quarter: 'Q2',
    startDate: '2025-04',
    endDate: '2025-09',
  },
  {
    id: 'ralph-loves-trends',
    name: 'Ralph Loves Trends',
    tagline: 'Trend Intelligence Platform',
    category: 'Intelligence',
    status: 'Live',
    liveUrl: 'https://ralphlovestrends-production.up.railway.app/',
    images: ['/screengrabs/RalphLovesTrends1.png', '/screengrabs/RalphLovesTrends2.png', '/screengrabs/RalphLovesTrends3.png'],
    description: 'Custom web-scraping tool gathering trend intelligence across Instagram, Pinterest, and X with AI-driven analysis and recommendations.',
    tags: ['Trends', 'Scraping', 'AI', 'Social'],
    poweredBy: ['Apify', 'OpenAI', 'PostgreSQL'],
    recap2025: `Built real-time trend monitoring system:
• Scrapes trending hashtags across IG, Pinterest, X
• AI Intelligence Briefing with executive overview
• Trend confidence scoring
• Sentiment analysis and categorization
• Platform distribution visualization
• Strategic insights generation

Provides foundation data layer for trend-driven decision making.`,
    vision2026: `• Weekly automated briefings to strategy teams
• Historical trend tracking and pattern analysis
• Integration with Ralph Narrativ
• Expand platform coverage (TikTok, Reddit, YouTube)
• Alert system for emerging trends matching client profiles`,
    capabilities: ['trend-intelligence', 'web-scraping', 'ai-integration'],
    dataFlowsTo: ['unified-dashboard', 'ralph-narrativ', 'amazon-trendspotter'],
    buildsOn: [],
    themes: ['trend-identification', 'data-ownership'],
    techStack: ['Apify', 'PostgreSQL', 'OpenAI', 'React'],
    quarter: 'Q2',
    startDate: '2025-04',
    endDate: '2025-09',
  },
  {
    id: 'unified-dashboard',
    name: 'Unified Dashboard',
    tagline: 'Crossover Intelligence',
    category: 'Intelligence',
    status: 'Live',
    liveUrl: 'https://trendcreatordashboard-production.up.railway.app/',
    images: ['/screengrabs/Unified Dash1.png', '/screengrabs/UnifiedDash2.png'],
    description: 'Combines trend analysis with creator data, providing AI-powered crossover insights that match emerging opportunities with talent.',
    tags: ['Intelligence', 'Crossover', 'AI', 'Strategy'],
    poweredBy: ['Trends API', 'Creator Rolodex', 'OpenAI'],
    recap2025: `Built the "smart layer" connecting our data systems:
• Unified view of trending hashtags and creator database
• AI Crossover Insights panel linking trends to creators
• Creator recommendations with match percentages
• Trending opportunities for each creator profile
• Real-time analysis of alignment between relationships and opportunities

This is where our proprietary data becomes actionable intelligence.`,
    vision2026: `• Integrate into daily workflow for strategy and talent teams
• Add campaign brief generator from crossover insights
• Historical performance tracking (which matches converted)
• Expand to include brand partnership opportunities`,
    capabilities: ['trend-intelligence', 'creator-data', 'ai-integration'],
    dataFlowsTo: ['amazon-trendspotter', 'ralph-narrativ'],
    buildsOn: ['ralph-loves-trends', 'creator-rolodex'],
    themes: ['trend-identification', 'creator-relationships', 'data-ownership'],
    techStack: ['React', 'OpenAI'],
    quarter: 'Q3',
    startDate: '2025-07',
    endDate: '2025-09',
  },
  {
    id: 'amazon-trendspotter',
    name: 'In Our Prime Trendspotter',
    tagline: 'California-India Crossover Discovery',
    category: 'Intelligence',
    status: 'Pitch Tool',
    liveUrl: 'https://ralphlovestrends-production.up.railway.app/prime-india',
    images: ['/screengrabs/InOurPrime1.png', '/screengrabs/InOurPrime2.png'],
    description: 'Specialized trend discovery for India-California cultural crossover, with creator finder, hashtag research, and auto-brief generation.',
    tags: ['Trends', 'India', 'Creators', 'Pitch'],
    poweredBy: ['Apify', 'SerpAPI', 'OpenAI'],
    recap2025: `Built for Amazon Prime Video India pitch:
• 24h/7d/30d scraping across Instagram and TikTok
• Crossover scoring (0-1) for Cali-India relevance
• Creator Finder with platform filtering and follower thresholds
• "Discover from Trending Posts" auto-creator discovery
• Related Hashtags explorer
• Auto-generated AI Crossover Brief with hashtag rationale and action plan
• Export to CSV for client delivery

Demonstrates how quickly we can spin up market-specific intelligence tools.`,
    vision2026: `• Template for other market-crossover projects
• Deeper creator vetting and verification
• Integration with main Creator Rolodex`,
    capabilities: ['trend-intelligence', 'web-scraping', 'ai-integration'],
    dataFlowsTo: [],
    buildsOn: ['ralph-loves-trends', 'unified-dashboard', 'creator-rolodex'],
    themes: ['trend-identification', 'creator-relationships'],
    techStack: ['Apify', 'SerpAPI', 'OpenAI', 'React'],
    quarter: 'Q3',
    startDate: '2025-07',
    endDate: '2025-09',
  },

  // Internal Infrastructure
  {
    id: 'retro-intranet',
    name: 'Ralph Intranet',
    tagline: 'Company Hub',
    category: 'Infrastructure',
    status: 'Testing',
    liveUrl: 'https://ralphodex.up.railway.app/',
    images: ['/screengrabs/Intranet1.png', '/screengrabs/Intranet2.png', '/screengrabs/Intranet3.png', '/screengrabs/Intranet4.png', '/screengrabs/Intranet5.png'],
    description: 'Full-featured company intranet with CMS, multi-window interface, RalphBot AI assistant, business pipeline tracking, and global office features.',
    tags: ['Intranet', 'CMS', 'AI', 'Internal'],
    poweredBy: ['React', 'PostgreSQL', 'OpenAI'],
    recap2025: `Built complete internal platform:
• Windows 95-inspired multi-window interface
• Full CMS admin with multi-user authoring
• Modules: New Biz Pipeline, Resources, Quick Links, News Network, Innovation, Pitch Please, Suggestions, Announcements
• Trendspotting window with office-specific trends and music
• RalphBot trained on company info
• RalphWave audio player
• Dynamic "What's New" aggregation

Current status: In testing with leadership. Needs mobile polish and Tokyo-specific features.`,
    vision2026: `• Complete mobile-responsive version
• Add user authentication
• Populate all content modules
• Tokyo office customization
• Company-wide rollout
• Integrate with other Ralph tools (Rolodex, Trends, etc.)`,
    capabilities: ['cms-systems', 'ai-integration', 'data-architecture'],
    dataFlowsTo: [],
    buildsOn: ['ralph-loves-trends'],
    themes: ['internal-efficiency'],
    techStack: ['React', 'PostgreSQL', 'OpenAI'],
    quarter: 'Q2',
    startDate: '2025-04',
    endDate: '2025-09',
  },
  {
    id: 'visual-canvas',
    name: 'Visual Canvas',
    tagline: 'Dynamic WebGL Backgrounds',
    category: 'Infrastructure',
    status: 'Live',
    liveUrl: 'https://ralph-visual-canvas-production.up.railway.app/?preset=6888cf1e4eed6102720d2aab',
    images: ['/screengrabs/VisualCanvas1.png', '/screengrabs/VisualCanvas2.mov'],
    description: 'WebGL-powered dynamic visual system with 100+ controllable variables, cloud-saved presets, and AI-enhancement roadmap.',
    tags: ['WebGL', 'Visual', 'Generative', 'Brand'],
    poweredBy: ['Three.js', 'WebGL', 'Cloud Presets'],
    recap2025: `Built generative visual system for Ralph.World:
• Real-time WebGL canvas with particle systems, shapes, effects
• 100+ adjustable parameters (colors, speeds, densities, behaviors)
• Preset system with cloud storage
• Multiple element types: Spheres, Cubes, Toruses, Organic Blobs, Fireflies
• Metamorphosis and transition effects
• Optimized for site background use

Currently powering Ralph.World homepage.`,
    vision2026: `• AI-driven dynamic visuals based on time, weather, content
• Themed presets for different Ralph properties
• Client white-label capability
• Performance optimization for mobile`,
    capabilities: ['interactive-visuals'],
    dataFlowsTo: [],
    buildsOn: [],
    themes: ['entertainment-infrastructure'],
    techStack: ['Three.js', 'WebGL', 'React'],
    quarter: 'Q2',
    startDate: '2025-04',
    endDate: '2025-09',
  },
  {
    id: 'ralphbot-slack',
    name: 'RalphBot',
    tagline: 'AI Company Assistant',
    category: 'Infrastructure',
    status: 'Live',
    description: 'Slack-integrated AI assistant trained on Ralph company information, able to answer questions and direct users to resources.',
    tags: ['AI', 'Slack', 'Internal', 'Assistant'],
    poweredBy: ['Slack API', 'OpenAI', 'Company Knowledge Base'],
    recap2025: `Deployed AI assistant in company Slack:
• Trained on company information, processes, contacts
• Natural language Q&A
• Resource direction and link provision
• Available to all team members`,
    vision2026: `• Expand knowledge base with project documentation
• Add action capabilities (create tasks, schedule meetings)
• Integration with other Ralph tools
• Proactive notifications and reminders`,
    capabilities: ['ai-integration'],
    dataFlowsTo: ['retro-intranet'],
    buildsOn: [],
    themes: ['internal-efficiency'],
    techStack: ['Slack API', 'OpenAI'],
    quarter: 'Q1',
    startDate: '2025-01',
    endDate: '2025-03',
  },

  // Client Work & Pitch Tools
  {
    id: 'netflix-aerials',
    name: 'Netflix Interactive Aerials',
    tagline: 'CMS-Driven Interactive Maps',
    category: 'Client Work',
    status: 'Sold',
    liveUrl: 'https://houseaerial-production.up.railway.app/experience/682ea5ae737dea2ac1ce3b5f',
    images: ['/screengrabs/Aerials1.mp4', '/screengrabs/Aerials2.png'],
    description: 'Interactive aerial view maps for Netflix House locations, with CMS-driven content, zoom/pan navigation, and hotspot information.',
    tags: ['Interactive', 'Netflix', 'CMS', 'Events'],
    poweredBy: ['React', 'CMS', 'SVG/Canvas'],
    recap2025: `Major client win:
• Full prototype built to validate concept
• All assets dynamically driven from CMS
• Interactive hotspots with location information
• Smooth zoom and pan navigation
• Multi-location support (Philadelphia, Dallas)

SOLD TO NETFLIX. Used at live events on iPad Pro.
Currently being integrated into netflixhouse.com website.
Validates the rapid prototyping → client sale model.`,
    vision2026: `• Monitor Netflix House integration
• Template for similar interactive experiences
• Case study for pitch deck`,
    capabilities: ['interactive-visuals', 'cms-systems'],
    dataFlowsTo: [],
    buildsOn: [],
    themes: ['audience-connection'],
    techStack: ['React', 'CMS', 'SVG'],
    quarter: 'Q2',
    startDate: '2025-04',
    endDate: '2025-06',
  },
  {
    id: 'recaptionator',
    name: 'ReCaptionator',
    tagline: 'AI Brand Voice Captions',
    category: 'Client Work',
    status: 'Live',
    liveUrl: 'http://ralphrecaptionator-production.up.railway.app/',
    images: ['/screengrabs/ReCaptionator.png'],
    description: 'AI-powered caption rewriting tool trained on brand voice, with English/Japanese support. Built for Ralph Tokyo.',
    tags: ['AI', 'Captions', 'Tokyo', 'Brand Voice'],
    poweredBy: ['OpenAI', 'Brand Training Data'],
    recap2025: `Built for Ralph Tokyo / Korean Air Japan:
• Trained on 100+ brand posts for voice consistency
• Content type selection (Promotion, Engagement, etc.)
• Original caption input with context field
• AI-rewritten caption with explanation
• Style analysis showing how voice was matched
• Full English/Japanese language toggle
• Admin panel for prompt management`,
    vision2026: `• Expand to other client brands
• Build brand voice training workflow
• Integration with content calendar tools`,
    capabilities: ['ai-integration'],
    dataFlowsTo: [],
    buildsOn: [],
    themes: ['brand-storytelling'],
    techStack: ['OpenAI', 'React'],
    quarter: 'Q1',
    startDate: '2025-01',
    endDate: '2025-03',
  },
  {
    id: 'bandlab-synth',
    name: 'BD-1 Wavelength',
    tagline: 'Collaborative Visual Synthesizer',
    category: 'Client Work',
    status: 'Pitch Tool',
    liveUrl: 'https://bd1.up.railway.app/',
    images: ['/screengrabs/BD-1_1.png', '/screengrabs/BD-1_2.png', '/screengrabs/BD-1_3.png'],
    description: 'Multi-user collaborative synthesizer with webcam-based control, real-time audio generation, and visual feedback.',
    tags: ['Audio', 'Collaboration', 'WebSockets', 'Creative'],
    poweredBy: ['Web Audio API', 'WebSockets', 'WebRTC'],
    recap2025: `Concepted and built for BandLab pitch:
• Solo and Collaborative Jam modes
• Visual synth presets (Warm Analog, Crystal Lead, Sub Bass, Square Punch)
• Camera-based frequency and filter control
• Pad controller with keyboard shortcuts
• Real-time multi-user sessions via WebSockets
• Recording capability

Still in development but functional demo.`,
    vision2026: `• Complete multi-user synchronization
• Mobile optimization
• Additional synth presets and effects
• Potential standalone product`,
    capabilities: ['interactive-visuals', 'real-time-streaming'],
    dataFlowsTo: [],
    buildsOn: [],
    themes: ['audience-connection'],
    techStack: ['Web Audio API', 'WebSockets', 'React'],
    quarter: 'Q3',
    startDate: '2025-07',
    endDate: '2025-09',
  },
  {
    id: 'client-survey',
    name: 'Client Survey',
    tagline: 'Feedback Collection Tool',
    category: 'Client Work',
    status: 'Live',
    liveUrl: 'survey.ralph.world',
    images: ['/screengrabs/Survey1.png', '/screengrabs/Survey2.png'],
    description: 'Customizable client feedback survey with Google Sheets integration, mobile-friendly design, and reusable template.',
    tags: ['Survey', 'Feedback', 'Clients', 'Forms'],
    poweredBy: ['React', 'Google Sheets API'],
    recap2025: `Built reusable survey infrastructure:
• Clean, branded survey interface
• Multiple question types
• Responses saved directly to Google Sheet
• Mobile-friendly responsive design
• Easy to duplicate for future surveys

Lives at survey.ralph.world.`,
    vision2026: `• Template library for different survey types
• Analytics dashboard for responses
• Integration with CRM/pipeline tools`,
    capabilities: ['data-architecture'],
    dataFlowsTo: [],
    buildsOn: [],
    themes: ['internal-efficiency'],
    techStack: ['React', 'Google Sheets API'],
    quarter: 'Q1',
    startDate: '2025-01',
    endDate: '2025-03',
  },
  {
    id: 'mag-chat',
    name: 'Mag Chat',
    tagline: 'RAG-Powered Magazine Explorer',
    category: 'Infrastructure',
    status: 'Live',
    liveUrl: 'http://ralphmagchatbot-production.up.railway.app/',
    images: ['/screengrabs/RalphMag1.png', '/screengrabs/RalphMag2.png'],
    description: 'Internal natural language interface for exploring Ralph Magazine content using RAG (Retrieval Augmented Generation) on vectorized PDF data. Public-facing potential.',
    tags: ['RAG', 'AI', 'Content', 'Search', 'Internal'],
    poweredBy: ['OpenAI', 'Vector DB', 'PDF Processing'],
    recap2025: `Built AI-powered content discovery for internal use:
• PDF vectorization and chunking
• Natural language search across magazine issues
• Cited sources with page references
• Related content suggestions
• Chat history persistence
• Magazine issue preview thumbnails

Demonstrates RAG capability for content archives with public-facing potential.`,
    vision2026: `• Expand to other Ralph content archives
• Improve citation accuracy
• Add image/visual search
• Template for client content libraries
• Potential public-facing product`,
    capabilities: ['ai-integration', 'data-architecture'],
    dataFlowsTo: ['ralph-narrativ'],
    buildsOn: [],
    themes: ['data-ownership', 'internal-efficiency'],
    techStack: ['OpenAI', 'Vector DB', 'React'],
    quarter: 'Q3',
    startDate: '2025-07',
    endDate: '2025-09',
  },
  {
    id: 'squawk-fm',
    name: 'Squawk FM',
    tagline: 'Netflix Audio Experience',
    category: 'Client Work',
    status: 'Prototype',
    liveUrl: 'https://squawk-production.up.railway.app/desktop/',
    description: 'Audio experience prototype for Netflix activation.',
    tags: ['Audio', 'Netflix', 'Experience'],
    poweredBy: ['Web Audio API'],
    recap2025: `Prototype audio experience for Netflix.
Details in project files.`,
    vision2026: `• Evaluate for future Netflix activations`,
    capabilities: ['interactive-visuals'],
    dataFlowsTo: [],
    buildsOn: [],
    themes: ['audience-connection'],
    techStack: ['Web Audio API', 'React'],
    quarter: 'Q2',
    startDate: '2025-04',
    endDate: '2025-06',
  },
  {
    id: 'bereal-ar',
    name: 'BeReal AR Test',
    tagline: 'AR Prototype',
    category: 'Client Work',
    status: 'Prototype',
    liveUrl: '#',
    description: 'Augmented reality prototype exploration.',
    tags: ['AR', 'Prototype', 'Mobile'],
    poweredBy: ['AR.js', 'WebXR'],
    recap2025: `AR capability exploration prototype.
Testing web-based AR for potential client applications.`,
    vision2026: `• Evaluate AR opportunities for client work
• Build out capability for event activations`,
    capabilities: ['interactive-visuals'],
    dataFlowsTo: [],
    buildsOn: [],
    themes: ['audience-connection'],
    techStack: ['AR.js', 'WebXR'],
    quarter: 'Q3',
    startDate: '2025-07',
    endDate: '2025-09',
  },

  // 2026 Roadmap - Experimental
  {
    id: 'circles',
    name: 'Circles',
    tagline: 'Social Availability for Families',
    category: '2026 Roadmap',
    status: 'Prototyping',
    isRoadmap: true,
    liveUrl: 'https://circles-proto.up.railway.app/',
    images: ['/screengrabs/Circles1.png', '/screengrabs/Circles2.png', '/screengrabs/Circles3.png', '/screengrabs/Circles4.png', '/screengrabs/Circles5.png'],
    description: 'A social availability app for families and friend groups. Share status, see what friends are up to, and organize local hangouts — all without the friction of group text chains.',
    tags: ['Consumer App', 'Social', 'Mobile', 'Spin-off'],
    poweredBy: ['React', 'Railway'],
    recap2025: `Personal project that became a convergence point for multiple innovation threads:

**V1 Prototype (Complete):**
- Core UI with floaty, minimalist aesthetic
- Household and friends data model
- Three-state availability system (Available, Open to plans, Busy)
- Friends status feed — the "what's everyone up to" view
- Local activity suggestions (Hudson Valley focused)
- Hangout creation and invitation flow
- localStorage persistence for testing

**V2 (Current Focus) — Refined UI/UX:**
- Extensively refined interface and interaction design
- Polished visual system with soft, modern aesthetic
- Streamlined user flows for status sharing and hangout creation
- Mobile-first responsive design
- Focus on feel and usability over technical complexity`,
    vision2026: `**Product Development:**
- Complete V2 with polished UI/UX
- Real backend with authentication and real-time sync
- Push notifications and calendar integration
- Weather-aware activity recommendations
- Beta test with actual friend groups in Hudson Valley

**Strategic Opportunity:**
- PR-able consumer product showcasing innovation capability
- Potential spin-off or investment opportunity
- Case study for "Ralph builds products" narrative
- Demonstrates full-stack consumer app development

**Ralph Relevance:**
- Template for community/fandom connection tools
- Applies "Circles" thinking to brand audiences and creator communities
- Tests consumer app distribution and growth strategies`,
    capabilities: ['consumer-ux', 'data-architecture'],
    dataFlowsTo: [],
    buildsOn: ['creator-rolodex'],
    themes: ['audience-connection', 'data-ownership'],
    techStack: ['React', 'Railway'],
    quarter: 'Q1',
    startDate: '2026-01',
    endDate: 'ongoing',
  },

  // 2026 Roadmap Projects
  {
    id: 'ralph-voices',
    name: 'Ralph Voices',
    tagline: 'Synthetic Audience Intelligence',
    category: '2026 Roadmap',
    status: 'Prototyping',
    description: 'AI-powered synthetic personas calibrated to specific audiences. Stress-test creative concepts before they reach real people.',
    tags: ['AI', 'Research', 'Personas', 'Testing'],
    poweredBy: ['OpenAI', 'GWI Data', 'Custom Models'],
    recap2025: `**The Problem:**
We make gut-feel decisions about what will resonate. Focus groups are slow and expensive.

**The Solution:**
Build 50-100 AI personas calibrated to specific audience segments — built around the brand, the brief, and real audience data.`,
    vision2026: `**How It Works:**
- Personas built from GWI data, social listening, brand knowledge
- Each has demographics, psychographics, media habits, values
- Feed them creative concepts, messaging, content
- They respond with what resonates, concerns, and opportunities

**Use Cases:**
- Concept testing before pitch
- Asset review and optimization
- A/B testing without real audience exposure

**Dependencies:** GWI API access, persona modeling framework, validation testing
**Target:** Q2 2026`,
    capabilities: ['ai-integration', 'data-architecture'],
    dataFlowsTo: [],
    buildsOn: ['ralph-narrativ', 'care-bears-dashboard', 'creator-rolodex'],
    themes: ['audience-connection', 'data-ownership', 'brand-storytelling'],
    techStack: ['OpenAI', 'GWI', 'React'],
    quarter: 'Q1',
    isRoadmap: true,
    startDate: '2026-01',
    endDate: 'ongoing',
  },
];

// Potential future projects - not yet on timeline
export const potentialProjects = [
  {
    id: 'ralphs-lab',
    name: "Ralph's Lab",
    tagline: 'Innovation Practice Framework',
    description: 'Formalize the innovation practice into a branded offering. Tools + Toys framework.',
    status: 'Concept',
  },
  {
    id: 'gwi-integration',
    name: 'GWI Integration Layer',
    tagline: 'Audience Data API Access',
    description: 'Direct API access to GWI survey data for real-time audience intelligence.',
    status: 'In Negotiation',
  },
  {
    id: 'ralph-radio',
    name: 'Ralph Radio',
    tagline: 'Audio Streaming Channel',
    description: 'Companion audio channel to Ralph TV. Curated music, podcasts, and audio content.',
    status: 'Concept',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export const getProjectsByCategory = (category: Category): Project[] => {
  return projects.filter((p) => p.category === category);
};

export const getFeaturedProject = (): Project | undefined => {
  return projects.find((p) => p.featured);
};

export const getStats = () => {
  const liveProjects = projects.filter(
    (p) => p.status === 'Live' || p.status === 'Sold'
  ).length;

  const allCapabilities = new Set(projects.flatMap((p) => p.capabilities));
  const aiProjects = projects.filter((p) =>
    p.capabilities.includes('ai-integration')
  ).length;

  const allTechStack = new Set(projects.flatMap((p) => p.techStack));

  return {
    totalProjects: projects.length,
    liveProjects,
    capabilitiesDeveloped: allCapabilities.size,
    projectsWithAI: aiProjects,
    themesCovered: new Set(projects.flatMap((p) => p.themes)).size,
    techStackSize: allTechStack.size,
  };
};
