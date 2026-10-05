import {
  Destination,
  Place,
  PartnerApplication,
  PartnerContentSubmission,
  Article,
  ModeratedReview,
  CustomerLead,
  CustomerUser,
  KnowledgeSource,
  KnowledgeDocument,
  AuditLogEvent,
  PublicationStatus,
  PartnerAppStatus,
  LeadStatus,
  ReviewModerationStatus,
} from "@/types";

import {
  INITIAL_DESTINATIONS,
  INITIAL_PLACES,
  INITIAL_PARTNER_APPLICATIONS,
  INITIAL_PARTNER_SUBMISSIONS,
  INITIAL_ARTICLES,
  INITIAL_MODERATED_REVIEWS,
  INITIAL_LEADS,
  INITIAL_KNOWLEDGE_SOURCES,
  INITIAL_KNOWLEDGE_DOCUMENTS,
  INITIAL_AUDIT_EVENTS,
} from "./mock-sync-store";

// Global persistent state container
class AdminDataStore {
  private destinations: Destination[] = [...INITIAL_DESTINATIONS];
  private places: Place[] = [...INITIAL_PLACES];
  private partnerApplications: PartnerApplication[] = [...INITIAL_PARTNER_APPLICATIONS];
  private partnerSubmissions: PartnerContentSubmission[] = [...INITIAL_PARTNER_SUBMISSIONS];
  private articles: Article[] = [...INITIAL_ARTICLES];
  private reviews: ModeratedReview[] = [...INITIAL_MODERATED_REVIEWS];
  private leads: CustomerLead[] = [...INITIAL_LEADS];
  private knowledgeSources: KnowledgeSource[] = [...INITIAL_KNOWLEDGE_SOURCES];
  private knowledgeDocuments: KnowledgeDocument[] = [...INITIAL_KNOWLEDGE_DOCUMENTS];
  private auditEvents: AuditLogEvent[] = [...INITIAL_AUDIT_EVENTS];

  // Helper to record an audit log event
  public recordAudit(actor: string, role: string, action: string, entityType: any, entityId: string, entityName: string, metadata: Record<string, any> = {}) {
    const event: AuditLogEvent = {
      id: `aud-${Date.now()}`,
      actor,
      actorRole: role,
      action,
      entityType,
      entityId,
      entityName,
      timestamp: new Date().toLocaleString("vi-VN"),
      ipAddress: "127.0.0.1 (Internal Admin)",
      metadata,
    };
    this.auditEvents = [event, ...this.auditEvents];
  }

