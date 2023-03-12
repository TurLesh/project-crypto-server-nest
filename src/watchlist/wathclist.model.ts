import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

interface WatchlistCreationAttrs {
    userId: number;
    items: string;
}

@Table({ tableName: 'watchlist' })
export class Watchlist extends Model<Watchlist> {
    // swagger docs block starts here //
    @ApiProperty({ example: '1', description: 'Unique user id' })
    // swagger docs block ends here //
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true })
    userId: number;
    // swagger docs block starts here //
    @ApiProperty({ example: ['bitcoin', 'ethereum', 'litecoin', 'dot'], description: 'Array of items in watchlist' })
    // swagger docs block ends here //
    @Column({ type: DataType.ARRAY(DataType.STRING) })
    items: string[];
}
