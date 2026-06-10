import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface HeroBannerProps {
  imageUrl?: string;
  heading?: string;
  subheading?: string;
}

export const HeroBanner = ({
  imageUrl = '/hero-banner.jpg',
  heading = 'Visitor Management Dashboard',
  subheading = 'Monitor visitor activities, approvals, and expected arrivals in real time.',
}: HeroBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 60px)',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? 'fadeIn 0.8s ease-out' : 'none',
      }}
    >
      {/* Background Image with Ken Burns Effect */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transformOrigin: 'center',
          animation: 'kenBurns 12s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />

      {/* Dark Gradient Overlay for Text Readability - Stronger on left side */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.2))',
        }}
      />

      {/* Additional darker overlay for better text contrast */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent, transparent)',
          opacity: 0.6,
        }}
      />

      {/* Content Container - Left Center with responsive spacing */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          pl: { xs: '24px', sm: '32px', md: '60px', lg: '80px' },
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '280px', sm: '400px', md: '700px', lg: '900px' },
            width: '100%',
          }}
        >
          {/* Heading */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.2rem', md: '2.8rem', lg: '3.2rem' },
              fontWeight: 700,
              color: 'white',
              mb: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
              lineHeight: 1.1,
              textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.6)',
              letterSpacing: '-0.02em',
              wordBreak: 'break-word',
            }}
          >
            {heading}
          </Typography>

          {/* Subheading */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.1rem', lg: '1.25rem' },
              color: '#e5e7eb',
              maxWidth: { xs: '280px', sm: '400px', md: '600px', lg: '700px' },
              lineHeight: 1.6,
              textShadow: '0 3px 10px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)',
              wordBreak: 'break-word',
            }}
          >
            {subheading}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;
