import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
    it('Should return array of Heroes', () => {
        let service = new InMemoryDataService();
        let results  = service.createDb();
        expect(results.heroes.length > 0).toBeTruthy();
    });
});
