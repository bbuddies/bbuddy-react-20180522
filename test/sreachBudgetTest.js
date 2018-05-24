import {getBudgetByDate} from "../app/sreachBudget";
import moment from "moment"

describe('Tttt', () => {
  it('today to  2018-06-15', () => {
    getBudgetByDate(moment().format("YYYYMMDD"), 20180615); // 當天到 20180615
  })

  it("2018-04-01 to 2018-04-01", () => {
    getBudgetByDate(20180401, 20180401).should.be.eql(1);
  })

  it("2018-04-01 to 2018-04-15", () => {
    getBudgetByDate(20180401, 20180415).should.be.eql(15);
  })
  it("2018-04-14 to 2018-04-15", () => {
    getBudgetByDate(20180414, 20180415).should.be.eql(2);
  })

  it("2018-04-15 to 2018-06-15", () => {
    getBudgetByDate(20180415, 20180615).should.be.eql(62);
  })

  it("2018-05-01 to 2018-07-31", () => {
    getBudgetByDate(20180501, 20180731).should.be.eql(61);
  })

  it("2018-01-01 to 2018-12-01", () => {
    getBudgetByDate(20180101, 20181201).should.be.eql(91);
  })

  it("other year 2017-04-01 to 2018-04-30", () => {
    getBudgetByDate(20170401, 20180430).should.be.eql(60);
  })

  it("Error date", () => {
    getBudgetByDate(20190401, 20180415);
  })

})
