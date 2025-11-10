/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/api/files/**',
      },
      {
        protocol: 'http',
        hostname: 'pocketbase',
        port: '8090',
        pathname: '/api/files/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'backend-black-resonance-2287.fly.dev',
      //   pathname: '/api/files/**',
      // },
    ],
  },
  output: 'standalone',
};

// Add backend URL from environment variable if present
if (process.env.NEXT_PUBLIC_POCKETBASE_URL) {
  try {
    const backendUrl = new URL(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    const pattern = {
      protocol: backendUrl.protocol.replace(':', ''),
      hostname: backendUrl.hostname,
      pathname: '/api/files/**',
    };
    
    // Add port only if it's not the default port for the protocol
    if (backendUrl.port && 
        !((backendUrl.protocol === 'https:' && backendUrl.port === '443') ||
          (backendUrl.protocol === 'http:' && backendUrl.port === '80'))) {
      pattern.port = backendUrl.port;
    }
    
    // Check if pattern already exists to avoid duplicates
    const exists = nextConfig.images.remotePatterns.some(
      p => p.hostname === pattern.hostname && p.protocol === pattern.protocol
    );
    
    if (!exists) {
      nextConfig.images.remotePatterns.push(pattern);
    }
  } catch (error) {
    console.warn('Failed to parse NEXT_PUBLIC_POCKETBASE_URL:', error);
  }
}

export default nextConfig;

