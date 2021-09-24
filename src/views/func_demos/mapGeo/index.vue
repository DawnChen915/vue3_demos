<template>
  <div class="bigScreen">
    <div class="title">监测综合展示</div>
    <div class="up">
      <div class="up_left">
        <div class="name">市场成员注册数统计</div>
        <div style="height: 80px">
          <div style="width: 45%; float: left">
            <li><span>分布式电力用户</span></li>
            <div class="number">{{ members.powerUserCount }}</div>
          </div>
          <div style="width: 45%; float: right">
            <li><span>分布式电厂</span></li>
            <div class="number">{{ members.powerCompanyCount }}</div>
          </div>
        </div>

        <div class="pie" id="pie"></div>
        <div class="box">
          <div class="box_item">
            风电(电厂)
            <p class="energy">{{ members.windUser.count }}</p>
            <p class="percent" style="color: #54ace5">
              {{ members.windUser.rate }}
            </p>
          </div>
          <div class="box_item">
            光伏(电厂)
            <p class="energy">{{ members.lightUser.count }}</p>
            <p class="percent" style="color: #9b5eea">
              {{ members.lightUser.rate }}
            </p>
          </div>
          <div class="box_item">
            其他(电厂)
            <p class="energy">{{ members.otherUser.count }}</p>
            <p class="percent" style="color: #e3a54c">
              {{ members.otherUser.rate }}
            </p>
          </div>
        </div>
      </div>
      <div class="up_center">
        <div class="name">市场化交易</div>
        <!-- <div id="map"></div> -->
        <e-chart :option="mapOption" id="map" />
      </div>
      <div class="up_right">
        <div class="name">电力交易排行榜</div>
        <div class="rank">
          <table>
            <tr v-for="(item, index) in rankList" :key="index">
              <td style="width: 30px">
                <img
                  :src="image(index)"
                  alt=""
                  v-if="index < 3"
                  style="padding-top: 12px"
                />
                <span v-else>{{ image(index) }}</span>
              </td>
              <td>
                <el-tooltip
                  :content="item.energyTotal + 'MWh'"
                  placement="bottom"
                  effect="light"
                >
                  <span>{{ item.membersName }}</span>
                </el-tooltip>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="low">
      <e-chart
        :option="barOption"
        style="height: 300px; z-index: 9999"
      ></e-chart>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { draw } from "./Donut3D";
