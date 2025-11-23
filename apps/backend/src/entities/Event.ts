import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm';
import { Guest } from './Guest';

export enum EventType {
    ENGAGEMENT = 'engagement',
    HALDI = 'haldi',
    MEHENDI = 'mehendi',
    SANGEET = 'sangeet',
    WEDDING = 'wedding',
    RECEPTION = 'reception',
    OTHER = 'other',
}

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({
        type: 'enum',
        enum: EventType,
        default: EventType.OTHER,
    })
    type: EventType;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'time' })
    startTime: string;

    @Column({ type: 'time' })
    endTime: string;

    @Column({ type: 'varchar', length: 500 })
    venue: string;

    @Column({ type: 'text', nullable: true })
    venueAddress: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    dressCode: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    theme: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => Guest, (guest) => guest.events)
    guests: Guest[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}