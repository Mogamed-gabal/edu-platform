import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../shared/base-entity';
import { ScientificCategory } from './scientific-category.entity';

@Entity('grade_levels')
@Index(['deletedAt'])
export class GradeLevel extends BaseEntity {
  @Column({ unique: true, type: 'varchar', length: 30 })
  @Index('INDEX_GRADE_LEVEL_NAME')
  name: string;

  @OneToMany(() => ScientificCategory, (category) => category.gradeLevel, {
    cascade: true,
  })
  scientificCategories?: ScientificCategory[];
}
