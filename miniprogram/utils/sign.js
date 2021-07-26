var yang_date = {

    bulidCal: function (iYear, iMonth, that, signday) {
        var that = that;
        var aMonth = new Array();
        aMonth[0] = new Array(7);
        aMonth[1] = new Array(7);
        aMonth[2] = new Array(7);
        aMonth[3] = new Array(7);
        aMonth[4] = new Array(7);
        aMonth[5] = new Array(7);
        var dCalDate = new Date(iYear, iMonth - 1, 1);
        var iDayOfFirst = dCalDate.getDay();
        var curMonthDays = new Date(dCalDate.getFullYear(), (dCalDate.getMonth() + 1), 0).getDate();
        console.log("本月共有 " + curMonthDays + " 天");
        console.log("本月第一天周 " + iDayOfFirst);
        var iDaysInMonth = (iMonth, iYear);
        var iVarDate = 1;
        var d, w;
        for (d = iDayOfFirst; d < 7; d++) {
            console.log(signday);
            if (signday.indexOf(iVarDate) > -1) {
                //console.log(111);
                aMonth[0][d] = {
                    signday: "is",
                    normalday: iVarDate,
                };
            } else {
                //console.log(22);
                aMonth[0][d] = {
                    signday: "nois",
                    normalday: iVarDate,
                };
            }
            iVarDate++;
        }
        //处理每月第一天出现位置
        for (w = 1; w < 6; w++) {
            for (d = 0; d < 7; d++) {
                if (iVarDate <= iDaysInMonth) {
                    if (signday.indexOf(iVarDate) > -1) {
                        //console.log(111);
                        aMonth[w][d] = {
                            signday: "is",
                            normalday: iVarDate,
                        };
                    } else {
                        //console.log(22);
                        aMonth[w][d] = {
                            signday: "nois",
                            normalday: iVarDate,
                        };
                    }
                    if (iVarDate == curMonthDays) {
                        console.log(aMonth);
                        that.setData({
                            signDays: aMonth,
                        });
                        return aMonth;
                    } else {
                        iVarDate++;
                    }
                }
            }
        }
        console.log(aMonth);
        return aMonth;
    },

};
module.exports = {
    yang_date: yang_date
}