export interface Budget {
  id: string;
  name: string;
  totalBudget: number;
  totalSpent: number;
  notes?: string;
  expenses?: Expense[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RSVPCount {
  status: string;
  count: number;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface GuestStats {
  totalGuests: number;
  rsvpCounts: RSVPCount[];
  categoryCounts: CategoryCount[];
}

export interface EventTypeCount {
  type: string;
  count: number;
}

export interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  eventTypes: EventTypeCount[];
}

export interface BudgetStats {
  total: number;
  spent: number;
  remaining: number;
  utilizationPercentage: number;
}

export interface DashboardStats {
  guests: GuestStats;
  events: EventStats;
  budget: BudgetStats;
}

export enum EventType {
  ENGAGEMENT = 'engagement',
  HALDI = 'haldi',
  MEHENDI = 'mehendi',
  SANGEET = 'sangeet',
  WEDDING = 'wedding',
  RECEPTION = 'reception',
  OTHER = 'other',
}

export interface Event {
  id: string;
  name: string;
  type: EventType;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  venueAddress?: string;
  dressCode?: string;
  theme?: string;
  description?: string;
  guests?: Guest[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ExpenseCategory {
  VENUE = 'venue',
  CATERING = 'catering',
  PHOTOGRAPHY = 'photography',
  DECORATION = 'decoration',
  MUSIC = 'music',
  TRANSPORTATION = 'transportation',
  ATTIRE = 'attire',
  INVITATIONS = 'invitations',
  GIFTS = 'gifts',
  MISCELLANEOUS = 'miscellaneous',
}

export enum PaymentStatus {
  PENDING = 'pending',
  ADVANCE_PAID = 'advance_paid',
  PAID = 'paid',
}

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  paymentStatus: PaymentStatus;
  date: Date;
  vendor?: string;
  notes?: string;
  budget: Budget;
  createdAt: Date;
  updatedAt: Date;
}
export enum RSVPStatus {
  PENDING = 'pending',
  ATTENDING = 'attending',
  NOT_ATTENDING = 'not_attending',
  MAYBE = 'maybe',
}

export enum GuestCategory {
  FAMILY_BRIDE = 'family_bride',
  FAMILY_GROOM = 'family_groom',
  FRIENDS = 'friends',
  COLLEAGUES = 'colleagues',
  OTHERS = 'others',
}

export interface Guest {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  category: GuestCategory;
  rsvpStatus: RSVPStatus;
  attendeeCount: number;
  mealPreference?: string;
  needsAccommodation: boolean;
  notes?: string;
  events?: Event[];
  createdAt: Date;
  updatedAt: Date;
}
