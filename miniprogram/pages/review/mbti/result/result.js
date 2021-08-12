var g_mbtiEasyDes = [ //主导功能，辅助功能，优点，缺点，职业，代表人物
  ["内倾感觉（Si）习惯常规，维护旧有制度", "外倾思考（Te）逻辑性决定，压制冲动", "忠诚、内敛、刻苦、低调、踏实肯干、信任权威、遵守规则", "教条、传统、缺乏想象力", "公务员，副官", "弗洛伊德，巴菲特，尼克松，杰弗里·贝索"], //ISTJ
  ["内倾感觉（Si）细节敏感，坚持教化", "外倾情感（Fe）亲密联系，传播道德", "温柔、坚强、保护弱者、吃苦、最理想的老婆", "自我牺牲、极度现实、苦难的承受者", "监护人，秘书，图书管理员，医生，神职人员", "Rosa Parks"], //ISFJ
  ["内倾直觉（Ni）洞察力敏锐，有预见性", "外倾情感（Fe）感受他人需要，表达内心", "思想深刻、情绪强烈、灵魂深邃、文字天赋、促成他人和谐", "理想主义、执拗、神秘感、改造世界", "作家，心理学家，人文教育", "柏拉图，叔本华，荣格，甘地，陀思妥耶夫斯基"], //INFJ
  ["内倾直觉（Ni）洞察力，预见性，掌握事物本质和发展规律", "外倾思考（Te）在做决定的时候服从逻辑", "独立、自信而冷静、理性、淡泊名利、性格坚强、气质神秘、富有知性", "冷漠、高傲而自我、情商极低、内心封闭、特立独行、控制欲", "智囊", "乔治·纳什，扎克·伯格，马斯克，牛顿，特斯拉，萨特，马克思，阿西莫夫，卡梅隆，施瓦辛格"], //INTJ
  ["内倾思考（Ti）追求精确，寻求最优方案", "外倾感觉（Se）捕捉外部世界的各种变化", "沉稳、专注、微操强、胆大心细、学习能力强、理科拔群", "玩世不恭、冲动刺激、多动症", "运动员，手艺者", "李小龙，汤姆克鲁斯，Jack Dorsey"], //ISTP
  ["内倾情感（Fi）善恶分明，坚持信念", "外倾感觉（Se）热衷即兴，行动迅速", "与生俱来的美感友善、魅力、喜欢创作、完美主义", "少言、逃避、容易被欺负、自卑", "设计师，护理师", "乔纳森·艾维，迈克尔·杰克逊，Lady Gaga，Eminem"], //ISFP
  ["内倾情感（Fi）不断反思，保持人性平衡", "外倾直觉（Ne）自由联想，尝试各种可能性", "善解人意、想象力丰富、神秘的美感、善于医治心灵的创伤", "多愁善感、对现实失望、敏感、希望世界和平、超级理想主义", "文学，艺术，宗教，心理咨询", "卢梭，莎士比亚，梵高，约翰·列侬，奥威尔，村上春树"], //INFP
  ["内倾思考（Ti）通过模型解决问题", "外倾直觉（Ne）自由组合想法，喜欢改造环境", "分析现象、寻求原理、独立思考、冷静、淡薄、高IQ", "冷漠、远离现实、不拘小节", "数学家，科学家，建筑师", "爱因斯坦，居里夫人，Larry Page，哈耶克"], //INTP
  ["外倾感觉（Se）热衷于即兴，个性鲜明", "内倾思考（Ti）对逻辑性敏感，追求精确", "魅力、会说话、随机应变、圆滑、谈判高手", "忘恩负义、撒谎、不择手段、利己主义", "销售，主持人，经纪人，活动策划", "丘吉尔，巴顿，麦克阿瑟，海明威，小布什"], //ESTP
  ["外倾感觉（Se）对物质世界的敏锐察觉", "内倾情感（Fi）善恶分明，保持和谐", "乐观、实用主义、喜欢交际、大度、活跃、机智、随机应变", "厌烦教育、不考虑后果、容易被诱惑", "演员，销售，幼教", "克林顿，肯尼迪，查理德·布兰森，劳伦斯·埃里森"], //ESFP
  ["外倾直觉（Ne）自由联想，意识流，潜意识", "内倾情感（Fi）价值观协调，明辨对错", "浪漫主义、抽象、不受约束、朋友广泛", "长不大、脾气火爆、精力分散", "记者，剧作家，动画制作人", "马克·吐温，切·格瓦拉，卡扎菲，沃特·迪士尼"], //ENFP
  ["外倾直觉（Ne）探索背后的意义，想法抽象", "内倾思考（Ti）善于演绎推理，重视辩证", "活泼、聪明、创意、喜欢智力竞赛、解决复杂问题", "对情感不敏感、脱离实际", "发明家，创造者", "达芬奇，乔恩·斯图尔特，乔布斯，沃兹"], //ENTP
  ["外倾思考（Te）建立流程控制事物的变化", "内倾感觉（Si）收集数据和经验指导行动", "强势、乐观、发号施令、信任权威、重视道德", "墨守成规、铁石心肠、不善聆听、大老爷们儿", "CEO，军官", "鲍尔默，汤姆·克兰西，萨达姆"], //ESTJ
  ["外倾情感（Fe）寻求社会联系，满足他人", "内倾感觉（Si）回忆历史，建立信任", "热情、慷慨、社交能力强、强势、传统、左右逢源、团队性强", "小圈子主义、势利、投人所好", "社会工作者，公务员，推销员", "惠特尼·休斯顿，维多利亚·贝克汉姆，钢铁大王卡内基"], //ESFJ
  ["外倾情感（Fe）感受他人需要，建立亲密联系", "内倾直觉（Ni）具备洞察力、预见性", "浪漫、人文、语言天赋、说服力、相信神、发觉潜能", "移情、不现实、教导欲", "教育工作者", "戈尔巴乔夫，歌德，里根，阿拉法特，摩根·弗里曼"], //ENFJ
  ["外倾思考（Te）直线思维，战略管理", "内倾直觉（Ni）具备洞察力、预见性", "控制力、批判思维、把控弱点、自尊心强、顽强坚定", "压迫感、高高在上、做作、伪装、毫不留情", "老板，元帅，总裁", "拿破仑，凯撒，撒切尔，斯大林"] //ENTJ
]

