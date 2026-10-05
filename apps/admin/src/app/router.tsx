import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminShell } from "@/layouts/admin-shell";
import { PermissionGuard } from "@/auth/permission-guard";

// Feature pages
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { DestinationsListPage } from "@/features/destinations/pages/destinations-list-page";
import { PlacesListPage } from "@/features/places/pages/places-list-page";
import { ArticlesPage } from "@/features/content/pages/articles-page";
import { PartnerApplicationsPage } from "@/features/partners/pages/partner-applications-page";
import { PartnersDirectoryPage } from "@/features/partners/pages/partners-directory-page";
import { PartnerSubmissionsPage } from "@/features/partners/pages/partner-submissions-page";
import { ReviewModerationPage } from "@/features/reviews/pages/review-moderation-page";
import { CustomersPage } from "@/features/customers/pages/customers-page";
import { CrmLeadsPage } from "@/features/crm/pages/crm-leads-page";
import { KnowledgeBasePage } from "@/features/knowledge/pages/knowledge-base-page";
import { AnalyticsPage } from "@/features/analytics/pages/analytics-page";
import { AuditLogPage } from "@/features/audit/pages/audit-log-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminShell />,
    children: [
      {
        index: true,
        element: (
          <PermissionGuard module="dashboard">
            <DashboardPage />
          </PermissionGuard>
        ),
      },
      {
        path: "destinations",
        element: (
          <PermissionGuard module="destinations">
            <DestinationsListPage />
          </PermissionGuard>
        ),
      },
      {
        path: "places",
        element: (
          <PermissionGuard module="places">
            <PlacesListPage />
          </PermissionGuard>
        ),
      },
      {
        path: "articles",
        element: (
          <PermissionGuard module="articles">
            <ArticlesPage />
          </PermissionGuard>
        ),
      },
      {
        path: "partners/applications",
        element: (
          <PermissionGuard module="partners">
            <PartnerApplicationsPage />
          </PermissionGuard>
        ),
      },
      {
        path: "partners/directory",
        element: (
          <PermissionGuard module="partners">
            <PartnersDirectoryPage />
          </PermissionGuard>
        ),
      },
      {
        path: "partners/submissions",
        element: (
          <PermissionGuard module="partners">
            <PartnerSubmissionsPage />
          </PermissionGuard>
        ),
      },
      {
        path: "reviews",
        element: (
          <PermissionGuard module="reviews">
            <ReviewModerationPage />
          </PermissionGuard>
        ),
      },
      {
        path: "customers",
        element: (
          <PermissionGuard module="customers">
            <CustomersPage />
          </PermissionGuard>
        ),
      },
      {
        path: "crm/leads",
        element: (
          <PermissionGuard module="crm">
            <CrmLeadsPage />
          </PermissionGuard>
        ),
      },
      {
        path: "knowledge",
        element: (
          <PermissionGuard module="knowledge">
            <KnowledgeBasePage />
          </PermissionGuard>
        ),
      },
      {
        path: "analytics",
        element: (
          <PermissionGuard module="analytics">
            <AnalyticsPage />
          </PermissionGuard>
        ),
      },
      {
        path: "audit",
        element: (
          <PermissionGuard module="audit">
            <AuditLogPage />
          </PermissionGuard>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
