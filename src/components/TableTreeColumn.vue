<template>
  <el-table-column :prop="prop" v-bind="$attrs">
    <template slot-scope="scope">
      <span @click.prevent="toggleHandle(scope.$index, scope.row)"
            :class="{'cursor-pr':scope.row[childKey].length}"
            :style="{ 'padding-left': ((scope.row._level || 0) * 10) + 'px' }">
        <i :class="[ scope.row._expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right' ]"
           :style="{ 'visibility': hasChild(scope.row) ? 'visible' : 'hidden' }"></i>
        {{ scope.row[prop] }}
      </span>
    </template>
  </el-table-column>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/4
   */

  export default {
    name: 'TableTreeColumn',
    props: {
      menuData: {
        type: Array,
        default: () => []
      },
      prop: {
        type: String
      },
      treeKey: {
        type: String,
        default: 'id'
      },
      parentKey: {
        type: String,
        default: 'parentId'
      },
      childKey: {
        type: String,
        default: 'children'
      }
    },
    methods: {
      // 是否有子节点
      hasChild (row) {
        return Array.isArray(row[this.childKey]) && row[this.childKey].length
      },
      // 切换处理
      toggleHandle (index, row) {
        if (!this.hasChild(row)) return false
        let data = [...this.menuData]
        data[index]._expanded = !data[index]._expanded
        if (data[index]._expanded) {
          row[this.childKey].forEach(item => {
            item._level = (row._level || 0) + 1
            item._expanded = false
          })
          data = data.splice(0, index + 1).concat(row[this.childKey]).concat(data)
        } else {
          data = this.removeChildNode(data, row[this.treeKey])
        }
        this.$emit('updateMenuData', data)
      },
      // 移除子节点
      removeChildNode (data, pId) {
        pId = Array.isArray(pId) ? pId : [pId]
        if (!pId.length) return data
        let pIds = []
        for (let i = data.length; i--;) {
          if (~pId.indexOf(data[i][this.parentKey]) && !~pId.indexOf(data[i][this.treeKey])) {
            pIds.push(data.splice(i, 1)[0][this.treeKey])
          }
        }
        return this.removeChildNode(data, pIds)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