function mbti_id(str) { //获取MBTI类型的index
  var table = ["ISTJ", "ISFJ", "INFJ", "INTJ",
    "ISTP", "ISFP", "INFP", "INTP",
    "ESTP", "ESFP", "ENFP", "ENTP",
    "ESTJ", "ESFJ", "ENFJ", "ENTJ"
  ]
  for (var i = 0; i < 16; i++) {
    if (str == table[i]) {
      return i
    }
  }
}
var app = getApp()

Page({

  data: {
    red_str: "点击右上角三个点，可以分享到朋友圈了~",
    mbtiDesArr: [
      //ISTJ:
      ["1.严肃、安静，藉由集中心志全力投入及可被信赖获致成功。",
        "2.行事务实、有序、实际、逻辑、真实及可信赖。",
        "3.十分留意且乐于使工作、居家、生活均有良好组织及有序。",
        "4.负责任，会照设定来作出决策，且不畏阻挠与闲言，坚定为之。",
        "5.重视传统与忠诚。",
      ],
      //ISFJ:
      ["1.安静、和善、负责任且有良心。", "2.行事尽责投入。",
        "3.安定性高，常居项目工作或团体之安定力量。",
        "4.愿投入、吃苦及力求精确。",
        "5.兴趣通常不在于科技方面。对细节事务有耐心。",
        "6.忠诚、考虑周到、知性且会关切他人感受。",
        "7.致力于创构有序及和谐的工作与家庭环境。",
      ],
      //INFJ:
      ["1.因为坚忍、创意及必须达成的意图而能成功。",
        "2.会在工作中投注最大的努力。",
        "3.默默诚挚及用心地关切他人。",
        "4.因坚守原则而受敬重。",
        "5.提出造福大众利益的明确远景而为人所尊敬与追随。",
        "6.追求创见、关系及物质财物的意义及关联。",
        "7.想了解什么能激励别人，对他人具洞察力。",
        "8.具正能量且坚信其价值观。",
        "9.有组织且果断地履行其愿景。",
      ],
      //INTJ:
      ["1.崇尚努力、智慧和思考，具强大动力与本意来达成目的与创意。",
        "2.富有想象却果断，雄心壮志但注重隐私，充满好奇但不愿浪费精力。",
        "3.对所承负职务，具良好能力于策划工作并完成。",
        "4.固执、具怀疑心、挑剔性、独立性，对专业水准及绩效要求高。",
        "5.对于自己花时间学习过的领域聪明又自信，渴望真理和深度。",
      ],
      //ISTP:
      ["1.冷静旁观者，安静、留余地、有弹性，会以无偏见的好奇心与未预期的幽默观察与分析。",
        "2.有兴趣于探寻原因及效果、技术事件如何运作，使用逻辑的原理组构事实，重视效能。",
        "3.擅长于掌握问题核心及找出解决方式。",
        "4.分析成事的缘由且能实时由大量资料中找出实际问题的核心。",
      ],
      //ISFP:
      ["1.羞怯、安宁、和善、敏感、行事谦虚。",
        "2.喜于避开争论，不对他人强加已见或价值观。",
        "3.无意于领导却常是忠诚的追随者。",
        "4.办事不急躁，安于现状，无意于以过度的急切或努力破坏现况，且非成果导向。",
        "5.喜欢有自有的空间及照自订的时程办事。",
      ],
      //INFP:
      ["1.安静观察者，具理想性与对其价值观及重要之人具忠诚心。",
        "2.希望外在生活形态与内在价值观相吻合。",
        "3.具好奇心且很快能看出机会所在。常担负开发创意的触媒者。",
        "4.除非价值观受侵犯，行事会具弹性、适应力高且承受力强。",
        "5.具想了解及发展他人潜能的企图。",
        "6.对所处境遇及占有不太在意。",
        "7.具适应力、有弹性，除非价值观受到威胁。",
      ],
      //INTP:
      ["1.安静、自持、弹性及具适应力。",
        "2.特别喜爱追求理论与科学事理。",
        "3.习于以逻辑及分析来解决问题，是问题解决者。",
        "4.最有兴趣于创意事务及特定工作，对聚会与闲聊无大兴趣。",
        "5.追求可发挥个人强烈兴趣的生涯。",
        "6.追求发展对有兴趣事务之逻辑解释。",
      ],
      // ESTP:
      ["1.擅长现场实时解决问题，是解决问题者。",
        "2.喜欢办事并乐于其中过程。",
        "3.倾向于喜好技术事务及运动，交结同好友人。",
        "4.具适应性、容忍度、务实性；投注心力于工作会很快具成效。",
        "5.不喜欢冗长概念及理论。",
        "6.最专精于可操作、处理、分解或组合的真实事务。",
      ],
      // ESFP:
      ["1.外向、和善、接受性、乐于与他人分享喜乐。",
        "2.喜欢与他人一起行动且促成事件发生，在学习时亦然。",
        "3.知晓事件未来的发展并会热列参与。",
        "5.最擅长于人际相处能力及具备完备常识，很有弹性，能立即适应他人与环境。",
        "6.对生命、人、物质享受的热爱者。",
      ],
      //ENFP:
      ["1.充满热忱、活力充沛、聪明的、富想象力的，视生命充满机会但期能得自他人肯定与支持。",
        "2.几乎能达成所有有兴趣的事。",
        "3.对难题很快就有对策并能对有困难的人施予援手。",
        "4.依赖能改善的能力而无须预做规划准备。",
        "5.为达目的，常能找出强制自己为之的理由。",
        "6.即兴执行者。",
      ],
      //ENTP: 
      ["1.反应快、聪明、长于多样事务。",
        "2.具激励伙伴、敏捷及直言不讳。",
        "3.会为了有趣 对问题的两面加予争辩。",
        "4.对解决新颖的及挑战性的问题富有策略，但会轻忽或厌烦经常的任务与细节。",
        "5.兴趣多元，易倾向于转移至新生的兴趣。",
        "6.对所想要的会有技巧地找出逻辑的理由。",
      ],
      //ESTJ: 
      ["1.务实、真实、事实倾向，具企业或技术天份。",
        "2.不喜欢抽象理论；最喜欢学习可立即运用事理。",
        "3.喜好组织与管理活动且专注以最有效率方式行事以达致成效。",
        "4.具决断力、关注细节且很快作出决策，是优秀的行政者。",
        "5.会忽略他人感受。",
        "6.喜作领导者或企业主管。",
      ],
      //ESFJ:
      ["1.诚挚、爱说话、合作性高、受欢迎，天生的合作者及活跃的组织成员。",
        "2.重和谐且长于创造和谐。",
        "3.常做对他人有益事务。",
        "4.给予鼓励及称许会有更佳工作成效。",
        "5.最有兴趣于会直接及有形影响人们生活的事务。",
        "6.喜欢与他人共事去精确且准时地完成工作。",
      ],
      //ENFJ:
      ["1.热忱、易感应及负责任的，具能鼓励他人的领导风格。",
        "2.对别人所想或希求会表达真正关切且切实用心去处理。",
        "3.能怡然且技巧性地带领团体讨论或演示文稿提案。",
        "4.爱交际、受欢迎及富同情心。",
        "5.对称许及批评很在意。",
        "6.喜欢带引别人且能使别人或团体发挥潜能。",
      ],
      //ENTJ:
      ["1.坦诚、具决策力的活动领导者。",
        "2.长于发展与实施广泛的系统以解决组织的问题。",
        "3.专精于具内涵与智能的谈话如对公众演讲。",
        "4.乐于经常吸收新知且能广开信息管道。",
        "5.易生过度自信，会强于表达自已创见。",
        "6.喜于长程策划及目标设定。",
      ],
    ],
    mbtiCN: ["公务员", "监护人", "作  家", "策  划",
      "魔术师", "作曲家", "诗  人", "建筑师",
      "传销员", "表演家", "梦想家", "发明家",
      "大管家", "庄  主", "导  师", "领  袖"
    ],
    mbtiEN: ["Inspector", "Protector", "Counselor", "Mastermind/Scientist",
      "Operator/Instrumentor", "Composer/Artist", "Healer/Tutor", "Architect/Designer",
      "Promotor", "Performer/Demonstrator", "Champion/Advocate/Motivator", "Invertor",
      "Supervisor", "Provider/Seller", "Teacher", "Fieldmarshall/Mobilizer"
    ],
    isDone: false,
    //possible_mbti: [],
  },

  onLoad: function (options) {
    var mbtiRes = ""
    var red_str = "点击右上角三个点，分享好友或者朋友圈~"
    // 如果是朋友圈转发的带参数的页面
    if (options.E) {
      red_str = "↓↓↓这是你好友的MBTI测试结果"
      var e = Number(options.E)
      var s = Number(options.S)
      var t = Number(options.T)
      var j = Number(options.J)
      wx.setStorageSync('E', e)
      wx.setStorageSync('S', s)
      wx.setStorageSync('T', t)
      wx.setStorageSync('J', j)
      if (e > 0.5) {
        mbtiRes += 'E'
      } else {
        mbtiRes += 'I'
      }
      if (s > 0.5) {
        mbtiRes += 'S'
      } else {
        mbtiRes += 'N'
      }
      if (t > 0.5) {
        mbtiRes += 'T'
      } else {
        mbtiRes += 'F'
      }
      if (j > 0.5) {
        mbtiRes += 'J'
      } else {
        mbtiRes += 'P'
      }
      wx.setStorageSync('MBTI', mbtiRes)
    }

    // 正常进入页面 
    else {
      var that = this
      // app.getUserInfo(function (userInfo) {
      //   //更新用户数据
      //   that.setData({
      //     userInfo: userInfo
      //   })
      // })
      var _mbtiRes = wx.getStorageSync('MBTI')
      if (this.data.isDone == false) { //有两种可能：
        if (_mbtiRes == undefined || _mbtiRes == '') {
          return; //如果还没测试过，跳出
        } else {
          mbtiRes = _mbtiRes
        }
      }
    }

    //设置data
    var id = mbti_id(mbtiRes)
    var mbtiEasyDes = g_mbtiEasyDes[id]
    this.setData({
      mbtiRes: mbtiRes,
      mbtiEasyDes: mbtiEasyDes,
      id: id,
      red_str: red_str,
      isDone: true //用户已经测试过，做标记
    })
  },

  //计算倾向度的百分比
  postp: function (n) {
    return 2 * (n - 0.5)
  },
  negtp: function (n) {
    return 2 * (0.5 - n)
  },

  //绘图错误捕捉：
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  //没有测试过时，开始测试
  goToTest: function () {
    wx.redirectTo({
      url: '../test/test',
    })
  },

  //查看好友们的类型（此按钮现在被屏蔽）
  goToIntr: function () {
    wx.showActionSheet({
      itemList: [
        "查看谁测试过",
        "分享到微信…",
      ],
      success: function (res) {
        var id = res.tapIndex
        switch (id) {
          case 0:
            //弹出确认信息窗口，提示将被好友可见
            wx.showModal({
              title: "提示",
              content: "查看其他人MBTI类型测试结果的同时，别人也会查看到你。是否继续？",
              cancelText: "还是算了",
              cancelColor: "#aaa",
              confirmText: "没事继续",
              confirmColor: "#000000",
              success: function (res) {
                if (res.confirm) {
                  //显示好友MBTI表，并向里填入用户的信息
                  wx.showToast({
                    title: "功能尚未开发",
                    icon: "loading"
                  })
                }
              }
            })
            break
          case 1:
            //调用分享到微信API
            // wx.showToast({
            //   title: "功能尚未开发",
            //   icon: "loading"
            // })
            console.log("that=" + that) //此处代码不灵
            that.onShareAppMessage()
            break
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  //更多MBTI相关知识（弹出一串按钮，对应方法为wx.navigateTo不同页面:
  goToMore: function () {
    var that = this
    wx.showActionSheet({
      itemList: [
        "查看其他类型",
        "书籍网站推荐",
      ],
      success: function (res) {
        var id = res.tapIndex
        switch (id) {
          case 1:
            wx.navigateTo({
              url: '../more/rec',
            })
            break
          case 0:
            wx.navigateTo({
              url: '../more/more',
            })
        }
      },
    })
  },

  //请联系制作者
  connectAuthor: function () {
    wx.showModal({
      title: '索要书籍',
      content: '请联系作者邮箱：445395697@qq.com',
      showCancel: false
    })
  },

  onShow: function () {
    if (this.data.isDone == false) {
      return
    }

    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('Canvas1')

    //创建文字(会被挡住,IDE模拟器的bug)
    context.setFontSize(12)
    context.fillText('外向', 10, 42)
    context.fillText('实感', 10, 84)
    context.fillText('思考', 10, 126)
    context.fillText('判断', 10, 168)
    context.fillText('内向', 265, 42)
    context.fillText('直觉', 265, 84)
    context.fillText('情感', 265, 126)
    context.fillText('认知', 265, 168)

    //设置线性渐变
    const gradient1 = context.createLinearGradient(0, 0, 200, 0) //需指定起点终点坐标
    gradient1.addColorStop(0, '#8FBC8F')
    gradient1.addColorStop(1, '#f8f8f8') //背景灰色
    const gradient2 = context.createLinearGradient(100, 0, 300, 0)
    gradient2.addColorStop(0, '#f8f8f8')
    gradient2.addColorStop(1, '#8FBC8F')
    //用渐变填充矩形，控制矩形的长度
    for (var i = 0; i < 4; i++) {
      var c;
      var len = 0
      switch (i) {
        case 0:
          c = 'E';
          break;
        case 1:
          c = 'S';
          break;
        case 2:
          c = 'T';
          break;
        case 3:
          c = 'J';
      }
      var b = wx.getStorageSync(c)
      var x = 0.0
      if (b > 0.5) { //矩形在左边
        x = this.postp(b)
        context.setFillStyle(gradient1)
        len = 113 * x
        context.fillRect(150 - len, 42 * i + 21, len, 32)
      } else { //矩形在右边
        x = this.negtp(b)
        context.setFillStyle(gradient2)
        len = 113 * x
        context.fillRect(150, 42 * i + 21, len, 32)
      }
    }

    //画矩形来表示画布边界、槽的边界
    context.setStrokeStyle("#000000")
    context.setLineWidth(6)
    context.rect(0, 0, 300, 200)
    context.stroke() //fill()和stroke()方法将矩形真正画到canvas中
    context.setStrokeStyle("#8FBC8F")
    context.setLineWidth(1)
    context.rect(37, 21, 113, 32);
    context.stroke()
    context.rect(37, 63, 113, 32);
    context.stroke()
    context.rect(37, 105, 113, 32);
    context.stroke()
    context.rect(37, 147, 113, 32);
    context.stroke()
    context.rect(150, 21, 113, 32);
    context.stroke()
    context.rect(150, 63, 113, 32);
    context.stroke()
    context.rect(150, 105, 113, 32);
    context.stroke()
    context.rect(150, 147, 113, 32);
    context.stroke()

    context.draw()
  },

  onReady: function () {},

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  /**
   * 发送给朋友
   */
  onShareAppMessage: function () {
    return {
      title: 'MBTI性格测试',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline: function () {
    var title, query
    if (this.data.isDone) {
      var e = wx.getStorageSync('E')
      var s = wx.getStorageSync('S')
      var t = wx.getStorageSync('T')
      var j = wx.getStorageSync('J')
      title = '我的MBTI类型是' + this.data.mbtiRes + '（' + this.data.mbtiCN[this.data.id] + ' 型）'
      query = 'E=' + e.toFixed(4) + '&S=' + s.toFixed(4) + '&T=' + t.toFixed(4) + '&J=' + j.toFixed(4)
      console.log(query)
      return {
        title: title,
        query: query
      }
    } else {
      title = '来和我一起做MBTI测试吧~'
      return {
        title: title
      }
    }
  }
})