import {search} from "../../app/actions/SearchBudget";

describe("Search budget", () => {

  it("2018-04-15 to 2018-06-15", () => {
    search("2018-04-15", "2018-06-15").should.be.eql(62);
  })

  it("2018-04-01 to 2018-04-15", () => {
    search("2018-04-01", "2018-04-15").should.be.eql(15);
  })

  it("2018-04-01 to 2018-04-30", () => {
    search("2018-04-01", "2018-04-30").should.be.eql(30);
  })

  it("2018-05-01 to 2018-07-31", () => {
    search("2018-05-01", "2018-07-31").should.be.eql(61);
  })

  it("2018-05-01 to 2018-05-01", () => {
    search("2018-05-01", "2018-05-01").should.be.eql(1);
  })

  it("2018-05-01 to 2019-05-01", () => {
    search("2018-05-01", "2019-05-01").should.be.eql(61);
  })
})
