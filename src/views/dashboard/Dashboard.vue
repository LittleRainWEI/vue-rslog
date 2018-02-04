<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="24">
        <div class="grid-title">
          <span class="font-title">查询</span>
        </div>
        <div class="grid-content">
          <el-form :inline="true" :model="formTime">
            <el-row>
              <el-col :span="7" :offset="2">
                <el-form-item label="开始时间：">
                  <el-date-picker v-model="formTime.startTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="结束时间：">
                  <el-date-picker v-model="formTime.endTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item style="padding-left: 12px;">
                  <el-button type="success" @click="onQuery">查询</el-button>
                  <el-button type="warning" @click="onReset">重置</el-button>
                  <el-button type="info" @click="onExport">导出</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-title">
          <span class="font-title">运营商DNS访问量趋势图</span>
        </div>
        <div class="grid-content">
          <div id="line"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import fetch from '@/utils/fetch'
import { formatDate } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题

export default {
  name: 'dashboard',
  data() {
    return {
      formTime: {
        startTime: '',
        endTime: ''
      },
      chart: null,
      option: {},
    }
  },
  mounted() {
    this.initChart()
    this.onReset()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('line'), 'macarons');
      this.option = {
        title: {
          text: '运营商DNS访问量趋势图',
          left: '40%'
        },
        tooltip: {
          trigger: 'axis',
          position: function(point, params, dom) {
            var pointPst = point[0] - 60;
            return [pointPst, '10%'];
          },
          formatter: function(params) {
            var relVal = params[0].name;
            relVal += '<br/>访问量'
            for (var i = 0, l = params.length; i < l; i++) {
              relVal += '<br/>'
                + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'
                + params[i].color
                + '"></span>'
                + params[i].seriesName
                + ' : '
                + params[i].value;
            }
            return relVal;
          }
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: [],
          axisLine: {
            lineStyle: {
              color: '#000000',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#333',
            },
          },
        },
        yAxis: {
          name: '访问量',
          type: 'value',
          nameLocation: 'end',
          nameGap: 15,
          nameTextStyle: {
            color: '#333',
          },
          axisLabel: {
            formatter: '{value}',
          },
          axisLine: {
            lineStyle: {
              color: '#000000',
            },
          },
        },
        series: [{
          name: '访问量',
          type: 'line',
          data: []
        }]
      };

      this.chart.setOption(this.option);
      window.addEventListener("resize", function() {
        echarts.getInstanceByDom(document.getElementById('line')).resize();
      });
    },
    onQuery() {
      console.log(this.formTime.startTime);
      console.log(this.formTime.endTime);

      // 向后台获取数据，刷新图表内容
      fetch({
        url: '/api/dashboard/getDefThrendData',
        method: 'get',
        params: {
          startTime: formatDate(this.formTime.startTime.getTime()),
          endTime: formatDate(this.formTime.endTime.getTime()),
        }
      }).then(response => {
        const data = response.data
        console.log(data);
        this.option.xAxis.data = data.xAxisData;
        this.option.series[0].data = data.seriesData;
        this.chart.setOption(this.option);


      }).catch(error => {
        console.log(error);
      })

    },
    onReset() {
      this.formTime.startTime = new Date((new Date()).getTime() - 24 * 3600 * 1000);
      this.formTime.endTime = new Date();
      this.onQuery();
    },
    onExport() {
      
    }
  }
}
</script>

<style>
.grid-title {
  height: 26px;
  margin: 0 50px 0 50px;
  padding-left: 10px;
  padding-top: 3px;
  border-radius: 4px;
  background-color: #D9D9D9;
}

.grid-content {
  border-radius: 4px;
  margin: 0 50px 15px 50px;
  padding: 12px 12px 12px 12px;
  background: #F7F7F7;
}

.font-title {
  font-size: 13px;
  font-weight: bold;
  color: #555555;
}

.el-form-item {
  margin-bottom: 0px;
}

.el-button+.el-button {
  margin-left: 0px;
}

#line {
  height: 100%;
  width: 100%;
  min-width: 120px;
  min-height: 350px;
  margin: 20px auto;
}
</style>
