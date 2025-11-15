import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertLeadSchema,
  insertInteractionSchema,
  insertAchievementSchema,
  insertEventSchema,
  insertNotificationSchema,
  insertIntegrationSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard Stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Current User
  app.get("/api/user/current", async (req, res) => {
    try {
      const user = await storage.getCurrentUser();
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ error: "User not found" });
    }
  });

  // Update user points
  app.patch("/api/user/:id/points", async (req, res) => {
    try {
      const { id } = req.params;
      const { points } = req.body;
      
      if (typeof points !== "number") {
        return res.status(400).json({ error: "Points must be a number" });
      }

      const user = await storage.updateUserPoints(id, points);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  });

  // Leads
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const lead = await storage.getLead(id);
      
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      
      res.json(lead);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const parsed = insertLeadSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const lead = await storage.createLead(parsed.data);
      res.status(201).json(lead);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/leads/:id/score", async (req, res) => {
    try {
      const { id } = req.params;
      const { score } = req.body;
      
      if (typeof score !== "number" || score < 0 || score > 100) {
        return res.status(400).json({ error: "Score must be between 0 and 100" });
      }

      const lead = await storage.updateLeadScore(id, score);
      res.json(lead);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  });

  app.patch("/api/leads/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const validStatuses = ["new", "contacted", "qualified", "converted", "lost"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const lead = await storage.updateLeadStatus(id, status);
      res.json(lead);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  });

  // Interactions
  app.get("/api/interactions", async (req, res) => {
    try {
      const { leadId } = req.query;
      
      if (leadId && typeof leadId === "string") {
        const interactions = await storage.getInteractionsByLead(leadId);
        return res.json(interactions);
      }
      
      const interactions = await storage.getInteractions();
      res.json(interactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/interactions", async (req, res) => {
    try {
      const parsed = insertInteractionSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const interaction = await storage.createInteraction(parsed.data);
      res.status(201).json(interaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Achievements
  app.get("/api/achievements", async (req, res) => {
    try {
      const { userId } = req.query;
      
      if (userId && typeof userId === "string") {
        const achievements = await storage.getUserAchievements(userId);
        return res.json(achievements);
      }
      
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/achievements", async (req, res) => {
    try {
      const parsed = insertAchievementSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const achievement = await storage.createAchievement(parsed.data);
      res.status(201).json(achievement);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Events
  app.get("/api/events", async (req, res) => {
    try {
      const { userId } = req.query;
      
      if (userId && typeof userId === "string") {
        const events = await storage.getUserEvents(userId);
        return res.json(events);
      }
      
      const events = await storage.getEvents();
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const parsed = insertEventSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const event = await storage.createEvent(parsed.data);
      res.status(201).json(event);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Notifications
  app.get("/api/notifications", async (req, res) => {
    try {
      const { userId } = req.query;
      
      if (userId && typeof userId === "string") {
        const notifications = await storage.getUserNotifications(userId);
        return res.json(notifications);
      }
      
      const notifications = await storage.getNotifications();
      res.json(notifications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const parsed = insertNotificationSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const notification = await storage.createNotification(parsed.data);
      res.status(201).json(notification);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markNotificationRead(id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Integrations
  app.get("/api/integrations", async (req, res) => {
    try {
      const { userId } = req.query;
      
      if (userId && typeof userId === "string") {
        const integrations = await storage.getUserIntegrations(userId);
        return res.json(integrations);
      }
      
      const integrations = await storage.getIntegrations();
      res.json(integrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/integrations", async (req, res) => {
    try {
      const parsed = insertIntegrationSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const integration = await storage.createIntegration(parsed.data);
      res.status(201).json(integration);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/integrations/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { isConnected } = req.body;
      
      if (typeof isConnected !== "boolean") {
        return res.status(400).json({ error: "isConnected must be a boolean" });
      }

      const integration = await storage.updateIntegrationStatus(id, isConnected);
      res.json(integration);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
