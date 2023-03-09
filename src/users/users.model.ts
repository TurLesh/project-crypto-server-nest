import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { PostModel } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    // swagger docs block starts here //
    @ApiProperty({ example: '1', description: 'Unique id' })
    // swagger docs block ends here //
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    // swagger docs block starts here //
    @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
    // swagger docs block ends here //
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    // swagger docs block starts here //
    @ApiProperty({ example: 'password123', description: 'Password' })
    // swagger docs block ends here //
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    // swagger docs block starts here //
    @ApiProperty({ example: 'true', description: 'Is user banned or not' })
    // swagger docs block ends here //
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    // swagger docs block starts here //
    @ApiProperty({ example: 'Suspected of a phishing attempt', description: 'Ban reason' })
    // swagger docs block ends here //
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    // swagger docs block starts here //
    @ApiProperty({ type: 'array', description: 'Array of roles given to user' })
    // swagger docs block ends here //
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    // swagger docs block starts here //
    @ApiProperty({ type: 'array', description: 'Array of user`s posts' })
    // swagger docs block ends here //
    @HasMany(() => PostModel)
    posts: PostModel[];
}
