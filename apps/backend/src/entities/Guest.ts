import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Event } from './Event';

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

@Entity('guests')
export class Guest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email: string;

    @Column({
        type: 'enum',
        enum: GuestCategory,
        default: GuestCategory.OTHERS,
    })
    category: GuestCategory;

    @Column({
        type: 'enum',
        enum: RSVPStatus,
        default: RSVPStatus.PENDING,
    })
    rsvpStatus: RSVPStatus;

    @Column({ type: 'int', default: 1 })
    attendeeCount: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    mealPreference: string;

    @Column({ type: 'boolean', default: false })
    needsAccommodation: boolean;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @ManyToMany(() => Event, (event) => event.guests)
    @JoinTable({
        name: 'guest_events',
        joinColumn: { name: 'guest_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
    })
    events: Event[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}