# Visitor Management System

Frontend Development Assessment Submission

## Overview

The Visitor Management System is a modern, responsive web application designed to streamline visitor registration, approval, tracking, and monitoring processes within residential communities, apartment complexes, gated societies, and office environments.

The application provides an intuitive dashboard for monitoring visitor activity, managing visitor records, tracking approvals, and analyzing visitor trends through interactive visualizations.

---

## Features

### Authentication

* Secure login interface
* Role-based demo access
* Protected routes
* Persistent authentication using Zustand

### Dashboard

* Dynamic greeting based on time of day
* Hero Banner with responsive design and animation
* Total Visitors Today
* Pending Approvals
* Expected Visitors
* Approved Visitors Today
* Visitor Trend Chart
* Visitor Status Distribution Chart

### Visitor Management

* Add New Visitor
* View Visitor Details
* Search Visitors
* Filter Visitors
* Status Management
* Visitor History Tracking

### Form Validation

* React Hook Form integration
* Zod schema validation
* Phone number validation
* Required field validation
* User-friendly validation messages

### User Experience

* Responsive design
* Dark and Light theme support
* Interactive charts
* Clean and modern UI
* Mobile-friendly layouts

---

## Technology Stack

### Frontend Framework

* React 19
* TypeScript
* Vite

### UI Framework

* Material UI (MUI)

### State Management

* Zustand

### Routing

* React Router DOM

### Forms & Validation

* React Hook Form
* Zod

### Data Visualization

* Recharts

### Persistence

* Local Storage

### Development Tools

* ESLint
* TypeScript Compiler

---

## Project Structure

```text
src
│
├── components
│   ├── common
│   │   ├── EmptyState
│   │   ├── ErrorAlert
│   │   ├── LoadingOverlay
│   │   ├── PageHeader
│   │   └── StatusChip
│   │
│   ├── dashboard
│   │   ├── HeroBanner
│   │   ├── StatCard
│   │   ├── VisitorChart
│   │   └── StatusPieChart
│   │
│   └── visitors
│       ├── VisitorFiltersBar
│       └── VisitorTable
│
├── layouts
│   ├── AppShell
│   ├── Sidebar
│   └── TopBar
│
├── pages
│   ├── LoginPage
│   ├── DashboardPage
│   ├── VisitorListPage
│   ├── VisitorDetailPage
│   └── AddVisitorPage
│
├── services
│   └── visitors.service.ts
│
├── store
│   ├── auth.store.ts
│   ├── theme.store.ts
│   └── visitor.store.ts
│
├── schemas
│   └── visitor.schema.ts
│
├── constants
├── routes
├── hooks
├── types
└── utils
```

---

## Application Architecture

```text
Presentation Layer (Pages)
            │
            ▼
Reusable Components
            │
            ▼
State Management (Zustand)
            │
            ▼
Service Layer
            │
            ▼
Local Storage Persistence
```

---

## Key Functional Modules

### Authentication Module

Handles user login, session persistence, and route protection.

### Dashboard Module

Provides analytical insights and visual representation of visitor data.

### Visitor Management Module

Supports visitor creation, viewing, searching, filtering, and status tracking.

### Reporting & Visualization Module

Displays visitor trends and status distribution through charts.

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd visitor-management-system
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Application will start at:

```text
http://localhost:5173
```

---

## Production Build

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

## Demo Credentials

### Administrator

```text
Email: admin@vms.com
Password: admin123
```

### Security Personnel

```text
Email: security@vms.com
Password: security123
```

---

## Validation Rules

### Visitor Name

* Required

### Phone Number

* 10 digits only
* Numeric characters only
* Automatically prefixed with +91

### Host Name

* Required

### Visit Date

* Required

### Purpose

* Required

### Status

* Pending
* Approved
* Rejected

---

## Design Decisions

* React with TypeScript for scalability and maintainability.
* Zustand selected for lightweight and efficient state management.
* Material UI used to ensure consistent design language and accessibility.
* React Hook Form and Zod chosen for robust form validation.
* Local Storage used to simulate persistence without requiring backend infrastructure.
* Component-based architecture adopted to maximize reusability and maintainability.

---

## Challenges Faced

* Implementing responsive layouts across multiple screen sizes.
* Designing a reusable dashboard architecture.
* Managing visitor state efficiently using Zustand.
* Implementing robust form validation and user feedback.
* Ensuring consistent theming across all components.
* Integrating responsive hero banner animations without impacting performance.

---

## Future Enhancements

* Backend API integration
* Role-Based Access Control (RBAC)
* QR Code based visitor passes
* Real-time notifications
* Email and SMS alerts
* Visitor check-in/check-out workflow
* Export reports to PDF and Excel
* Audit logging
* Advanced analytics dashboard

---

## Screenshots

Include screenshots for:

1. Login Page
2. Dashboard
3. Visitor List
4. Add Visitor Page
5. Visitor Details Page
6. Dark Theme
7. Light Theme

---

## Author

**Navaneeth C J**

Frontend Development Assessment Submission

---

## License

This project was developed solely for technical assessment and evaluation purposes.
