# Implementation Plan for Remaining Features

## Overview
This document outlines the implementation strategy for features not yet completed in the MVP. Features are prioritized based on the PRD requirements.

---

## 🎯 Phase 2: Vendor Management

### Backend Implementation

**New Entity: `Vendor.ts`**
```typescript
@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: VendorCategory })
  category: VendorCategory; // CATERING, PHOTOGRAPHY, DECORATION, etc.

  @Column()
  contactPerson: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  contractAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amountPaid: number;

  @Column({ type: 'enum', enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @Column({ type: 'date', nullable: true })
  contractDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @Column({ type: 'json', nullable: true })
  documents: string[]; // URLs to uploaded contracts/invoices
}
```

**API Endpoints**
- `GET /api/vendors`
- `POST /api/vendors`
- `PUT /api/vendors/:id`
- `DELETE /api/vendors/:id`
- `GET /api/vendors/:id/documents`
- `POST /api/vendors/:id/documents` - Upload documents

**Service: `vendorService.ts`**
- CRUD operations
- Payment tracking
- Document management
- Rating system

### Frontend Implementation

**Page: `apps/frontend/src/app/vendors/page.tsx`**
- Vendor list with filters by category
- Vendor detail modal/page
- Payment tracking visualizations
- Document upload interface
- Rating and review system

**Components**
- `VendorCard.tsx` - Display vendor summary
- `VendorForm.tsx` - Add/edit vendor
- `PaymentTracker.tsx` - Visual payment progress
- `DocumentUpload.tsx` - Handle file uploads

### Estimated Effort
- Backend: 3-4 hours
- Frontend: 4-5 hours
- Testing: 1-2 hours
**Total: 8-11 hours**

---

## ✈️ Phase 3: Travel Planner

### Backend Implementation

**New Entity: `Travel.ts`**
```typescript
@Entity('travels')
export class Travel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Guest)
  guest: Guest;

  @Column({ type: 'enum', enum: TravelMode })
  mode: TravelMode; // FLIGHT, TRAIN, BUS, CAR

  @Column({ nullable: true })
  flightNumber: string;

  @Column({ type: 'datetime' })
  arrivalDateTime: Date;

  @Column({ type: 'datetime', nullable: true })
  departureDateTime: Date;

  @Column({ nullable: true })
  pickupLocation: string;

  @Column({ type: 'boolean', default: false })
  pickupArranged: boolean;

  @Column({ nullable: true })
  assignedDriver: string;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
```

**API Endpoints**
- `GET /api/travels`
- `POST /api/travels`
- `PUT /api/travels/:id`
- `DELETE /api/travels/:id`
- `GET /api/travels/arrivals/:date` - Get arrivals by date
- `POST /api/travels/:id/pickup` - Assign pickup

**Service: `travelService.ts`**
- CRUD operations
- Filter by date/guest
- Pickup coordination
- Timeline view

### Frontend Implementation

**Page: `apps/frontend/src/app/travel/page.tsx`**
- Timeline view of arrivals/departures
- Airport pickup scheduler
- Bulk import from CSV
- Driver/vehicle assignment
- Calendar integration

**Components**
- `TravelTimeline.tsx` - Visual timeline
- `PickupScheduler.tsx` - Assign drivers
- `TravelImport.tsx` - CSV import

### Estimated Effort
- Backend: 3-4 hours
- Frontend: 5-6 hours
- Testing: 1-2 hours
**Total: 9-12 hours**

---

## 🏨 Phase 4: Stay Management

### Backend Implementation

**New Entity: `Accommodation.ts`**
```typescript
@Entity('accommodations')
export class Accommodation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hotelName: string;

  @Column()
  roomType: string;

  @Column({ type: 'int' })
  roomsBooked: number;

  @Column({ type: 'date' })
  checkIn: Date;

  @Column({ type: 'date' })
  checkOut: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costPerNight: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  contactInfo: string;

  @ManyToMany(() => Guest)
  @JoinTable()
  guests: Guest[];
}
```

