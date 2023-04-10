import { Module } from '@nestjs/common';
import { AwsService } from './awsService.service';
@Module({
  providers: [AwsService],
  exports:[AwsService]
  
})

export class AwsModule {}
