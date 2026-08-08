import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../shared/base-entity';
import { ScientificCategory } from './scientific-category.entity';
import { Chapter } from './chapter.entity';

@Entity('units')
export class Unit extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'int', default: 1 })
  order: number;

  @Column()
  @Index('INDEX_UNIT_SCIENTIFIC_CATEGORY_ID')
  scientificCategoryId: string;

  @ManyToOne(() => ScientificCategory, (category) => category.units, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scientificCategoryId' })
  scientificCategory?: ScientificCategory;

  @OneToMany(() => Chapter, (chapter) => chapter.unit, {
    cascade: true,
  })
  chapters?: Chapter[];
}
