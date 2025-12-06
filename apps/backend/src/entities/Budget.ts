import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Expense } from './Expense';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalBudget: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalSpent: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => Expense, (expense) => expense.budget)
  expenses: Expense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
