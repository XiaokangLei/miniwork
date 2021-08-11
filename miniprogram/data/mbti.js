var mbti_question = [
  "哪一个答案最能贴切的描绘你一般的感受或行为？",
  //下面从表格的第1题开始，直至26题，index从1到26
  "当你要外出一整天，你会",
  "你认为自己是一个",
  "假如你是一位老师，你会选教",
  "你通常",
  "一般来说，你和哪些人比较合得来？",
  "你是否经常让",
  "处理许多事情上，你会喜欢",
  "你是否",
  "按照程序表做事，",
  "当你有一份特别的任务，你会喜欢",
  "在大多数情况下，你会选择",
  "大多数人会说你是一个",
  "你宁愿被人认为是一个",
  "聚会中，你的兴趣和注意通常追随",//根据《天资差异》做了修改
  "哪种学习方式于你较有效？",//根据《天资差异》做了修改
  "你倾向",
  "你比较喜欢",
  "你喜欢花很多的时间",
  "与很多人一起会",
  "你比较喜欢",
  "计划一个旅程时，你较喜欢",
  "在社交聚会中，你",
  "你通常",
  "哪些人会更吸引你？",
  "在日常工作中，你会",
  "你认为别人一般",//下面从对应表格的59题开始，直至78题，index从27到46
  "改变自身所处的环境以后，你在开始的时候会",//根据《天资差异》做了修改
  "在社交场合中，你经常会感到",
  "要做许多人也做的事，你比较喜欢",
  "你刚认识的朋友能否说出你的兴趣？",
  "你通常较喜欢的科目是",
  "哪个是较高的赞誉，或称许你为？",
  "你认为按照程序表做事",
  "和一群人在一起，你通常会选",
  "在社交聚会上，你会",
  "回答问题时，你争取做到",//根据《天资差异》做了修改
  "当你因为按规则办事 而触碰了朋友的些许利益时，你通常",//根据《天资差异》做了修改
  "你通常喜欢",
  "总的说来，要做一个大型作业时，你会选",
  "你给人的印象是",//根据《天资差异》做了修改
  "你会",
  "为乐趣而阅读时，你会",
  "你愿意替哪一类上司或者老师工作？",
  "你做事多数是",
  "你是否",
  "要作决定时，你认为比较重要的是",
  //下面是ans_idex删后为26-57、77-86题共用的问题，index为47
  "在下列每一对词语中，哪一个词语更合你心意？"
]

