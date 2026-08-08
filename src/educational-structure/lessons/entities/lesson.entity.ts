import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/base-entity';
import { Chapter } from '../../entities/chapter.entity';

@Entity('lessons')
@Index('IDX_LESSON_CHAPTER_ORDER', ['chapterId', 'order'])
export class Lesson extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  videoUrls?: string[];

  @Column({ type: 'json', nullable: true })
  photoUrls?: string[];

  @Index('Lesson Order Index')
  @Column({ type: 'int', default: 1 })
  order: number;

  @Column({ type: 'boolean', default: true })
  isFree: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Index('Lesson Chapter ID Index')
  @Column()
  chapterId: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chapterId' })
  chapter?: Chapter;
}