**API Endpoints**
- `GET /api/accommodations`
- `POST /api/accommodations`
- `PUT /api/accommodations/:id`
- `DELETE /api/accommodations/:id`
- `POST /api/accommodations/:id/assign-guests`
- `GET /api/accommodations/availability`

### Frontend Implementation

**Page: `apps/frontend/src/app/accommodation/page.tsx`**
- Hotel list with availability
- Room allocation matrix
- Guest assignment interface
- Check-in/check-out tracker
- Cost calculator

### Estimated Effort
- Backend: 3-4 hours
- Frontend: 4-5 hours
- Testing: 1-2 hours
**Total: 8-11 hours**

---

## 🌐 Phase 5: Wedding Website Builder

### Backend Implementation

**New Entity: `WebsiteContent.ts`**
```typescript
@Entity('website_content')
export class WebsiteContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string; // e.g., "mayank-priya-wedding"

  @Column()
  coupleNameBride: string;

  @Column()
  coupleNameGroom: string;

  @Column({ type: 'text', nullable: true })
  loveStory: string;

  @Column({ type: 'json', nullable: true })
  photoGallery: string[];

  @Column({ type: 'json' })
  theme: object; // Colors, fonts, etc.

  @Column({ type: 'boolean', default: true })
  isPublished: boolean;

  @Column({ type: 'int', default: 0 })
  visitorCount: number;
}
```

**API Endpoints**
- `GET /api/website/:slug`
- `POST /api/website`
- `PUT /api/website/:id`
- `POST /api/website/:slug/rsvp` - Public RSVP submission
- `GET /api/website/:slug/stats`

### Frontend Implementation

**Public Website: `apps/frontend/src/app/w/[slug]/page.tsx`**
- Beautiful landing page
- Love story section
- Event timeline
- Photo gallery
- RSVP form (public)
- Gift registry
- Travel information

**Admin Builder: `apps/frontend/src/app/website/page.tsx`**
- WYSIWYG editor
- Theme customizer
- Content management
- Analytics dashboard

### Estimated Effort
- Backend: 4-5 hours
- Frontend: 10-12 hours
- Design: 3-4 hours
**Total: 17-21 hours**

---

## 🤖 Phase 6: AI Assistant Integration

### Backend Implementation

**Service: `aiService.ts`**
```typescript
// OpenAI GPT-4 integration
class AIService {
  async suggestVendors(budget: number, category: string): Promise<Vendor[]>
  async generateChecklist(eventType: string): Promise<Task[]>
  async optimizeTimeline(events: Event[]): Promise<Timeline>
  async analyzeGuests(guests: Guest[]): Promise<Insights>
  async designInvitation(theme: string, details: object): Promise<string>
}
```

**API Endpoints**
- `POST /api/ai/suggest-vendors`
- `POST /api/ai/generate-checklist`
- `POST /api/ai/chat` - Chatbot
- `POST /api/ai/design-invitation`

### Frontend Implementation

**Component: `AIAssistant.tsx`**
- Floating chat widget
- Context-aware suggestions
- Task recommendations
- Budget optimization tips

### Dependencies
- OpenAI API key
- Prompt engineering
- Context management

### Estimated Effort
- Backend: 6-8 hours
- Frontend: 4-5 hours
- Prompt Engineering: 3-4 hours
**Total: 13-17 hours**

---

## 📱 Phase 7: WhatsApp Integration

### Backend Implementation

**Service: `whatsappService.ts`**
```typescript
// Twilio WhatsApp API integration
class WhatsAppService {
  async sendInvitation(phone: string, message: string)
  async sendRSVPReminder(guests: Guest[])
  async sendEventReminder(event: Event)
  async handleIncomingMessage(webhook: any)
}
```

**Webhook: `/api/webhooks/whatsapp`**
- Handle incoming RSVP responses
- Parse confirmation messages
- Update guest status

### Dependencies
- Twilio WhatsApp Business API
- Message templates
- Webhook handling