  // Destinations
  public getDestinations() { return [...this.destinations]; }
  public getDestination(id: string) { return this.destinations.find((d) => d.id === id); }
  public createDestination(dest: Omit<Destination, "id" | "updatedAt">, actor = "Admin") {
    const created: Destination = {
      ...dest,
      id: dest.slug || `dest-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    this.destinations = [created, ...this.destinations];
    this.recordAudit(actor, "ADMIN", "CREATE_DESTINATION", "destination", created.id, created.name);
    return created;
  }
  public updateDestination(id: string, partial: Partial<Destination>, actor = "Admin") {
    this.destinations = this.destinations.map((d) => (d.id === id ? { ...d, ...partial, updatedAt: new Date().toISOString() } : d));
    const updated = this.getDestination(id);
    if (updated) {
      this.recordAudit(actor, "ADMIN", "UPDATE_DESTINATION", "destination", id, updated.name, partial);
    }
    return updated;
  }

  // Places
  public getPlaces() { return [...this.places]; }
  public getPlace(id: string) { return this.places.find((p) => p.id === id); }
  public createPlace(place: Omit<Place, "id" | "updatedAt">, actor = "Admin") {
    const created: Place = {
      ...place,
      id: `place-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    this.places = [created, ...this.places];
    this.recordAudit(actor, "ADMIN", "CREATE_PLACE", "place", created.id, created.name);
    return created;
  }
  public updatePlace(id: string, partial: Partial<Place>, actor = "Admin") {
    this.places = this.places.map((p) => (p.id === id ? { ...p, ...partial, updatedAt: new Date().toISOString() } : p));
    const updated = this.getPlace(id);
    if (updated) {
      this.recordAudit(actor, "ADMIN", "UPDATE_PLACE", "place", id, updated.name, partial);
    }
    return updated;
  }

  // Partner Applications
  public getPartnerApplications() { return [...this.partnerApplications]; }
  public getPartnerApplication(id: string) { return this.partnerApplications.find((a) => a.id === id); }
  public updateApplicationStatus(id: string, status: PartnerAppStatus, actor = "Admin", note = "") {
    this.partnerApplications = this.partnerApplications.map((a) => {
      if (a.id === id) {
        const timeline = [
          ...a.timeline,
          { step: `Trạng thái: ${status}`, actor, timestamp: new Date().toLocaleString("vi-VN"), note },
        ];
        return { ...a, status, timeline };
      }
      return a;
    });
    const app = this.getPartnerApplication(id);
    if (app) {
      this.recordAudit(actor, "PARTNER_REVIEWER", `PARTNER_APP_${status}`, "partner", id, app.businessName, { note });
    }
    return app;
  }

  // Partner Submissions (Diff)
  public getPartnerSubmissions() { return [...this.partnerSubmissions]; }
  public resolveSubmission(id: string, status: "APPROVED" | "REJECTED" | "CHANGES_REQUESTED", actor = "Admin") {
    this.partnerSubmissions = this.partnerSubmissions.map((s) => (s.id === id ? { ...s, status } : s));
    const sub = this.partnerSubmissions.find((s) => s.id === id);
    if (sub) {
      this.recordAudit(actor, "ADMIN", `RESOLVE_SUBMISSION_${status}`, "place", sub.id, sub.entityName);
    }
    return sub;
  }

  // Content / Articles
  public getArticles() { return [...this.articles]; }
  public getArticle(id: string) { return this.articles.find((a) => a.id === id); }
  public updateArticle(id: string, partial: Partial<Article>, actor = "Admin") {
    this.articles = this.articles.map((a) => (a.id === id ? { ...a, ...partial, updatedAt: new Date().toISOString() } : a));
    const updated = this.getArticle(id);
    if (updated) {
      this.recordAudit(actor, "CONTENT_EDITOR", "UPDATE_ARTICLE", "article", id, updated.title);
    }
    return updated;
  }

  // Reviews
  public getReviews() { return [...this.reviews]; }
  public moderateReview(id: string, action: "Keep" | "Hide" | "Remove" | "Restore", actor = "Moderator", reason = "") {
    let newStatus: ReviewModerationStatus = "PUBLISHED";
    if (action === "Hide") newStatus = "HIDDEN";
    if (action === "Remove") newStatus = "REMOVED";
    if (action === "Keep" || action === "Restore") newStatus = "PUBLISHED";

    this.reviews = this.reviews.map((r) => {
      if (r.id === id) {
        const moderationHistory = [
          ...r.moderationHistory,
          { action, moderator: actor, timestamp: new Date().toLocaleString("vi-VN"), reason },
        ];
        return { ...r, status: newStatus, moderationHistory };
      }
      return r;
    });

    const rev = this.reviews.find((r) => r.id === id);
    if (rev) {
      this.recordAudit(actor, "MODERATOR", `REVIEW_${action.toUpperCase()}`, "review", id, rev.placeName, { reason });
    }
    return rev;
  }

  // CRM Leads
  public getLeads() { return [...this.leads]; }
  public updateLeadStatus(id: string, status: LeadStatus, actor = "Admin") {
    this.leads = this.leads.map((l) => (l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l));
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      this.recordAudit(actor, "OPERATIONS_MANAGER", `LEAD_STATUS_${status}`, "lead", id, lead.name);
    }
    return lead;
  }
  public assignLead(id: string, staffName: string, actor = "Admin") {
    this.leads = this.leads.map((l) => (l.id === id ? { ...l, assignedStaff: staffName, status: "ASSIGNED", updatedAt: new Date().toISOString() } : l));
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      this.recordAudit(actor, "OPERATIONS_MANAGER", "ASSIGN_LEAD", "lead", id, lead.name, { assignedTo: staffName });
    }
    return lead;
  }
  public addLeadNote(id: string, text: string, author = "Admin") {
    this.leads = this.leads.map((l) => {
      if (l.id === id) {
        return {
          ...l,
          internalNotes: [
            ...l.internalNotes,
            { id: `note-${Date.now()}`, author, text, createdAt: new Date().toLocaleString("vi-VN") },
          ],
        };
      }
      return l;
    });
    return this.leads.find((l) => l.id === id);
  }

  // AI Knowledge
  public getKnowledgeSources() { return [...this.knowledgeSources]; }
  public getKnowledgeDocuments() { return [...this.knowledgeDocuments]; }
  public reindexDocument(id: string, actor = "Admin") {
    this.knowledgeDocuments = this.knowledgeDocuments.map((d) => (d.id === id ? { ...d, indexStatus: "INDEXED", lastUpdated: "Vừa xong" } : d));
    const doc = this.knowledgeDocuments.find((d) => d.id === id);
    if (doc) {
      this.recordAudit(actor, "SUPER_ADMIN", "REINDEX_DOCUMENT", "knowledge", id, doc.title);
    }
    return doc;
  }

  // Audit
  public getAuditEvents() { return [...this.auditEvents]; }
}

export const adminStore = new AdminDataStore();