var mbti_ans = [//按照表格从上到下的顺序进行排序。修改了JP题目中的8题，EI改5题，SN改6题删3题，TF改5题删3题
//index=0
  { ans1: "计划你要做什么和在什么时候做", ans2: "说去就去", },
  { ans1: "较为随兴所至的人", ans2: "较为有条理的人", },
  { ans1: "以事实为主的课程", ans2: "涉及理论的课程", },
  { ans1: "与人容易混熟", ans2: "比较沉静或矜持", },
  { ans1: "富于想象力的人", ans2: "现实的人", },
//index=5
  { ans1: "你的情感支配你的理智", ans2: "你的理智主宰你的情感", },
  { ans1: "凭兴所至行事", ans2: "按照计划行事", },
  { ans1: "容易让人了解", ans2: "难于让人了解", },
  { ans1: "合你心意", ans2: "令你感到束缚", },
  { ans1: "开始前小心组织计划", ans2: "边做边找须做什么", },
  //index=10
  { ans1: "顺其自然", ans2: "制定计划", },//顺 字符错误
  { ans1: "重视自我隐私的人", ans2: "非常坦率开放的人", },
  { ans1: "实事求是的人", ans2: "机灵的人", },
  { ans1: "客观的人和物", ans2: "观点和见解", },//ei改
  { ans1: "悟性，对概念的掌握", ans2: "练习，对事物的熟悉", },//sn改
  //index=15
  { ans1: "重视感情多于逻辑", ans2: "重视逻辑多于感情", },
  { ans1: "坐观事情发展才作计划", ans2: "很早就作计划", },
  { ans1: "一个人独处", ans2: "和别人在一起", },
  { ans1: "令你活力倍增", ans2: "常常令你心力憔悴", },
  { ans1: "把约会、社交聚集等事情安排妥当", ans2: "无拘无束，看当时有什么好玩就做什么", },
  //index=20
  { ans1: "大部分的时间都是跟当天的感觉行事", ans2: "事先知道大部分的日子会做什么", },
  { ans1: "有时感到郁闷", ans2: "常常乐在其中", },
  { ans1: "和别人容易混熟", ans2: "趋向自处一隅", },
  { ans1: "一个思想敏捷及非常聪颖的人", ans2: "实事求是，具丰富常识的人", },
  { ans1: "颇为喜欢处理迫使你分秒必争的突发事件", ans2: "通常预先计划，以免要在压力下工作", },
  //index=25
  { ans1: "要花很长时间才认识你", ans2: "用很短的时间便认识你", },
  //index=26
  { ans1: "水深", ans2: "水浅", },//ei改
  { ans1: "条理性", ans2: "开放性", },//根据《天资差异》做了修改
  { ans1: "抽象", ans2: "具体", },
  { ans1: "温柔", ans2: "坚定", },
  { ans1: "思考", ans2: "感受", },
  { ans1: "事实", ans2: "意念", },
  { ans1: "好奇", ans2: "决断", },//根据《天资差异》做了修改
  { ans1: "行动", ans2: "思想", },//ei改
  { ans1: "文静", ans2: "外向", },
  { ans1: "系统性", ans2: "自发性", },//根据《天资差异》做了修改
  //index=36
  { ans1: "幻想", ans2: "观察", },//sn改
  { ans1: "敏感", ans2: "公正", },
  { ans1: "令人信服", ans2: "感人的", },
  { ans1: "快乐", ans2: "灵感", },//sn改
  { ans1: "开放性", ans2: "计划性", },//根据《天资差异》做了修改
  { ans1: "矜持", ans2: "健谈", },
  { ans1: "有条不紊", ans2: "不拘小节", },
  { ans1: "成就", ans2: "舒适", },//sn改
  { ans1: "同情怜悯", ans2: "远见", },
  { ans1: "利益", ans2: "祝福", },
  //index=46
  { ans1: "务实的", ans2: "理论的", },
  { ans1: "朋友不多", ans2: "朋友众多", },
  { ans1: "权威", ans2: "开放", },//根据《天资差异》做了修改
  { ans1: "机会和可能", ans2: "以事论事", },//sn改
  { ans1: "亲切的", ans2: "客观的", },
  { ans1: "管理", ans2: "社交", },//tf改
  { ans1: "制造", ans2: "发明", },//sn改
  { ans1: "隐藏", ans2: "表现", },//ei改
  //{ ans1: "理论", ans2: "事实", },//sn删！
  { ans1: "赞成", ans2: "质疑", },//tf改
  { ans1: "具分析力", ans2: "多愁善感", },
  { ans1: "合情合理", ans2: "令人着迷", },
  //index=57
  { ans1: "不会轻易抛弃习惯、标准和计划", ans2: "轻易让自己适应突然出现的变化", },//根据《天资差异》做了修改
  { ans1: "与某些人很难打开话匣儿和保持对话", ans2: "与多数人都能从容地长谈", },
  { ans1: "按照一般认可的方法去做", ans2: "构想一个自己的想法", },
  { ans1: "马上可以", ans2: "要待他们真正了解你之后才可以", },
  { ans1: "讲授概念和原则的", ans2: "讲授事实和数据的", },
  { ans1: "一贯感性的人", ans2: "一贯理性的人", },
  { ans1: "有时是需要的，但一般来说你不大喜欢这样做", ans2: "大多数情况下是有帮助而且是你喜欢做的", },
  { ans1: "跟你很熟悉的个别人谈话", ans2: "参与大伙的谈话", },
  { ans1: "是说话很多的一个", ans2: "让别人多说话", },
  { ans1: "正确", ans2: "不遗漏", },//根据《天资差异》做了修改
  { ans1: "公事公办", ans2: "稍作通融", },//tf改
  { ans1: "以不同的想法和方式完成某事", ans2: "涉及任何新的事情，直到新鲜感消失", },//根据《天资差异》做了修改
  { ans1: "边做边想该做什么", ans2: "首先把工作按步细分", },
  { ans1: "难以接近", ans2: "容易接触", },//ei改
  { ans1: "跟随一些证明有效的方法", ans2: "分析还有什么毛病，及针对尚未解决的难题", },
  { ans1: "喜欢奇特或创新的表达方式", ans2: "喜欢作者直话直说", },
  { ans1: "天性淳良，但常常前后不一的", ans2: "言词尖锐但永远合乎逻辑的", },
  { ans1: "按当天心情去做", ans2: "照拟好的计划去做", },
  { ans1: "可以和任何人按需求从容地交谈", ans2: "只是对某些人或在某种情况下才可以畅所欲言", },
  { ans1: "据事实衡量", ans2: "考虑他人的感受和意见", },
  { ans1: "想象的", ans2: "真实的", },
  { ans1: "情商", ans2: "理性", },//tf改
  { ans1: "公正", ans2: "有关怀心", },
  { ans1: "制作", ans2: "设计", },
  { ans1: "可能性", ans2: "必然性", },
  { ans1: "温柔", ans2: "力量", },
  { ans1: "真", ans2: "善", },//tf改
  //{ ans1: "制造", ans2: "创造", },//sn删！
  { ans1: "新颖的", ans2: "已知的", },
  { ans1: "同情", ans2: "分析", },
 //{ ans1: "坚持己见", ans2: "温柔有爱心", },//tf删！
  { ans1: "具体的", ans2: "抽象的", },
 //{ ans1: "全心投入", ans2: "有决心的", },//tf删！
  //{ ans1: "能干", ans2: "仁慈", },//tf删！
  //{ ans1: "实际", ans2: "创新", },//sn删！
]

