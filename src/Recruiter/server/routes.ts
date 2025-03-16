import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { AccessToken } from 'livekit-server-sdk';

// LiveKit token implementation
async function generateLiveKitToken(roomName: string, participantName: string): Promise<string> {
  const apiKey = process.env.LIVEKIT_API_KEY || 'APIeexb2Ao89fqy';
  const apiSecret = process.env.LIVEKIT_API_SECRET || 'Wns9rgiICKwDa9sfO5UhfqvveNKEVb6j6fePP8KbW68F';

  if (!apiKey || !apiSecret) {
    throw new Error('LiveKit API key or secret is missing');
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    name: participantName,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  return token.toJwt();
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/livekit/token', async (req: Request, res: Response) => {
    try {
      const { roomName } = req.query;
      
      if (!roomName || typeof roomName !== 'string') {
        res.status(400).json({ message: 'Missing or invalid roomName parameter' });
        return;
      }
      
      const participantId = `user-${Math.floor(Math.random() * 10000)}`;
      const token = await generateLiveKitToken(roomName, participantId);
      
      res.json({ token });
    } catch (error) {
      console.error('Error generating LiveKit token:', error);
      res.status(500).json({ message: 'Failed to generate token', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}