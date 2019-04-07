<template>
  <div class="home">
    <el-progress :stroke-width="2" :show-text="false" :percentage="percentage"></el-progress>
    <h1>This is home page</h1>
    <h3>language: {{$t('loading')}}</h3>
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
        <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-select v-model="value" placeholder="请选择" value="" style="width: 100%;">
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
    <el-row class="row">
      <el-table
        :data="tableData"
        border>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
        value2: null,
        radio: null,
        value: null,
        percentage: 0,
        tableData: [{
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

</style>