var mbti = [//加分规则的数组。以第一行规则为例，type的字符为J表示主项是J，副项是P，btype为true表示如果选了ans1那么主项（J）值加1。
  { btype: "true", type: "J", },
  { btype: "false", type: "J", },
  { btype: "true", type: "S", },
  { btype: "true", type: "E", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "false", type: "J", },
  { btype: "true", type: "E", },
  { btype: "true", type: "J", },
  { btype: "true", type: "J", },
  { btype: "false", type: "J", },
  { btype: "false", type: "E", },
  { btype: "true", type: "S", },
  { btype: "true", type: "E", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "false", type: "J", },
  { btype: "false", type: "E", },
  { btype: "true", type: "E", },
  { btype: "true", type: "J", },
  { btype: "false", type: "J", },
  { btype: "false", type: "E", },
  { btype: "true", type: "E", },
  { btype: "false", type: "S", },
  { btype: "false", type: "J", },
  { btype: "false", type: "E", },
  { btype: "false", type: "E", },
  { btype: "true", type: "J", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "true", type: "T", },
  { btype: "true", type: "S", },
  { btype: "false", type: "J", },
  { btype: "true", type: "E", },
  { btype: "false", type: "E", },
  { btype: "true", type: "J", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "true", type: "T", },
  { btype: "true", type: "S", },
  { btype: "false", type: "J", },
  { btype: "false", type: "E", },
  { btype: "true", type: "J", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "true", type: "T", },
  { btype: "true", type: "S", },
  { btype: "false", type: "E", },
  { btype: "true", type: "J", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "true", type: "T", },
  { btype: "true", type: "S", },
  { btype: "false", type: "E", },
  //{ btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "true", type: "T", },
  { btype: "true", type: "S", },
  { btype: "true", type: "J", },
  { btype: "false", type: "E", },
  { btype: "true", type: "S", },
  { btype: "true", type: "E", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "false", type: "J", },
  { btype: "false", type: "E", },
  { btype: "true", type: "E", },
  { btype: "true", type: "J", },
  { btype: "true", type: "T", },
  { btype: "true", type: "J", },
  { btype: "false", type: "J", },
  { btype: "false", type: "E", },
  { btype: "true", type: "S", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "false", type: "J", },
  { btype: "true", type: "E", },
  { btype: "true", type: "T", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "true", type: "T", },
  { btype: "true", type: "S", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  { btype: "true", type: "T", },
  //{ btype: "true", type: "S", },
  { btype: "false", type: "S", },
  { btype: "false", type: "T", },
  //{ btype: "true", type: "T", },
  { btype: "true", type: "S", },
  //{ btype: "false", type: "T", },
  //{ btype: "true", type: "T", },
  //{ btype: "true", type: "S", },
]

module.exports.mbti_question = mbti_question;
module.exports.mbti_ans = mbti_ans;
module.exports.mbti = mbti;

/*在需要使用这些模块的文件中，使用 require(path) 将公共代码引入
var mbti = require('../../data/mbti.js')
Page({
  question: mbti.mbti_question,
  ans: mbti.mbti_ans,
})
require暂时不支持绝对路径
*/