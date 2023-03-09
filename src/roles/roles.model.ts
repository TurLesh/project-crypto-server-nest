import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    // swagger docs block starts here //
    @ApiProperty({ example: '2', description: 'Unique id' })
    // swagger docs block ends here //
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    // swagger docs block starts here //
    @ApiProperty({ example: 'USER', description: 'Role unique name' })
    // swagger docs block ends here //
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;

    // swagger docs block starts here //
    @ApiProperty({ example: 'Regular user', description: 'Role description' })
    // swagger docs block ends here //
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}
