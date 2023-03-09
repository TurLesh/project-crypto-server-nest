import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { PostModel } from './posts.model';

// swagger docs block starts here //
@ApiTags('Posts')
// swagger docs block ends here //
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Create post' })
    @ApiResponse({ status: 201, type: PostModel })
    // swagger docs block ends here //
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(dto, image);
    }
}
