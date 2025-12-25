import { reactive, ref, onMounted } from 'vue'

type Api = {
  queryPage?: (...args: any[]) => Promise<any>
  add?: (body: any) => Promise<any>
  update?: (body: any) => Promise<any>
  del?: (payload: any) => Promise<any>
}

type FormSchemaItem = { prop: string; label?: string; type?: string; placeholder?: string }

export function curd(api: Api = {}, options: any = {}) {
  const idField: string = options.idField || 'id'
  const initialItem = options.initialItem || {}
  const mapToServer = options.mapToServer || ((p: any) => p)
  const formSchema: FormSchemaItem[] = options.formSchema || []

  // 对话框数据
  const item = reactive({ ...initialItem }) as any
  const dialogShow = ref(false)
  const dialogTitle = ref('新增')
  const searchForm = reactive(
    formSchema.reduce((acc: any, cur: FormSchemaItem) => {
      acc[cur.prop] = ''
      return acc
    }, {}),
  ) as any

  // 列表与分页
  const list = ref<any[]>([])
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  // 列宽
  const colWidths = reactive(options.colWidths || {}) as Record<string, string>

  // 测量文本宽度
  function textWidth(text: string | number | null | undefined, font?: string) {
    const can = document.createElement('canvas').getContext('2d')!
    can.font =
      font ||
      `${getComputedStyle(document.body).fontSize} ${getComputedStyle(document.body).fontFamily}`
    return can.measureText((text ?? '') as string).width
  }

  // 计算列宽函数
  function columnWidth(
    rows: any[] = [],
    labels: Record<string, string> = {},
    padding = 32,
    minWidthParam: Record<string, number> = {},
    maxWidthParam: Record<string, number> = {},
  ) {
    const font = `${getComputedStyle(document.body).fontSize} ${getComputedStyle(document.body).fontFamily}`
    Object.keys(labels).forEach((prop) => {
      let localMax = textWidth(labels[prop], font)
      for (const r of rows) {
        const txt = r && r[prop] != null ? String(r[prop]) : ''
        const w = textWidth(txt, font)
        if (w > localMax) localMax = w
      }
      const final = Math.ceil(
        Math.min(
          maxWidthParam[prop] || 300,
          Math.max(minWidthParam[prop] || 50, localMax + padding),
        ),
      )
      colWidths[prop] = `${final}px`
    })
  }

  // 清空搜索
  const clear = () => {
    formSchema.forEach((f) => {
      ;(searchForm as any)[f.prop] = ''
    })
    currentPage.value = 1
    search()
  }

  // 查询
  const search = async () => {
    const params = {
      ...searchForm,
      page: currentPage.value,
      size: pageSize.value,
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
    console.debug('curd.search params:', params)
    try {
      const res = await api.queryPage?.(params)
      console.debug('curd.search raw response:', res)

      // 1. 智能解包
      const body = (res && res.data && typeof res.data === 'object' && 'code' in res.data) 
        ? res.data 
        : res

      console.debug('curd.search processed body:', body)

      // 2. 增加对 code === 1 的支持
      if (body && (body.code === 200 || body.code === 0 || body.code === 1)) {
        
        // 3. 获取数据节点
        const dataNode = body.data

        // 4. 提取列表
        const rawList = Array.isArray(dataNode) 
          ? dataNode 
          : (dataNode?.rows || dataNode?.records || dataNode?.list || [])
        
        list.value = Array.isArray(rawList) ? rawList : []

        // 5. 提取总数
        total.value = dataNode?.total || dataNode?.totalRow || dataNode?.count || dataNode?.totalCount || 0
        
        columnWidth(
          list.value,
          options.labels || {},
          options.padding,
          options.minWidth,
          options.maxWidth,
        )
      } else {
        console.warn('curd.search failed: code is not 200/0/1', body)
        list.value = []
        total.value = 0
        columnWidth([], options.labels || {}, options.padding, options.minWidth, options.maxWidth)
      }
    } catch (err) {
      console.error('curd.search network/error:', err)
      list.value = []
      total.value = 0
      columnWidth([], options.labels || {}, options.padding, options.minWidth, options.maxWidth)
    }
  }

  // 新增
  const addItem = () => {
    dialogTitle.value = `新增${options.title || ''}`
    Object.assign(item, JSON.parse(JSON.stringify(initialItem)))
    dialogShow.value = true
  }

  // 编辑
  const updateItem = (row: any) => {
    dialogTitle.value = `编辑${options.title || ''}`
    Object.assign(item, { ...row })
    dialogShow.value = true
  }

  // 保存
  const saveItem = async () => {
    const payload = JSON.parse(JSON.stringify(item))
    const body = mapToServer(payload)
    try {
      let res
      if ((item as any)[idField]) res = await api.update?.(body)
      else {
        delete (body as any)[idField]
        res = await api.add?.(body)
      }
      return res
    } catch (e) {
      console.error('curd.saveItem error:', e)
      throw e
    }
  }

  // 删除
  const deleteItem = async (row: any) => {
    const payload = { id: row[idField] ?? row.id ?? row._id }
    return api.del?.(payload)
  }

  // 分页处理
  const handleSizeChange = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
    search()
  }
  const handleCurrentChange = (val: number) => {
    currentPage.value = val
    search()
  }

  // 钩子函数
  onMounted(() => {
    if (typeof api.queryPage === 'function') search()
    else console.warn('curd: api.queryPage is not a function, skip initial search')
  })

  return {
    // 参数
    item,
    dialogShow,
    dialogTitle,
    searchForm,
    formSchema,
    list,
    currentPage,
    pageSize,
    total,
    colWidths,
    // 函数
    clear,
    search,
    addItem,
    updateItem,
    saveItem,
    deleteItem,
    cancel: () => (dialogShow.value = false),
    handleSizeChange,
    handleCurrentChange,
    columnWidth,
    textWidth,
  } as any
}

export const useCrud = curd
