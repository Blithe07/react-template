import { PageRequestWithoutRecords } from "../types";

export interface XbListSearchParams extends PageRequestWithoutRecords{
    condition: string,
    fundCode: string,
    fileName: string,
    fileSource: string,
}