import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        unique:true
    })
    email:string;

    @Column('text',{
        select:false
    })
    password:string;

    @Column('text')
    fullName:string;

    @Column('bool',{
        default:true
    })
    isActive:boolean;

    @Column('text',{
        array:true,
        default:['user']
    })
    roles:string[]

    @OneToMany(
        () => Ticket,
        (ticket) => ticket.user
    )
    ticket:Ticket;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLocaleLowerCase().trim()
    }


}
