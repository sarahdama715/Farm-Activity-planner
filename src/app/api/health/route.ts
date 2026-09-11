export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'connected',
    apiVersion: '1.0.0',
    uptime: process.uptime(),
  });
}
