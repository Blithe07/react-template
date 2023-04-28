import { createSlice } from "@reduxjs/toolkit";

type reportInfo = {
    type: 'fund' | 'chapter',
    // 不确定是否可合并fundInfo和chapterInfo
    fundInfo: {
        title: string,
        key: string | number,
        diffNum?: number,
        status?: string,
    }
    chapterInfo: {
        title: string,
        key: string | number,
        status?: string,
    }
}

const reportSlice = createSlice({
    name: 'report',
    initialState: {
        type: 'fund',
        fundInfo: {},
        chapterInfo: {}
    } as reportInfo,
    reducers: {
        setReportType: (state, { payload }: { payload: reportInfo['type'] }) => {
            state.type = payload
        },
        setFundInfo: (state, { payload }: { payload: reportInfo['fundInfo'] }) => {
            state.fundInfo = payload
        },
        setChapterInfo: (state, { payload }: { payload: reportInfo['chapterInfo'] }) => {
            state.chapterInfo = payload
        }
    }
})

export const { setReportType, setFundInfo, setChapterInfo } = reportSlice.actions

export default reportSlice.reducer