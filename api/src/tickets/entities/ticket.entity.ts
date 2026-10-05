import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20 })
  code: string;

  @Column({ length: 100 })
  subject: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 20 })
  priority: string;
}
