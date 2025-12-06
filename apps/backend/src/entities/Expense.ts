import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Budget } from './Budget';

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

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.MISCELLANEOUS,
  })
  category: ExpenseCategory;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  vendor: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Budget, (budget) => budget.expenses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'budget_id' })
  budget: Budget;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
