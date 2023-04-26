import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {  ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags("Posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  @Get("/draft")
  findDrafts() {
    return this.postsService.findDraft();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.postsService.findOne(id);
    if(!data) throw new NotFoundException(`Can't find post with the ID ${id}`)
    return data
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const data = await this.postsService.update(id, updatePostDto);
    if (!data) throw new NotFoundException(`Can't find post with the ID ${id}`);
    return data
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.postsService.remove(id);
    if (!data) throw new NotFoundException(`Can't find post with the ID ${id}`);
    return data
  }
}
