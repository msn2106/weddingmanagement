import 'reflect-metadata';
import { AppDataSource } from '../config/database';
import { Guest, RSVPStatus, GuestCategory } from '../entities/Guest';
import { Event, EventType } from '../entities/Event';
import { Budget } from '../entities/Budget';
import { Expense, ExpenseCategory, PaymentStatus } from '../entities/Expense';

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    // Clear tables first
    await AppDataSource.query('DELETE FROM guest_events');
    await AppDataSource.getRepository(Expense).createQueryBuilder().delete().execute();
    await AppDataSource.getRepository(Guest).createQueryBuilder().delete().execute();
    await AppDataSource.getRepository(Event).createQueryBuilder().delete().execute();
    await AppDataSource.getRepository(Budget).createQueryBuilder().delete().execute();

    // Seed Events
    const events = await AppDataSource.getRepository(Event).save([
      {
        name: 'Engagement Ceremony',
        type: EventType.ENGAGEMENT,
        date: new Date('2024-12-15'),
        startTime: '18:00',
        endTime: '21:00',
        venue: 'Grand Ballroom',
        venueAddress: '123 Main Street, City',
        dressCode: 'Cocktail',
        theme: 'Royal Purple & Gold',
      },
      {
        name: 'Haldi Ceremony',
        type: EventType.HALDI,
        date: new Date('2024-12-18'),
        startTime: '10:00',
        endTime: '13:00',
        venue: 'Home Garden',
        venueAddress: 'Family Home',
        dressCode: 'Traditional Yellow',
        theme: 'Yellow & Turmeric',
      },
      {
        name: 'Sangeet Night',
        type: EventType.SANGEET,
        date: new Date('2024-12-19'),
        startTime: '19:00',
        endTime: '23:00',
        venue: 'Paradise Hall',
        venueAddress: '456 Paradise Road',
        dressCode: 'Festive',
        theme: 'Bollywood Night',
      },
      {
        name: 'Wedding Ceremony',
        type: EventType.WEDDING,
        date: new Date('2024-12-20'),
        startTime: '08:00',
        endTime: '12:00',
        venue: 'Temple Grounds',
        venueAddress: 'Holy Temple, City',
        dressCode: 'Traditional',
        theme: 'Traditional Wedding',
      },
    ]);

    console.log('✅ Events seeded');

    // Seed Guests
    const guests = await AppDataSource.getRepository(Guest).save([
      {
        name: 'Rajesh Kumar',
        phone: '+919876543210',
        email: 'rajesh@example.com',
        category: GuestCategory.FAMILY_BRIDE,
        rsvpStatus: RSVPStatus.ATTENDING,
        attendeeCount: 2,
        events: [events[0], events[1], events[2], events[3]],
      },
      {
        name: 'Priya Sharma',
        phone: '+918765432109',
        email: 'priya@example.com',
        category: GuestCategory.FRIENDS,
        rsvpStatus: RSVPStatus.MAYBE,
        attendeeCount: 1,
        events: [events[0], events[3]],
      },
      {
        name: 'Amit Patel',
        phone: '+917654321098',
        email: 'amit@example.com',
        category: GuestCategory.COLLEAGUES,
        rsvpStatus: RSVPStatus.PENDING,
        attendeeCount: 1,
        events: [],
      },
    ]);

    console.log('✅ Guests seeded');

    // Seed Budget
    const budget = await AppDataSource.getRepository(Budget).save({
      name: 'Main Wedding Budget',
      totalBudget: 500000,
      totalSpent: 0,
      notes: 'Complete wedding budget',
    });

    console.log('✅ Budget seeded');

    // Seed Expenses
    await AppDataSource.getRepository(Expense).save([
      {
        description: 'Grand Ballroom Booking',
        category: ExpenseCategory.VENUE,
        amount: 150000,
        paymentStatus: PaymentStatus.PAID,
        date: new Date('2024-11-15'),
        vendor: 'Grand Ballroom',
        budget,
      },
      {
        description: 'Wedding Menu Package',
        category: ExpenseCategory.CATERING,
        amount: 120000,
        paymentStatus: PaymentStatus.ADVANCE_PAID,
        date: new Date('2024-11-18'),
        vendor: 'Royal Caterers',
        budget,
      },
      {
        description: 'Photography & Videography',
        category: ExpenseCategory.PHOTOGRAPHY,
        amount: 80000,
        paymentStatus: PaymentStatus.PENDING,
        date: new Date('2024-11-20'),
        vendor: 'Capture Moments',
        budget,
      },
    ]);

    // Recalculate budget
    const allExpenses = await AppDataSource.getRepository(Expense).find({
      where: { budget: { id: budget.id } },
    });
    budget.totalSpent = allExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    await AppDataSource.getRepository(Budget).save(budget);

    console.log('✅ Expenses seeded');
    console.log('🎉 Database seeding completed successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
