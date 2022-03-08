import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsyncContextModule } from '@nestjs-steroids/async-context';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { EntitySubscriber } from './base-entity/entity-subscriber';
import { GlobalExceptionsFilter } from './helpers/global-exception-filter';
import { UsersModule } from './users/users.module';
import { AutomapperModule } from 'nestjsx-automapper';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'mail/templates'),
    }),
    AutomapperModule.withMapper(),
    AsyncContextModule.forRoot(),
    UsersModule,
    MailModule,
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
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    EntitySubscriber,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
