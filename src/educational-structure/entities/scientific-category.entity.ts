import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../shared/base-entity';
import { GradeLevel } from './grade-level.entity';
import { Unit } from './unit.entity';

@Entity('scientific_categories')
export class ScientificCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'uuid' })
  @Index('IDX_SCIENTIFIC_CATEGORY_GRADE_LEVEL_ID')
  gradeLevelId: string;

  @ManyToOne(() => GradeLevel, (grade) => grade.scientificCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'gradeLevelId' })
  gradeLevel?: GradeLevel;

  @OneToMany(() => Unit, (unit) => unit.scientificCategory, {
    cascade: true,
  })
  units?: Unit[];
}
