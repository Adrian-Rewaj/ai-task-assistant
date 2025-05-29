import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RequestWithUser } from './types/request-with-user.interface';
import { GenerateTasksDto } from './types/generate-tasks.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async generateTasks(@Request() req: RequestWithUser, @Body() body: GenerateTasksDto) {
    return this.aiService.generateTasks(body.prompt, req.user.id);
  }
} 