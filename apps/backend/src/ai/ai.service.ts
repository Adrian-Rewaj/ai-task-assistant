import { Injectable, BadRequestException } from '@nestjs/common';
import { OpenAI } from 'openai';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AiTaskResponse } from './types/ai-response.interface';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  private validateAiResponse(response: unknown): asserts response is AiTaskResponse {
    if (!response || typeof response !== 'object') {
      throw new BadRequestException('Invalid AI response format');
    }

    const { mainTask, subtasks } = response as any;

    if (!mainTask || typeof mainTask !== 'object') {
      throw new BadRequestException('Missing or invalid mainTask in AI response');
    }

    if (!mainTask.title || typeof mainTask.title !== 'string') {
      throw new BadRequestException('Missing or invalid mainTask.title in AI response');
    }

    if (!mainTask.description || typeof mainTask.description !== 'string') {
      throw new BadRequestException('Missing or invalid mainTask.description in AI response');
    }

    if (!Array.isArray(subtasks)) {
      throw new BadRequestException('Missing or invalid subtasks array in AI response');
    }

    for (const [index, subtask] of subtasks.entries()) {
      if (!subtask || typeof subtask !== 'object') {
        throw new BadRequestException(`Invalid subtask at index ${index}`);
      }

      if (!subtask.title || typeof subtask.title !== 'string') {
        throw new BadRequestException(`Missing or invalid title in subtask at index ${index}`);
      }

      if (!subtask.description || typeof subtask.description !== 'string') {
        throw new BadRequestException(`Missing or invalid description in subtask at index ${index}`);
      }

      if (typeof subtask.priority !== 'number' || subtask.priority < 1 || subtask.priority > 10) {
        throw new BadRequestException(`Invalid priority in subtask at index ${index}. Must be a number between 1 and 10`);
      }
    }
  }

  async generateTasks(prompt: string, userId: number) {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a task planner that breaks down user requests into structured tasks. For each request, create a main task and subtasks with priorities (1-10, where 1 is highest priority). Format your response as JSON with the following structure: { mainTask: { title: string, description: string }, subtasks: [{ title: string, description: string, priority: number }] }"
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    if (!completion.choices[0].message.content) {
      throw new BadRequestException('Empty response from AI');
    }

    let response: unknown;
    try {
      response = JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      throw new BadRequestException('Invalid JSON in AI response');
    }

    this.validateAiResponse(response);

    // Create main task
    const mainTask = await this.prisma.task.create({
      data: {
        title: response.mainTask.title,
        description: response.mainTask.description,
        userId: userId,
        priority: 1, // Main task always has highest priority
      },
    });

    // Create subtasks
    for (const subtask of response.subtasks) {
      await this.prisma.task.create({
        data: {
          title: subtask.title,
          description: subtask.description,
          userId: userId,
          priority: subtask.priority,
          parentId: mainTask.id,
        },
      });
    }

    return mainTask;
  }
} 