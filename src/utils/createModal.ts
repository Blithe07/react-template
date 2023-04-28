import { ModalType } from "@/api/types"

export class ModalInfo {
    // 是否显示
    visible = false
    // 标题
    title = ''
    // 类型
    type: ModalType = 'create'
}   