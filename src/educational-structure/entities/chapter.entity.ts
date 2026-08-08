import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../shared/base-entity';
import { Unit } from './unit.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@Entity('chapters')
export class Chapter extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'int', default: 1 })
  order: number;

  @Column()
  @Index('INDEX_CHAPTER_UNIT_ID')
  unitId: string;

  @ManyToOne(() => Unit, (unit: Unit) => unit.chapters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'unitId' })
  unit?: Unit;

  @OneToMany(() => Lesson, (lesson) => lesson.chapter, {
    cascade: true,
  })
  lessons?: Lesson[];
}
