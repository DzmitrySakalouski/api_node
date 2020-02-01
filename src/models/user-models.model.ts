import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import 'reflect-metadata';

@Table({
    timestamps: false
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public name: string;

    @Column
    public password: string;
}

export abstract class UserModel {
    public name: string;
    public password: string;
}
