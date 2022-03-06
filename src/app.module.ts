import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { EntitySubscriber } from './base-entity/entity-subscriber';
import { GlobalExceptionsFilter } from './helpers/global-exception-filter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    EntitySubscriber,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
