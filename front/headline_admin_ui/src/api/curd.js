import { reactive, ref, onMounted } from 'vue'

// 通用增删改查组合函数
export function curd(api = {}, options = {}) {
  const idField = options.idField || 'id'
  const initialItem = options.initialItem || {}
  const mapToServer = options.mapToServer || ((p) => p)
  const formSchema = options.formSchema || []

  // 对话框数据
  const item = reactive({ ...initialItem })
  const dialogShow = ref(false)
  const dialogTitle = ref('新增')
  const searchForm = reactive(
    formSchema.reduce((acc, cur) => {
      acc[cur.prop] = ''
      return acc
    }, {}),
  )

  // 列表与分页
  const list = ref([])
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  // 列宽
  const colWidths = reactive(options.colWidths || {})

  // 测量文本宽度
  function textWidth(text, font) {
    const can = document.createElement('canvas').getContext('2d')
    can.font =
      font ||
      `${getComputedStyle(document.body).fontSize} ${getComputedStyle(document.body).fontFamily}`
    return can.measureText(text || '').width
  }

  // 计算列宽函数
  function columnWidth(
    rows = [],
    labels = {},
    padding = 32,
    minWidthParam = {},
    maxWidthParam = {},
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
      searchForm[f.prop] = ''
    })
    currentPage.value = 1
    search()
  }

  // 查询
  const search = async () => {
    const args = [...Object.values(searchForm), currentPage.value, pageSize.value]
    console.debug('curd.search args:', args)
    try {
      const res = await api.queryPage?.(...args)
      console.debug('curd.search response:', res)
      if (res && res.code) {
        list.value = res.data.rows || []
        total.value = res.data.total || 0
        columnWidth(
          list.value,
          options.labels || {},
          options.padding,
          options.minWidth,
          options.maxWidth,
        )
      } else {
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
  const updateItem = (row) => {
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
      if (item[idField]) res = await api.update?.(body)
      else {
        delete body[idField]
        res = await api.add?.(body)
      }
      return res
    } catch (e) {
      console.error('curd.saveItem error:', e)
      throw e
    }
  }

  // 删除
  const deleteItem = async (row) => {
    const payload = { id: row[idField] ?? row.id ?? row._id }
    return api.del?.(payload)
  }

  // 分页处理
  const handleSizeChange = (val) => {
    pageSize.value = val
    currentPage.value = 1
    search()
  }
  const handleCurrentChange = (val) => {
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
  }
}
export const useCrud = curd
