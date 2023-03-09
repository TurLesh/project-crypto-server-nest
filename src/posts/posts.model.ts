import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({ tableName: 'posts' })
export class PostModel extends Model<PostModel, PostCreationAttrs> {
    // swagger docs block starts here //
    @ApiProperty({ example: 1, description: 'Unique post id' })
    // swagger docs block ends here //
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    // swagger docs block starts here //
    @ApiProperty({ example: 'Cryptocurrency news today.', description: 'Post title' })
    // swagger docs block ends here //
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    // swagger docs block starts here //
    @ApiProperty({ example: 'BTC falls below 20k.', description: 'Post content' })
    // swagger docs block ends here //
    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    // swagger docs block starts here //
    @ApiProperty({ example: '00296b21-9b9b-470c-aeb2-62ebcef5d32f.jpg', description: 'Post image' })
    // swagger docs block ends here //
    @Column({ type: DataType.STRING })
    image: string;

    // swagger docs block starts here //
    @ApiProperty({ example: 2, description: 'Who was this post made by' })
    // swagger docs block ends here //
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    author: User;
}