### Estimated Effort
- Backend: 5-6 hours
- Testing: 2-3 hours
**Total: 7-9 hours**

---

## 📋 Phase 8: Task & Checklist Manager

### Backend Implementation

**New Entity: `Task.ts`**
```typescript
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskCategory })
  category: TaskCategory;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus; // TODO, IN_PROGRESS, COMPLETED

  @Column({ type: 'enum', enum: TaskPriority })
  priority: TaskPriority;

  @Column({ nullable: true })
  assignedTo: string;

  @ManyToOne(() => Event, { nullable: true })
  event: Event;
}
```

**API Endpoints**
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `PATCH /api/tasks/:id/status`
- `GET /api/tasks/upcoming`

### Frontend Implementation

**Page: `apps/frontend/src/app/tasks/page.tsx`**
- Kanban board view
- Calendar view
- Task filters
- Assignment management
- Progress tracking

### Estimated Effort
- Backend: 3-4 hours
- Frontend: 5-6 hours
**Total: 8-10 hours**

---

## 📊 Phase 9: Advanced Analytics & Reports

### Backend Implementation

**Service: `analyticsService.ts`**
- Guest demographics breakdown
- Budget utilization trends
- RSVP conversion rates
- Event attendance predictions
- Vendor performance metrics

**API Endpoints**
- `GET /api/analytics/overview`
- `GET /api/analytics/guests`
- `GET /api/analytics/budget-trends`
- `GET /api/reports/export` - PDF/Excel export

### Frontend Implementation

**Page: `apps/frontend/src/app/analytics/page.tsx`**
- Interactive dashboards
- Charts with Recharts
- Export functionality
- Customizable reports

### Estimated Effort
- Backend: 4-5 hours
- Frontend: 6-7 hours
**Total: 10-12 hours**

---

## 📸 Phase 10: Photo Gallery & Media Management

### Backend Implementation

**Cloud Storage Integration**
- Google Drive API
- Firebase Storage
- Image optimization

**New Entity: `Media.ts`**
```typescript
@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: MediaType })
  type: MediaType; // PHOTO, VIDEO

  @ManyToOne(() => Event)
  event: Event;

  @ManyToOne(() => Guest, { nullable: true })
  uploadedBy: Guest;

  @Column({ type: 'boolean', default: false })
  isApproved: boolean;

  @Column({ type: 'json', nullable: true })
  tags: string[];
}
```

### Frontend Implementation

**Page: `apps/frontend/src/app/gallery/page.tsx`**
- Photo grid with lightbox
- Upload interface
- Album organization
- Guest upload portal
- Moderation tools

### Estimated Effort
- Backend: 5-6 hours
- Frontend: 7-8 hours
**Total: 12-14 hours**

---

## 🔐 Phase 11: Authentication & Authorization

### Backend Implementation

**JWT Authentication**
- bcrypt for password hashing
- JWT token generation
- Refresh token mechanism

**Middleware: `authMiddleware.ts`**
```typescript
export const authenticate = async (req, res, next) => {
  // Verify JWT token
  // Attach user to req.user
}

export const authorize = (roles: UserRole[]) => {
  return (req, res, next) => {
    // Check if user has required role
  }
}
```

**API Endpoints**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Frontend Implementation

**Context: `AuthContext.tsx`**
- Login/logout functionality
- Protected routes
- Role-based UI

### Estimated Effort
- Backend: 4-5 hours
- Frontend: 3-4 hours
**Total: 7-9 hours**

---

## 📱 Phase 12: Mobile App (React Native)

### Implementation Strategy

**Shared Logic**
- Extract API calls to shared package
- Reuse TypeScript types

**React Native Setup**
```bash
npx create-expo-app apps/mobile
```

**Key Screens**
- Dashboard
- Guest List
- Event Timeline
- Budget Overview
- QR Code Scanner (check-in)
- Push Notifications

