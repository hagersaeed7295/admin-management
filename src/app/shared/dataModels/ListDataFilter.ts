import { SortList } from './SortList';
import { UserStatus } from './user/UserStatus';
export class ListDataFilter {
    pageSize: number = 5;
    pageNumber: number = 0;
    totalItems: number = 0;
    searchText: string = '';
    sort: SortList = SortList.asc;
    filter = {} as {
        UserStatus: UserStatus,
    };
}
