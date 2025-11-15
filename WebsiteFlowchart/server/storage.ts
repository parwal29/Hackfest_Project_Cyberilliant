import {
  type User,
  type InsertUser,
  type Lead,
  type InsertLead,
  type Interaction,
  type InsertInteraction,
  type Achievement,
  type InsertAchievement,
  type Event,
  type InsertEvent,
  type Notification,
  type InsertNotification,
  type Integration,
  type InsertIntegration,
  type DashboardStats,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCurrentUser(): Promise<User>;
  updateUserPoints(userId: string, points: number): Promise<User>;

  // Leads
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLeadScore(id: string, score: number): Promise<Lead>;
  updateLeadStatus(id: string, status: string): Promise<Lead>;

  // Interactions
  getInteractions(): Promise<Interaction[]>;
  getInteractionsByLead(leadId: string): Promise<Interaction[]>;
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;

  // Achievements
  getAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: string): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;

  // Events
  getEvents(): Promise<Event[]>;
  getUserEvents(userId: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Notifications
  getNotifications(): Promise<Notification[]>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationRead(id: string): Promise<void>;

  // Integrations
  getIntegrations(): Promise<Integration[]>;
  getUserIntegrations(userId: string): Promise<Integration[]>;
  createIntegration(integration: InsertIntegration): Promise<Integration>;
  updateIntegrationStatus(id: string, isConnected: boolean): Promise<Integration>;

  // Dashboard Stats
  getDashboardStats(): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private interactions: Map<string, Interaction>;
  private achievements: Map<string, Achievement>;
  private events: Map<string, Event>;
  private notifications: Map<string, Notification>;
  private integrations: Map<string, Integration>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.interactions = new Map();
    this.achievements = new Map();
    this.events = new Map();
    this.notifications = new Map();
    this.integrations = new Map();
    this.initializeMockData();
  }

  private initializeMockData() {
    const userId = randomUUID();
    const user: User = {
      id: userId,
      username: "suyoshi",
      name: "Suyoshi R.",
      email: "suyoshi@loquoait.com",
      avatar: null,
      role: "user",
      points: 3450,
      level: 5,
      createdAt: new Date(),
    };
    this.users.set(userId, user);

    // Mock leads
    const leadIds = [randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID()];
    const mockLeads: Lead[] = [
      {
        id: leadIds[0],
        name: "John Smith",
        email: "john.smith@techcorp.com",
        phone: "+1 234 567 8901",
        company: "TechCorp Solutions",
        status: "qualified",
        score: 85,
        source: "website",
        assignedTo: userId,
        lastContactedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        notes: "High priority lead",
      },
      {
        id: leadIds[1],
        name: "Sarah Johnson",
        email: "sarah.j@startup.io",
        phone: "+1 234 567 8902",
        company: "Startup Innovations",
        status: "contacted",
        score: 72,
        source: "referral",
        assignedTo: userId,
        lastContactedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        notes: null,
      },
      {
        id: leadIds[2],
        name: "Michael Chen",
        email: "m.chen@enterprise.com",
        phone: "+1 234 567 8903",
        company: "Enterprise Global",
        status: "new",
        score: 65,
        source: "campaign",
        assignedTo: userId,
        lastContactedAt: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        notes: null,
      },
      {
        id: leadIds[3],
        name: "Emma Williams",
        email: "emma.w@designs.co",
        phone: "+1 234 567 8904",
        company: "Creative Designs Co",
        status: "converted",
        score: 92,
        source: "website",
        assignedTo: userId,
        lastContactedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
        notes: "Successfully converted!",
      },
      {
        id: leadIds[4],
        name: "David Brown",
        email: "d.brown@consulting.net",
        phone: "+1 234 567 8905",
        company: "Brown Consulting",
        status: "qualified",
        score: 78,
        source: "referral",
        assignedTo: userId,
        lastContactedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        notes: null,
      },
    ];
    mockLeads.forEach((lead) => this.leads.set(lead.id, lead));

    // Mock achievements
    const achievementIds = [randomUUID(), randomUUID(), randomUUID()];
    const mockAchievements: Achievement[] = [
      {
        id: achievementIds[0],
        userId,
        type: "first_call",
        title: "First Contact",
        description: "Made your first voice call to a lead",
        points: 100,
        icon: "phone",
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      },
      {
        id: achievementIds[1],
        userId,
        type: "leads_qualified",
        title: "Qualified 10 Leads",
        description: "Successfully qualified 10 leads with AI scoring",
        points: 500,
        icon: "trophy",
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      },
      {
        id: achievementIds[2],
        userId,
        type: "streak",
        title: "7-Day Streak",
        description: "Made calls for 7 consecutive days",
        points: 300,
        icon: "zap",
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    ];
    mockAchievements.forEach((achievement) =>
      this.achievements.set(achievement.id, achievement)
    );

    // Mock integrations
    const integrationIds = [randomUUID(), randomUUID()];
    const mockIntegrations: Integration[] = [
      {
        id: integrationIds[0],
        userId,
        name: "Google Calendar",
        isConnected: true,
        config: {},
        lastSyncAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: integrationIds[1],
        userId,
        name: "Google Meet",
        isConnected: true,
        config: {},
        lastSyncAt: new Date(),
        createdAt: new Date(),
      },
    ];
    mockIntegrations.forEach((integration) =>
      this.integrations.set(integration.id, integration)
    );

    // Mock notifications
    const notificationIds = [randomUUID(), randomUUID()];
    const mockNotifications: Notification[] = [
      {
        id: notificationIds[0],
        userId,
        title: "New Achievement Unlocked!",
        message: "You've earned the '7-Day Streak' achievement. Keep up the great work!",
        type: "achievement",
        isRead: false,
        actionUrl: "/progress",
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: notificationIds[1],
        userId,
        title: "Follow-up Reminder",
        message: "Don't forget to follow up with Sarah Johnson today.",
        type: "reminder",
        isRead: false,
        actionUrl: "/contacts",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ];
    mockNotifications.forEach((notification) =>
      this.notifications.set(notification.id, notification)
    );

    // Mock events
    const eventIds = [randomUUID(), randomUUID()];
    const mockEvents: Event[] = [
      {
        id: eventIds[0],
        userId,
        leadId: leadIds[0],
        title: "Demo Call with John Smith",
        description: "Product demonstration for TechCorp Solutions",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 4),
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 5),
        type: "call",
        status: "scheduled",
        createdAt: new Date(),
      },
      {
        id: eventIds[1],
        userId,
        leadId: leadIds[1],
        title: "Follow-up Meeting",
        description: "Discuss proposal with Sarah Johnson",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 30),
        type: "meeting",
        status: "scheduled",
        createdAt: new Date(),
      },
    ];
    mockEvents.forEach((event) => this.events.set(event.id, event));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      role: "user",
      points: 0,
      level: 1,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getCurrentUser(): Promise<User> {
    return Array.from(this.users.values())[0];
  }

  async updateUserPoints(userId: string, points: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    user.points = points;
    user.level = Math.floor(points / 1000) + 1;
    this.users.set(userId, user);
    return user;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = {
      ...insertLead,
      id,
      status: insertLead.status || "new",
      score: insertLead.score || 0,
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async updateLeadScore(id: string, score: number): Promise<Lead> {
    const lead = this.leads.get(id);
    if (!lead) throw new Error("Lead not found");
    lead.score = score;
    this.leads.set(id, lead);
    return lead;
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead> {
    const lead = this.leads.get(id);
    if (!lead) throw new Error("Lead not found");
    lead.status = status;
    this.leads.set(id, lead);
    return lead;
  }

  async getInteractions(): Promise<Interaction[]> {
    return Array.from(this.interactions.values());
  }

  async getInteractionsByLead(leadId: string): Promise<Interaction[]> {
    return Array.from(this.interactions.values()).filter((i) => i.leadId === leadId);
  }

  async createInteraction(insertInteraction: InsertInteraction): Promise<Interaction> {
    const id = randomUUID();
    const interaction: Interaction = {
      ...insertInteraction,
      id,
      createdAt: new Date(),
    };
    this.interactions.set(id, interaction);
    return interaction;
  }

  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter((a) => a.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = randomUUID();
    const achievement: Achievement = {
      ...insertAchievement,
      id,
      unlockedAt: new Date(),
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getUserEvents(userId: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter((e) => e.userId === userId);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = {
      ...insertEvent,
      status: insertEvent.status || "scheduled",
      id,
      createdAt: new Date(),
    };
    this.events.set(id, event);
    return event;
  }

  async getNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter((n) => n.userId === userId);
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      ...insertNotification,
      id,
      isRead: false,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationRead(id: string): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isRead = true;
      this.notifications.set(id, notification);
    }
  }

  async getIntegrations(): Promise<Integration[]> {
    return Array.from(this.integrations.values());
  }

  async getUserIntegrations(userId: string): Promise<Integration[]> {
    return Array.from(this.integrations.values()).filter((i) => i.userId === userId);
  }

  async createIntegration(insertIntegration: InsertIntegration): Promise<Integration> {
    const id = randomUUID();
    const integration: Integration = {
      ...insertIntegration,
      id,
      isConnected: insertIntegration.isConnected || false,
      createdAt: new Date(),
      lastSyncAt: null,
    };
    this.integrations.set(id, integration);
    return integration;
  }

  async updateIntegrationStatus(id: string, isConnected: boolean): Promise<Integration> {
    const integration = this.integrations.get(id);
    if (!integration) throw new Error("Integration not found");
    integration.isConnected = isConnected;
    integration.lastSyncAt = new Date();
    this.integrations.set(id, integration);
    return integration;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const leads = Array.from(this.leads.values());
    const interactions = Array.from(this.interactions.values());
    const integrations = Array.from(this.integrations.values());

    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(
      (l) => l.status === "qualified" || l.status === "converted"
    ).length;
    const averageScore = totalLeads > 0
      ? Math.round(leads.reduce((sum, l) => sum + (l.score || 0), 0) / totalLeads)
      : 0;
    const convertedLeads = leads.filter((l) => l.status === "converted").length;
    const conversionRate = qualifiedLeads > 0
      ? Math.round((convertedLeads / qualifiedLeads) * 100)
      : 0;
    
    const voiceCalls = interactions.filter((i) => i.type === "voice_call");
    const totalCalls = voiceCalls.length;
    const avgCallDuration = totalCalls > 0
      ? Math.round(
          voiceCalls.reduce((sum, i) => sum + (i.duration || 0), 0) / totalCalls / 60
        )
      : 0;

    const activeIntegrations = integrations.filter((i) => i.isConnected).length;

    return {
      totalLeads,
      qualifiedLeads,
      averageScore,
      conversionRate,
      totalCalls,
      avgCallDuration,
      activeIntegrations,
    };
  }
}

export const storage = new MemStorage();