### Estimated Effort
- Setup: 2-3 hours
- UI Development: 15-20 hours
- Native Features: 5-7 hours
**Total: 22-30 hours**

---

## 🎨 Phase 13: Invitation Card Designer

### Backend Implementation

**Service: `cardDesignerService.ts`**
- Template management
- AI-powered design generation
- PDF generation

**API Endpoints**
- `GET /api/cards/templates`
- `POST /api/cards/generate`
- `POST /api/cards/preview`
- `GET /api/cards/:id/download`

### Frontend Implementation

**Page: `apps/frontend/src/app/cards/page.tsx`**
- Template selector
- Drag-and-drop editor
- Text customization
- Image upload
- Preview & download

### Dependencies
- Canvas API / Fabric.js
- PDF generation library
- AI image generation (DALL-E)

### Estimated Effort
- Backend: 5-6 hours
- Frontend: 10-12 hours
**Total: 15-18 hours**

---

## 📈 Total Estimated Implementation Time

| Phase | Feature | Hours |
|-------|---------|-------|
| 2 | Vendor Management | 8-11 |
| 3 | Travel Planner | 9-12 |
| 4 | Stay Management | 8-11 |
| 5 | Wedding Website | 17-21 |
| 6 | AI Assistant | 13-17 |
| 7 | WhatsApp Integration | 7-9 |
| 8 | Task Manager | 8-10 |
| 9 | Analytics | 10-12 |
| 10 | Photo Gallery | 12-14 |
| 11 | Authentication | 7-9 |
| 12 | Mobile App | 22-30 |
| 13 | Card Designer | 15-18 |
| **TOTAL** | | **136-174 hours** |

---

## 🎯 Recommended Implementation Order

1. **Vendor Management** (Phase 2) - High business value, moderate complexity
2. **Authentication** (Phase 11) - Security foundation for all features
3. **Task Manager** (Phase 8) - Helps organize implementation
4. **Travel & Stay** (Phases 3-4) - Related features, implement together
5. **Wedding Website** (Phase 5) - Public-facing feature
6. **AI Assistant** (Phase 6) - Value multiplier for all features
7. **WhatsApp Integration** (Phase 7) - Automation and communication
8. **Analytics** (Phase 9) - Data-driven insights
9. **Photo Gallery** (Phase 10) - Media management
10. **Card Designer** (Phase 13) - Creative tools
11. **Mobile App** (Phase 12) - Extend platform reach

---

## 🔧 Technical Considerations

### Performance Optimization
- Implement caching (Redis)
- Database indexing
- Image optimization
- Lazy loading
- Pagination

### Security
- Input validation
- SQL injection prevention (TypeORM handles this)
- XSS protection
- Rate limiting
- HTTPS only

### Scalability
- Horizontal scaling with load balancer
- Database read replicas
- CDN for static assets
- Microservices architecture (future)

### Testing
- Unit tests (Jest)
- Integration tests
- E2E tests (Playwright)
- API tests (Supertest)

---

## 📚 Additional Resources

### Documentation to Create
- API documentation (Swagger/OpenAPI)
- Component storybook
- User guide
- Developer onboarding

### Third-Party Services to Consider
- **Email**: SendGrid, AWS SES
- **SMS**: Twilio
- **Storage**: AWS S3, Google Cloud Storage
- **Analytics**: Google Analytics, Mixpanel
- **Monitoring**: Sentry, LogRocket
- **Payment**: Razorpay, Stripe (for vendors/gifts)

---

## 🚀 MVP to Production Checklist

- [ ] Implement authentication
- [ ] Add input validation
- [ ] Set up error monitoring
- [ ] Configure production database
- [ ] Enable HTTPS
- [ ] Set up CI/CD pipeline
- [ ] Write unit tests
- [ ] Create user documentation
- [ ] Performance testing
- [ ] Security audit
- [ ] Backup strategy
- [ ] Monitoring dashboards

---

This implementation plan provides a clear roadmap for completing all features outlined in the PRD. Each phase can be implemented independently, allowing for incremental development and testing.