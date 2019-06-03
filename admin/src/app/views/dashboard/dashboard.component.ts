import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { HttpService } from "../../http.service";
import { GetanalyticsService } from "./getanalytics.service";
import { promise } from "protractor";
import { resolve } from "path";
import { chart } from "chart.js";

@Component({
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public radioModel: string = "Month";
  public analyticsUrl: string = "http://localhost:3000/pageviews/Get_Analytics";

  constructor(
    private _myservice: HttpService,
    private _anlytics: GetanalyticsService
  ) {}
  // mainChart

  public mainChartElements = 27;
  public data2: any = new Array();
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: "Current"
    },
    {
      data: this.mainChartData2,
      label: "Previous"
    },
    {
      data: this.mainChartData3,
      label: "BEP"
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: "index",
      position: "nearest",
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return {
            backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor
          };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value: any) {
              return value.charAt(0);
            }
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(50 / 5),
            max: 50
          }
        }
      ]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    {
      // brandInfo
      backgroundColor: hexToRgba(getStyle("--info"), 10),
      borderColor: getStyle("--info"),
      pointHoverBackgroundColor: "#fff"
    },
    {
      // brandSuccess
      backgroundColor: "transparent",
      borderColor: getStyle("--success"),
      pointHoverBackgroundColor: "#fff"
    },
    {
      // brandDanger
      backgroundColor: "transparent",
      borderColor: getStyle("--danger"),
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = "line";

  async populateCharts() {
    //let data2: any = new Array();
    await this._myservice
      .realizarHttpPost(this.analyticsUrl, {})
      .subscribe(results => {
        //let mainctdata =res.map()

        this.data2 = results["result"];
        console.log(this.data2);
        return this.data2;
      });
    //console.log(this.data2);
  }
  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
    //generate random values for mainChart
    this.data2 = this._anlytics.getChartData({});
    console.log(this.data2);
    // var promise = this.populateCharts();
    // promise.finally(() => {
    //   this.data2.forEach(element => {
    //     this.mainChartData1.push(element);
    //   });
    //   console.log(this.data2);
    // });
    for (let i = 0; i <= 30; i++) {
      this.mainChartData1.push(this.random(0, 15));
      //this.mainChartData2.push(this.random(80, 100));
      // this.mainChartData3.push(65);
    }

    // this.populateCharts();
    //console.log(this.mainChartData1);
  }
}
