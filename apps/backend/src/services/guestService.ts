import { AppDataSource } from '../config/database';
import { Guest, RSVPStatus, GuestCategory } from '../entities/Guest';
import { In } from 'typeorm';

export class GuestService {
    private guestRepository = AppDataSource.getRepository(Guest);

    async getAllGuests() {
        return await this.guestRepository.find({
            relations: ['events'],
            order: { createdAt: 'DESC' },
        });
    }

    async getGuestById(id: string) {
        const guest = await this.guestRepository.findOne({
            where: { id },
            relations: ['events'],
        });

        if (!guest) {
            throw new Error('Guest not found');
        }

        return guest;
    }

    async createGuest(guestData: Partial<Guest>) {
        const guest = this.guestRepository.create(guestData);
        return await this.guestRepository.save(guest);
    }

    async updateGuest(id: string, guestData: Partial<Guest>) {
        const guest = await this.getGuestById(id);
        Object.assign(guest, guestData);
        return await this.guestRepository.save(guest);
    }

    async deleteGuest(id: string) {
        const guest = await this.getGuestById(id);
        await this.guestRepository.remove(guest);
        return { message: 'Guest deleted successfully' };
    }

    async updateRSVP(id: string, status: RSVPStatus) {
        const guest = await this.getGuestById(id);
        guest.rsvpStatus = status;
        return await this.guestRepository.save(guest);
    }

    async getGuestStats() {
        const totalGuests = await this.guestRepository.count();

        const rsvpCounts = await this.guestRepository
            .createQueryBuilder('guest')
            .select('guest.rsvpStatus', 'status')
            .addSelect('COUNT(*)', 'count')
            .groupBy('guest.rsvpStatus')
            .getRawMany();

        const categoryCounts = await this.guestRepository
            .createQueryBuilder('guest')
            .select('guest.category', 'category')
            .addSelect('COUNT(*)', 'count')
            .groupBy('guest.category')
            .getRawMany();

        return {
            totalGuests,
            rsvpCounts,
            categoryCounts,
        };
    }

    async assignGuestToEvents(guestId: string, eventIds: string[]) {
        const guest = await this.getGuestById(guestId);
        const events = await AppDataSource.getRepository('Event').findBy({
            id: In(eventIds),
        });
        guest.events = events;
        return await this.guestRepository.save(guest);
    }
}