import EChart from "../../../components/EChart.vue";
export default {
  components: { EChart },
  data() {
    return {
      market: {
        tradeTotal: "",
        userTotal: "",
      },
      members: {
        powerCompanyCount: "210",
        powerUserCount: "100",
        windUser: {
          count: "51",
          rate: "51%",
        },
        lightUser: {
          count: "26",
          rate: "26%",
        },
        otherUser: {
          count: "23",
          rate: "23%",
        },
      },
      salesData: [
        {
          label: "Basic",
          color: "#2f7ed8",
        },
        {
          label: "Plus",
          color: "#0d233a",
        },
        {
          label: "Lite",
          color: "#8bbc21",
        },
      ],
      color: ["#54ACE5", "#9B5EEA", "#E3A54C", "#34D4B8"],
      pieData: [
        { value: 51, color: "#54ACE5" },
        { value: 26, color: "#9B5EEA" },
        { value: 23, color: "#E3A54C" },
      ],
      rankList: [{ membersName: "某某电厂", energyTotal: 123 }],
      barOption: {
        title: {
          text: "交易电量统计",
          textStyle: {
            color: "#51fdff",
          },
          right: "50%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        color: ["#54ACE5", "#9B5EEA", "#E3A54C", "#34D4B8"],
        legend: {
          data: ["河北", "陕西", "江苏", "安徽"],
          right: "30%",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            show: true,
            nameTextStyle: {
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            show: true,
            nameTextStyle: {
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
            type: "value",
          },
        ],
        series: [
          {
            name: "河北",
            type: "bar",
            barWidth: "10%",
            data: [123, 111, 121, 144, 123, 111, 123, 111, 121, 144, 123, 131],
            itemStyle: {
              color: "#54ACE5",
            },
          },
          {
            name: "陕西",
            type: "bar",
            barWidth: "10%",
            data: [123, 111, 121, 144, 123, 111, 123, 111, 121, 144, 123, 111],
            itemStyle: {
              color: "#9B5EEA",
            },
          },
          {
            name: "江苏",
            type: "bar",
            barWidth: "10%",
            data: [103, 101, 101, 104, 103, 101, 103, 101, 101, 104, 103, 101],
            itemStyle: {
              color: "#E3A54C",
            },
          },
          {
            name: "安徽",
            type: "bar",
            barWidth: "10%",
            data: [223, 211, 221, 244, 153, 211, 223, 211, 221, 244, 153, 211],
            itemStyle: {
              color: "#34D4B8",
            },
          },
        ],
      },
      mapOption: {
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            if (params.data) {
              return (
                params.name +
                "<br/>" +
                "交易数量：" +
                params.data.tradeTotal +
                "<br/>" +
                "注册数量：" +
                params.data.registerTotal
              );
            } else {
              return params.name + "<br/>" + "无数据";
            }
          },
        },
        toolbox: {
          show: false,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        geo: {
          type: "map",
          map: "china",
          aspectScale: 0.75,
          label: {
            emphasis: {
              show: false,
            },
          },
          zoom: 1.2,
          regions: [
            {
              name: "南海诸岛",
              value: 0,
            },
            {
              name: "四川",
              value: 100,
            },
          ],
          itemStyle: {
            normal: {
              borderColor: "rgba(147, 235, 248, 0)",
              borderWidth: 0.5,
              areaColor: {
                x: 1000,
                y: 1000,
                x2: 1000,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#69c5d8", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#126caf", // 50% 处的颜色
                  },
                ],
                global: true, // 缺省为 false
              },
              opacity: 1,
            },
            emphasis: {
              show: false,
              areaColor: "#69c5d8",
            },
          },
          z: 2,
        },
        series: [
          {
            type: "map",
            map: "china",
            tooltip: {
              show: true,
            },
            label: {
              show: false,
              emphasis: {
                show: true,
                color: "#fff",
              },
            },
            zoom: 1.2,
            top: "9%",
            data: [
              {
                name: "河北省",
                tradeTotal: 100,
                registerTotal: 200,
                itemStyle: {
                  areaColor: "#54ACE5",
                },
              },
              {
                name: "陕西省",
                tradeTotal: 100,
                registerTotal: 200,
                itemStyle: {
                  areaColor: "#9B5EEA",
                },
              },
              {
                name: "江苏省",
                tradeTotal: 100,
                registerTotal: 200,
                itemStyle: {
                  areaColor: "#E3A54C",
                },
              },
              {
                name: "安徽省",
                tradeTotal: 100,
                registerTotal: 200,
                itemStyle: {
                  areaColor: "#34D4B8",
                },
              },
            ],
            aspectScale: 0.75,
            roam: false,
            itemStyle: {
              normal: {
                borderColor: "#3481D4",
                borderWidth: 0.8,
                areaColor: {
                  type: "linear-gradient",
                  x: 1000,
                  y: 600,
                  x2: 1000,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#274d68", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#09132c", // 50% 处的颜色
                    },
                  ],
                  global: true, // 缺省为 false
                },
              },
              emphasis: {
                show: true,
                areaColor: "#274d62",
              },
            },
            zlevel: 1,
          },
        ],
      },
    };
  },

  mounted() {
    this.drawPie();
  },
  methods: {
    drawPie() {
      var width = 400,
        height = 300;
      d3.select("#pie")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("id", "quotesDonut");
      draw("quotesDonut", this.pieData, 200, 150, 130, 70, 30, 0);
    },
    image(key) {
      switch (key) {
        case 0:
          return require("../../../assets/images/no1.png");
        case 1:
          return require("../../../assets/images/no2.png");
        case 2:
          return require("../../../assets/images/no3.png");
        default:
          return `${key + 1}、`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bigScreen {
  width: 1920px;
  height: 1080px;
  background-image: url("../../../assets/images/background-img.png");
  overflow: visible;
  .title {
    padding-top: 10px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    font-weight: 500;
  }
  .up {
    display: flex;
    width: 100%;
    height: 54%;
    margin-top: 3%;
    list-style-type: square;
    .up_left {
      margin-left: 4%;
      width: 22%;
      li {
        color: #00a2ed;
        list-style-type: square;
        font-size: 30px;
        line-height: 20px;
        span {
          margin-left: -20px;
          color: #fff;
          font-size: 18px;
          line-height: 30px;
          font-weight: 500;
          margin-bottom: 5px;
        }
      }
      .number {
        height: 40px;
        width: 166px;
        background-image: url("../../../assets/images/number.png");
        text-align: center;
        font-size: 22px;
        color: #51fdff;
        line-height: 40px;
      }
      .pie {
        height: 300px;
      }
      .box {
        display: flex;
        height: 120px;
        width: 400px;
        justify-content: space-around;
        .box_item {
          text-align: center;
          width: 120px;
          background-image: url("../../../assets/images/box.png");
          height: 110px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
          .energy {
            margin: 0;
            line-height: 18px;
          }
          .percent {
            margin-top: 15px;
            font-size: 26px;
            font-family: Impact;
            font-weight: 400;
            line-height: 21px;
          }
          p {
            margin: 0;
          }
        }
      }
    }
    .up_center {
      margin: 0 1%;
      width: 46%;
      #map {
        height: 500px;
      }
    }
    .up_right {
      margin-right: 4%;
      width: 22%;
      .rank {
        height: 500px;
        font-size: 18px;
        padding-left: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #ffffff;
        word-spacing: 2px;
        line-height: 40px;
      }
    }
  }
  .low {
    height: 300px;
    margin: 1% 3%;
  }
}
.name {
  padding: 20px 0;
  text-align: center;
  color: #51fdff;
  font-size: 18px;
  font-weight: 550;
  font-family: PingFang SC;
  letter-spacing: 2px;
}
</style>
