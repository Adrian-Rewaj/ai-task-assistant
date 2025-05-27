import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // globalny moduł, żeby nie trzeba było go importować wszędzie
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
