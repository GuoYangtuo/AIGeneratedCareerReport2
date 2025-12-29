// 示例数据，用于测试和演示
import type { 
  StudentInfo, 
  AssessmentData, 
  FamilyInfo, 
  SpecialCircumstances, 
  ConsultantInfo,
  GeneratedReportContent
} from '@/types/report';

export const sampleStudentInfo: StudentInfo = {
  name: '张明轩',
  grade: '高二',
  currentPerformance: '中等',
  targetDegree: '本科',
  school: '上海市第一中学',
  major: '计算机科学'
};

export const sampleAssessmentData: AssessmentData = {
  personalityType: '战略规划型',
  personalityTraits: {
    strengths: [
      '具有卓越的逻辑分析能力，善于从复杂信息中提取关键要素',
      '拥有强烈的目标导向意识，能够制定并执行长期规划',
      '独立思考能力强，不易受他人意见左右',
      '追求效率和完美，对工作质量有高标准要求'
    ],
    weaknesses: [
      '有时过于追求完美，可能导致决策时间过长',
      '在团队协作中可能表现得过于独立，需加强沟通',
      '对情绪化的人际关系处理经验不足'
    ]
  },
  thinkingPatterns: [
    '善于从全局角度思考问题，能够预见潜在风险和机会',
    '倾向于用数据和逻辑支撑决策，而非依赖直觉',
    '具有强烈的创新意识，喜欢探索新方法解决问题'
  ],
  interestTendency: ['科学研究', '数据分析', '商业管理', '金融投资'],
  subjectStrengths: ['数学', '物理', '英语']
};

export const sampleFamilyInfo: FamilyInfo = {
  structure: '双亲家庭，父母+学生',
  parentOccupation: '父亲 - 金融行业高管，母亲 - 大学教授',
  budget: '50-100万',
  resources: [
    '金融行业资源',
    '教育行业资源',
    '海外留学资源'
  ],
  demands: {
    educationGoal: '冲刺985/211院校，备选香港或新加坡名校',
    careerExpectation: '进入互联网大厂或金融机构核心岗位',
    locationPreference: '上海、北京、深圳等一线城市'
  }
};

export const sampleSpecialCircumstances: SpecialCircumstances = {
  hasAcademicIssues: true,
  academicIssuesDetail: '英语成绩略有波动，需要加强口语和写作能力',
  hasSpecialPlanning: true,
  specialPlanningDetail: '曾获得省级数学竞赛二等奖，对编程有浓厚兴趣',
  lacksResources: true,
  lacksResourcesDetail: '缺乏科研项目经历和大厂实习机会'
};

export const sampleConsultantInfo: ConsultantInfo = {
  name: '李老师',
  phone: '13800138000',
  wechat: '13800138000'
};

