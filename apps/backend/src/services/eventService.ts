import { AppDataSource } from '../config/database';
import { Event, EventType } from '../entities/Event';

export class EventService {
    private eventRepository = AppDataSource.getRepository(Event);

    async getAllEvents() {
        return await this.eventRepository.find({
            relations: ['guests'],
            order: { date: 'ASC', startTime: 'ASC' },
        });
    }

    async getEventById(id: string) {
        const event = await this.eventRepository.findOne({
            where: { id },
            relations: ['guests'],
        });

        if (!event) {
            throw new Error('Event not found');
        }

        return event;
    }

    async createEvent(eventData: Partial<Event>) {
        const event = this.eventRepository.create(eventData);
        return await this.eventRepository.save(event);
    }

    async updateEvent(id: string, eventData: Partial<Event>) {
        const event = await this.getEventById(id);
        Object.assign(event, eventData);
        return await this.eventRepository.save(event);
    }

    async deleteEvent(id: string) {
        const event = await this.getEventById(id);
        await this.eventRepository.remove(event);
        return { message: 'Event deleted successfully' };
    }

    async getEventStats() {
        const totalEvents = await this.eventRepository.count();

        const upcomingEvents = await this.eventRepository
            .createQueryBuilder('event')
            .where('event.date >= :today', { today: new Date() })
            .getCount();

        const eventTypes = await this.eventRepository
            .createQueryBuilder('event')
            .select('event.type', 'type')
            .addSelect('COUNT(*)', 'count')
            .groupBy('event.type')
            .getRawMany();

        return {
            totalEvents,
            upcomingEvents,
            eventTypes,
        };
    }

    async getGuestsForEvent(eventId: string) {
        const event = await this.getEventById(eventId);
        return event.guests;
    }
}