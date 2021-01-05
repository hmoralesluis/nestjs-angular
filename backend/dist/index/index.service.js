"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch = require("elasticsearch");
let IndexService = class IndexService {
    constructor() {
        this.esclient = new elasticsearch.Client({
            host: '145.239.88.219:9200',
        });
        this.esclient.ping({ requestTimeout: 3000 })
            .catch(err => {
            throw new common_1.HttpException({
                status: 'error',
                message: 'Unable to reach Elasticsearch cluster'
            }, 500);
        });
    }
    async bulkInsert(abilities) {
        const bulk = [];
        abilities.forEach(ability => {
            bulk.push({
                index: { _index: 'pokemons', _type: 'abilities' }
            });
            bulk.push(ability);
        });
        return await this.esclient.bulk({
            body: bulk,
            index: 'pokemons',
            type: 'abilities'
        })
            .then(res => ({ status: 'success', data: res }))
            .catch(err => { throw new common_1.HttpException(err, 500); });
    }
    async searchIndex(q) {
        const body = {
            size: 200,
            from: 0,
            query: {
                match: {
                    url: q,
                },
            },
        };
        return await this.esclient.search({ index: 'pokemons', body, q })
            .then(res => res.hits.hits)
            .catch(err => { throw new common_1.HttpException(err, 500); });
    }
};
IndexService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], IndexService);
exports.IndexService = IndexService;
//# sourceMappingURL=index.service.js.map