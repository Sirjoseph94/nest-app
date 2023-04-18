import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    return await this.prisma.article.create({ data: { ...createPostDto } });
  }

  async findAll() {
    return await this.prisma.article.findMany({ where: { published: true } });
  }
  async findDraft() {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  async findOne(id: string) {
    const data = await this.prisma.article.findUnique({ where: { id } });
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return data;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const data = await this.prisma.article.update({
      where: { id },
      data: updatePostDto,
    });
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return data;
  }

  async remove(id: string) {
    return await this.prisma.article.delete({ where: { id } });
  }
}
