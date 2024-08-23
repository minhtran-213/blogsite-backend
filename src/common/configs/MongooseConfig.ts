import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private configService: ConfigService) {

    }

    createMongooseOptions(): Promise<MongooseModuleOptions> | MongooseModuleOptions {
        return {
            uri: this.configService.get<string>('MONGO_URL')
        }
    }
}