// 示例生成内容（用于无API时的演示）
export const sampleGeneratedContent: GeneratedReportContent = {
  personalityAnalysis: {
    coreType: '战略规划型 - 具有卓越的逻辑分析能力和长远战略眼光',
    strengths: [
      '卓越的逻辑分析能力：能够从复杂信息中快速提取关键要素，进行系统化分析',
      '强烈的目标导向意识：善于制定长期规划并持续执行，不轻易放弃目标',
      '独立思考与决策能力：不盲从他人意见，能够基于事实做出理性判断',
      '高标准的质量追求：对工作成果有严格要求，追求卓越和完美'
    ],
    weaknesses: [
      '决策时可能过于谨慎：追求完美可能导致错过最佳时机',
      '团队协作需要加强：独立性强可能影响与他人的协作效率',
      '情感表达相对含蓄：在需要情感支持的场合可能显得不够温暖'
    ],
    summary: [
      '您是典型的战略思维者，善于从全局角度审视问题，预见潜在的风险和机会',
      '您倾向于用数据和逻辑来支撑决策，这使您在分析性工作中表现出色',
      '您具有强烈的创新意识和探索精神，喜欢挑战传统思维，寻找更优解决方案'
    ]
  },
  careerMatches: [
    {
      direction: '金融投资领域',
      positions: ['量化分析师', '投资银行分析师', '风险管理经理', '基金经理', '金融科技产品经理'],
      matchReason: '适配逻辑分析与战略规划能力'
    },
    {
      direction: '科技互联网领域',
      positions: ['产品经理', '数据科学家', '算法工程师', '技术战略顾问'],
      matchReason: '适配创新思维与技术兴趣'
    },
    {
      direction: '咨询管理领域',
      positions: ['战略咨询顾问', '管理咨询师', '商业分析师', '企业战略规划师'],
      matchReason: '适配全局思维与分析能力'
    }
  ],
  developmentPaths: [
    {
      educationDirection: '冲刺清华北大计算机专业，备选复旦交大',
      careerGoal: '进入顶级互联网公司担任产品/技术核心岗位',
      resourceMatch: '利用父亲金融行业资源进行背景提升，母亲教育资源获取推荐信'
    },
    {
      educationDirection: '申请香港大学/香港科技大学商科或数据科学专业',
      careerGoal: '进入国际投行或顶级咨询公司',
      resourceMatch: '利用海外留学资源进行申请准备，金融资源获取实习机会'
    },
    {
      educationDirection: '国内985高校（复旦、交大）+ 海外硕士深造',
      careerGoal: '金融科技领域创业或高管',
      resourceMatch: '综合利用家庭教育和金融资源，打造复合型竞争力'
    }
  ],
  careerAdvice: [
    {
      field: '金融科技',
      shortTermPath: '大学期间学习计算机+金融双学位，积累互联网金融实习经验',
      longTermPath: '成为金融科技领域专家，可选择头部公司核心岗位或自主创业'
    },
    {
      field: '互联网产品',
      shortTermPath: '掌握产品设计和数据分析技能，进入大厂担任产品经理',
      longTermPath: '成长为产品总监或VP，主导战略级产品规划'
    },
    {
      field: '战略咨询',
      shortTermPath: '进入MBB等顶级咨询公司，积累行业洞察和方法论',
      longTermPath: '成为行业专家或合伙人，或转型企业高管'
    }
  ],
  familyCooperationAdvice: [
    '建议家长充分利用金融行业资源，为学生争取优质实习机会，尤其是投行、基金等核心岗位的暑期实习项目，这将极大提升学生的申请竞争力和职业起点。',
    '建议母亲利用教育行业人脉，帮助学生联系高校教授进行科研项目合作，获取高质量推荐信和科研经历，这对申请顶尖院校非常重要。'
  ],
  educationProjects: [
    {
      name: '香港副学士转学士项目',
      tuitionRange: '8-12万/年',
      advantages: ['入学门槛相对较低', '可转入香港八大名校', '国际化教育环境'],
      disadvantages: ['需要额外2年时间', '转学竞争激烈'],
      recommendIndex: 4,
      consultingFeeRange: '3-5万',
      category: '升学类',
      principle: '先入读副学士课程，成绩优异者可转入大学本科三年级',
      requirements: '高考成绩400分以上，英语100分以上',
      timeline: '每年1-5月申请，9月入学',
      process: '递交申请材料 - 面试测评 - 发放录取 - 办理签证 - 入学'
    },
    {
      name: '3+1国际本科项目',
      tuitionRange: '6-10万/年',
      advantages: ['节省留学成本', '国内外双文凭', '语言过渡期充足'],
      disadvantages: ['部分合作院校排名一般', '需要良好的自律性'],
      recommendIndex: 3,
      consultingFeeRange: '2-4万',
      category: '升学类',
      principle: '国内3年+国外1年，获得国内外双学历',
      requirements: '高考成绩本科线，英语成绩良好',
      timeline: '每年3-8月申请，9月入学',
      process: '咨询报名 - 入学测试 - 录取缴费 - 开学报到'
    },
    {
      name: '985高校强基计划',
      tuitionRange: '0.5-1万/年',
      advantages: ['学费低廉', '直接进入顶尖高校', '本硕博连读机会'],
      disadvantages: ['竞争激烈', '专业选择受限'],
      recommendIndex: 5,
      consultingFeeRange: '5-8万',
      category: '升学类',
      principle: '针对基础学科的拔尖人才选拔计划',
      requirements: '高考成绩省排名前1%，竞赛获奖优先',
      timeline: '每年4月报名，6月校测',
      process: '网上报名 - 高考 - 校测 - 综合录取'
    },
    {
      name: '四大会计师事务所暑期实习',
      tuitionRange: '无需学费',
      advantages: ['顶级背景提升', '转正机会大', '专业技能培训'],
      disadvantages: ['竞争激烈', '工作强度大'],
      recommendIndex: 5,
      consultingFeeRange: '2-4万',
      category: '背景提升类',
      principle: '通过内推获得四大暑期实习机会',
      requirements: '211以上院校，英语六级500+',
      timeline: '每年3-4月申请，7-8月实习',
      process: '简历投递 - 笔试 - 多轮面试 - 发放offer'
    },
    {
      name: '名校教授1v1科研项目',
      tuitionRange: '3-6万/期',
      advantages: ['获得教授推荐信', '发表论文机会', '申请加分项'],
      disadvantages: ['费用较高', '需要投入较多时间'],
      recommendIndex: 4,
      consultingFeeRange: '1-2万',
      category: '背景提升类',
      principle: '与名校教授进行线上或线下科研合作',
      requirements: '对科研有兴趣，学习能力强',
      timeline: '全年可报名，周期2-4个月',
      process: '匹配导师 - 开题研究 - 论文撰写 - 结项评估'
    },
    {
      name: '成人本科学历提升',
      tuitionRange: '1-3万/年',
      advantages: ['入学门槛低', '学习时间灵活', '国家承认学历'],
      disadvantages: ['社会认可度相对较低', '需要较强自律性'],
      recommendIndex: 2,
      consultingFeeRange: '0.5-1万',
      category: '兜底类',
      principle: '通过成人高考获得本科学历',
      requirements: '高中或同等学历',
      timeline: '每年8-9月报名，10月考试',
      process: '网上报名 - 现场确认 - 参加考试 - 录取入学'
    },
    {
      name: '专科+硕士直通项目',
      tuitionRange: '10-20万/全程',
      advantages: ['快速获得硕士学历', '海外名校机会', '跳过本科阶段'],
      disadvantages: ['费用较高', '需要语言成绩'],
      recommendIndex: 3,
      consultingFeeRange: '3-5万',
      category: '兜底类',
      principle: '专科毕业后直接申请海外硕士',
      requirements: '专科学历，雅思5.5以上',
      timeline: '提前1年准备，每年9月入学',
      process: '语言准备 - 材料准备 - 递交申请 - 获得录取 - 签证入学'
    }
  ],
  timeline: [
    {
      stage: '高二上学期',
      time: '9月-次年1月',
      tasks: ['确定目标院校和专业方向', '强化数学物理学科优势', '开始雅思/托福基础学习'],
      notes: '重点夯实学科基础，为高三冲刺做准备'
    },
    {
      stage: '高二下学期',
      time: '2月-6月',
      tasks: ['参加学科竞赛', '完成60学时志愿者服务', '首次雅思考试冲刺6分'],
      notes: '竞赛和志愿服务证明务必保留'
    },
    {
      stage: '高二暑假',
      time: '7月-8月',
      tasks: ['参加名校夏令营/研学项目', '开始科研项目', '集中备考雅思冲刺6.5分'],
      notes: '暑假是背景提升的黄金时期'
    },
    {
      stage: '高三上学期',
      time: '9月-次年1月',
      tasks: ['全力备战高考', '完成强基计划报名', '准备香港院校申请材料'],
      notes: '学业为主，申请材料利用周末时间准备'
    },
    {
      stage: '高三下学期',
      time: '2月-6月',
      tasks: ['高考冲刺', '参加强基计划校测', '香港院校面试'],
      notes: '保持良好心态，合理分配精力'
    },
    {
      stage: '高考后',
      time: '6月-8月',
      tasks: ['志愿填报', '确定录取结果', '办理入学手续或签证'],
      notes: '根据录取结果选择最优方案'
    },
    {
      stage: '大一',
      time: '9月-次年6月',
      tasks: ['适应大学学习', '积极参加社团活动', '寻找科研机会', '规划暑期实习'],
      notes: '大一成绩对后续发展非常重要'
    },
    {
      stage: '大二',
      time: '9月-次年6月',
      tasks: ['保持高GPA', '参与科研项目', '获取实习经验', '准备GRE/GMAT'],
      notes: '这一年是能力积累的关键期'
    },
    {
      stage: '大三',
      time: '9月-次年6月',
      tasks: ['完成核心课程', '争取顶级实习', '准备研究生申请材料'],
      notes: '开始明确是保研、考研还是出国'
    },
    {
      stage: '大四',
      time: '9月-次年6月',
      tasks: ['完成毕业论文', '参加秋招/研究生复试', '做好职业起步准备'],
      notes: '无论升学还是就业，都要全力以赴'
    }
  ],
  supplyChainProjects: [
    {
      category: '语言培训',
      name: '雅思1v1保分冲刺班',
      description: '资深外教一对一辅导，针对性提升听说读写四项能力',
      advantage: '保分承诺，不达标退款'
    },
    {
      category: '语言培训',
      name: '托福110分精品小班',
      description: '6人精品小班，真题演练+技巧提升',
      advantage: '名师授课，提分效果显著'
    },
    {
      category: '语言培训',
      name: '多邻国速成培训',
      description: '针对Duolingo考试的专项培训',
      advantage: '考试周期短，出分快'
    },
    {
      category: '游学研学',
      name: '剑桥大学暑期学术营',
      description: '为期3周的剑桥大学沉浸式学习体验',
      advantage: '获得剑桥官方结业证书'
    },
    {
      category: '游学研学',
      name: '清北复交研学营',
      description: '走进顶尖学府，体验大学生活，与优秀学子交流',
      advantage: '激发学习动力，明确目标'
    },
    {
      category: '实习项目',
      name: '腾讯产品经理实习内推',
      description: '通过内部渠道推荐进入腾讯实习',
      advantage: '大厂背书，转正机会大'
    },
    {
      category: '实习项目',
      name: '中金公司投行部实习',
      description: '顶级投行核心部门实习机会',
      advantage: '金融行业顶级背景提升'
    },
    {
      category: '实习项目',
      name: '字节跳动数据分析实习',
      description: '参与真实数据分析项目，掌握前沿技术',
      advantage: '积累实战经验，提升技能'
    },
    {
      category: '科研/赛事',
      name: '全国青少年科技创新大赛辅导',
      description: '白名单赛事，全程指导参赛',
      advantage: '获奖可享受升学加分'
    },
    {
      category: '科研/赛事',
      name: 'MIT教授线上科研项目',
      description: '与MIT教授合作完成科研课题',
      advantage: '获得教授推荐信，论文发表'
    },
    {
      category: '科研/赛事',
      name: 'SCI论文发表辅导',
      description: '从选题到发表的全流程指导',
      advantage: '提升学术背景，申请加分'
    }
  ],
  summary: {
    planningLogic: '本报告基于张明轩同学的战略规划型人格特质、数学物理学科优势以及对科技和金融领域的兴趣，结合家庭丰富的教育和金融资源，规划了"国内顶尖高校+海外深造"的核心发展路径。通过强基计划冲刺985高校，同时准备香港名校作为备选，最终目标是进入金融科技或互联网行业的核心岗位。整体规划遵循"测评定位-路径匹配-资源整合-分步执行"的逻辑，确保每一步都有明确的目标和可落地的行动方案。',
    coreCompetence: '张明轩同学具备战略思维和逻辑分析的双重优势，在数学物理领域展现出突出的学科能力。结合家庭在金融和教育领域的深厚资源，以及个人对科技创新的热情，将形成"理工基础+金融视野+创新思维"的独特竞争力，这在当前金融科技快速发展的时代具有极高的市场价值。',
    actionSuggestions: [
      '立即开始雅思备考，目标高二暑假前达到6.5分，为香港申请做准备',
      '本学期联系母亲推荐的高校教授，启动科研项目，争取发表论文',
      '利用寒假参加数学竞赛培训，冲刺省级一等奖，为强基计划加分',
      '高二暑假争取获得金融机构的短期实习机会，积累行业认知'
    ],
    serviceCommitment: [
      '一站式资源对接',
      '全程跟踪辅导',
      '个性化方案定制',
      '名校导师1v1指导',
      '申请结果承诺保障'
    ]
  }
};

