import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Url extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    link: string

    @Column({nullable: true})
    slug: string

    @Column()
    createdAt: Date

    @Column({nullable: true})
    expireAt: Date
}