import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  originalUrl: string;
  @Column({ unique: true })
  @Index() // Add an index for faster lookups
  slug: string;
  @Column({ default: 0 })
  visits: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}