<template>
  <div class="home">
    <el-progress :stroke-width="2" :show-text="false" :percentage="percentage"></el-progress>
    <h3>language: {{$t('lang')}}</h3>
    <el-row class="row">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <el-row class="row">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>
    <el-row class="row">
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>
    <el-row class="row">
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-date-picker type="date" :placeholder="$t('el.datepicker.selectDate')" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-input :placeholder="$t('el.transfer.filterPlaceholder')" prefix-icon="el-icon-search"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-select v-model="value" :placeholder="$t('el.select.placeholder')" value="" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-checkbox checked>备选项</el-checkbox>
        <el-switch v-model="value2"></el-switch>
      </el-col>
    </el-row>
    <el-row class="block-col-2 row">
      <el-col :span="8">
        <el-date-picker
          v-model="value6"
          type="daterange"
          :start-placeholder="$t('el.datepicker.startDate')"
          :end-placeholder="$t('el.datepicker.endDate')">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <span class="demonstration">hover 激活</span>
        <el-dropdown placement="bottom-start">
          <span class="el-dropdown-link el-button--text">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check-outline">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4">
        <span class="demonstration">click 激活</span>
        <el-dropdown trigger="click" placement="bottom">
          <span class="el-dropdown-link el-button--text">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check-outline">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-table
        :data="tableData"
        border>
        <el-table-column
          prop="date"
          :label="$t('module.date')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('module.name')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          :label="$t('module.address')">
        </el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" align="center" width="150">
          <template>
            <el-button class="pd0" type="text">{{ $t('update') }}</el-button>
            <el-button class="pd0" type="text">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        value6: null,
        value2: null,
        radio: null,
        value: null,
        percentage: 0,
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }, {
            value: '1',
            label: '黄金糕'
          }, {
            value: '2',
            label: '双皮奶'
          }, {
            value: '3',
            label: '蚵仔煎'
          }, {
            value: '4',
            label: '龙须面'
          }, {
            value: '5',
            label: '北京烤鸭'
          }
        ]
      }
    },
    created () {
      this.percentage = 0
      console.log('home')
    },
    mounted () {
      this.percentage = 100
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    padding: 4px;
  }

  .row + .row {
    margin-top: 20px;
  }

  .el-dropdown-link {
    cursor: pointer;
    /*color: #409EFF;*/
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
